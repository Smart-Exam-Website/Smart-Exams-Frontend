import { PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { QuestionServices } from '../../../apis/Services/QuestionService';
import HandleErrors from '../../../hooks/handleErrors';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Colors } from '../../../constants/Colors';
import { useState } from 'react';
import { Checkbox, FormControlLabel, Menu, MenuItem, Switch, TextField, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import { useDispatch } from 'react-redux';
import { hideAlert, showAlert } from '../../../redux/actions/AppActions';
import { addNewGroup, saveAQuestion } from '../../../redux/actions/ExamAction';
import NoContentComponent from '../../../Components/NoContentComponent/NoContentComponent';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Formik } from 'formik';
import { QuestionTypes } from '../../../constants/QuestionTypes';
import CloseIcon from '@mui/icons-material/Close';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: Colors.primary,
        color: theme.palette.common.white,
        fontWeight: 700
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}:first-of-type`]: {
        fontWeight: 700
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&': {
        cursor: 'pointer'
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Questions = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const isSelectionMode = location.state?.canSelectQuestionsForExam

    const goToAddQuestionPageHandler = () => {
        history.push(`${history.location.pathname}/add`)
    }

    /**
     * Getting Questions
     */
    const [questions, setQuestions] = useState(null)
    const getAllQuestions = () => {
        QuestionServices.getMyQuestions()
            .then(res => {
                console.log("Questions =>", res)
                setQuestions(res)
            })
            .catch(err => HandleErrors(err))
    }
    useEffect(() => {
        //Commented as it get from filter useeffect initially
        //getAllQuestions();
    }, [])

    const GoToQuestionDetailsHandler = (questionId) => {
        history.push(`${history.location.pathname}/${questionId}`)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedQuestion, setSelectedQuestion] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event, id) => {
        event.stopPropagation();
        setSelectedQuestion(id)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setSelectedQuestion(null)
    };

    const editQuestionHandler = () => {
        console.log(selectedQuestion)
        let question = questions.find(item => item.id === selectedQuestion)
        history.push('/questions/edit', { question })
        handleClose()
    }

    const deleteQuestionHandler = () => {
        let deleteFun = () => {
            QuestionServices.deleteQuestion(selectedQuestion)
                .then(res => {
                    showSuccessMsg('Question deleted successfully!')
                    let newQuestions = [...questions]
                    newQuestions = newQuestions.filter(item => item.id !== selectedQuestion)
                    setQuestions(newQuestions)
                })
                .catch(err => HandleErrors(err))
                .finally(() => {
                    handleClose() //for menu
                    dispatch(hideAlert()) //for alert
                })
        }
        // show alert
        dispatch(showAlert({
            header: 'Delete this question?',
            details: 'You are going to delete this question permanently',
            alertFunction: deleteFun
        }))
    }

    // #### SELECTION MODE STUFF ####

    const isAllSelected = questions?.every(item => item.isSelected)
    const selectedQuestions = questions?.filter(item => item.isSelected)
    /**
     * Mark needed question to be selected for an exam in [selection mode]
     */
    const onCheckHandler = (index, isSelected) => {
        setQuestions(prevState => {
            let newQuestions = [...prevState]
            newQuestions[index].isSelected = isSelected
            return newQuestions
        })
    }
    const selectAllQuestions = () => {
        setQuestions(prevState => {
            let newQuestions = [...prevState]
            return newQuestions.map(item => { return { ...item, isSelected: true } })
        })
    }
    const deselectAllQuestions = () => {
        setQuestions(prevState => {
            let newQuestions = [...prevState]
            return newQuestions.map(item => { return { ...item, isSelected: false } })
        })
    }
    const selectedGroupQuestionId = location.state?.groupId
    const sentSelectedQuestionHandler = () => {
        console.log("testttt", selectedGroupQuestionId)
        if (selectedGroupQuestionId) {
            QuestionServices.getQuestionDetails(selectedGroupQuestionId)
                .then(res => {
                    let returnedQuestion = res?.question
                    let groupReturnedQuestions = res?.question?.questions
                    console.log(returnedQuestion)
                    return QuestionServices.editGroupQuestion(selectedGroupQuestionId, {
                        questionText: returnedQuestion?.questionText,
                        questions: [...groupReturnedQuestions?.map(item => item.id), ...selectedQuestions?.map(item => item.id)]
                    })
                })
                .then(res => {
                    console.log("Edites Question:::=>>", res)
                    dispatch(saveAQuestion(selectedQuestions, selectedGroupQuestionId))
                    history.goBack()
                })
                .catch(err => HandleErrors(err))
        }
        else {
            let normalQuestions = selectedQuestions?.filter(item => item.type !== QuestionTypes.GROUP)
            let groupQuestions = selectedQuestions?.filter(item => item.type === QuestionTypes.GROUP)
            groupQuestions?.length && dispatch(addNewGroup(groupQuestions))
            normalQuestions?.length && dispatch(saveAQuestion(normalQuestions, null))
            history.goBack()
        }
    }


    // #### SEARCH AND FILTER FUNCTIONALITY ####

    const [filterValue, setFilterValue] = useState(null)
    const [filterMenuEl, setFilterMenuEl] = useState(null)
    const [searchValue, setsearchValue] = useState('')
    const [isAllowedToSearch, setIsAllowedToSearch] = useState(true)
    const onFilterHandler = (values) => {
        setFilterValue(prevState => { return { ...prevState, ...values } })
        setFilterMenuEl(false)
    }
    useEffect(() => {
        QuestionServices.getMyQuestions({
            myQuestions: filterValue?.isMyQuestions,
            tag: filterValue?.tag,
            type: filterValue?.type,
            search: filterValue?.search
        })
            .then(res => {
                setQuestions(res)
            })
            .catch(err => HandleErrors(err))
    }, [filterValue])

    const searchHandler = () => {
        if (!searchValue) return
        setIsAllowedToSearch(false)
        setFilterValue(prevState => { return { ...prevState, search: searchValue } })
    }
    const clearSearch = () => {
        setsearchValue('')
        setIsAllowedToSearch(true)
        setFilterValue(prevState => { return { ...prevState, search: null } })
    }
    const clearFilter = () => {
        setFilterValue(null)
        clearSearch()
        setFilterMenuEl(false)
    }
    const FilterMarkup = (
        <div className='d-flex justify-content-between mt-3'>
            <div className='position-relative'>
                <TextField
                    name="search"
                    fullWidth
                    value={searchValue}
                    type="text"
                    label="Search"
                    variant="outlined"
                    onChange={(e) => { setsearchValue(e.target.value); setIsAllowedToSearch(true) }}
                />
                <div onClick={isAllowedToSearch ? searchHandler : clearSearch} className='position-absolute p-2 pointer' style={{ right: 0, top: '50%', zIndex: 10, transform: 'translateY(-50%)' }}>
                    {isAllowedToSearch ?
                        <SearchIcon style={searchValue ? {} : { cursor: 'not-allowed' }} color="secondary" />
                        :
                        <CloseIcon color="secondary" />
                    }
                </div>
            </div>

            <div className='d-flex align-items-center p-2 pointer' onClick={(e) => setFilterMenuEl(e.currentTarget)}>
                <FilterListIcon color="secondary" fontSize='large' />
            </div>

            <Menu
                id="basic-menu2"
                anchorEl={filterMenuEl}
                open={Boolean(filterMenuEl)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                autoFocus={false}
                onClose={() => { setFilterMenuEl(null) }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <div className='p-3'>
                    <div onClick={clearFilter} className='pointer mb-3 d-flex justify-content-end'>
                        <Typography color='secondary' className='text-decoration-underline'>clear filter</Typography>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            type: filterValue?.type || '',
                            tag: filterValue?.tag || '',
                            isMyQuestions: filterValue?.isMyQuestions || false
                        }}
                        onSubmit={onFilterHandler}
                    >
                        {props => (
                            <form className='p-2' onSubmit={props.handleSubmit}>
                                <div className='mb-2'>
                                    <TextField
                                        name="type"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.type}
                                        fullWidth
                                        select
                                        label="Type"
                                        variant="outlined"
                                    >
                                        {
                                            Object.keys(QuestionTypes).map((type) => (
                                                <MenuItem key={type} value={QuestionTypes[type]}>
                                                    {type}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </div>

                                <div className='mb-2'>
                                    <TextField
                                        name="tag"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.tag}
                                        fullWidth
                                        type="text"
                                        label="Tags"
                                        variant="outlined"
                                    />
                                </div>

                                <div className='mb-2'>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={props.values.isMyQuestions}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                name="isMyQuestions"
                                                color="primary"
                                            />
                                        }
                                        label="Show My Questions Only"
                                    />
                                </div>

                                <div className='d-flex'>
                                    <button className="btn btn-secondary mx-auto" type="button" onClick={() => { setFilterMenuEl(null) }}>Cancel</button>
                                    <button className="btn btn-primary mx-auto" type="submit">Apply</button>
                                </div>

                            </form>
                        )}
                    </Formik>
                </div>
            </Menu>
        </div>
    )

    return (
        <div className='container'>
            <div className='d-flex mt-4 justify-content-end'>
                {!isSelectionMode ?
                    <button onClick={goToAddQuestionPageHandler} className='btn btn-success'>
                        <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff' }} />
                    </button>
                    :
                    <button onClick={sentSelectedQuestionHandler} className='btn btn-success'>
                        Confirm Selection ({selectedQuestions?.length})
                    </button>
                }
            </div>

            {FilterMarkup}
            {questions?.length ?
                <>
                    <TableContainer className='mt-1' component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    {isSelectionMode &&
                                        <StyledTableCell>
                                            <Checkbox
                                                style={{ backgroundColor: '#fff' }}
                                                checked={isAllSelected}
                                                onChange={isAllSelected ? deselectAllQuestions : selectAllQuestions}
                                            />
                                        </StyledTableCell>
                                    }
                                    <StyledTableCell>Question Header</StyledTableCell>
                                    <StyledTableCell align="right">Type</StyledTableCell>
                                    <StyledTableCell align="right">Owned By</StyledTableCell>
                                    <StyledTableCell align="right">Created Date</StyledTableCell>
                                    {!isSelectionMode &&
                                        <StyledTableCell align="right"> </StyledTableCell>
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions?.map((row, index) => (
                                    <StyledTableRow onClick={() => GoToQuestionDetailsHandler(row.id)} key={row.id}>
                                        {isSelectionMode &&
                                            <StyledTableCell onClick={(e) => e.stopPropagation()} component="th" scope="row">
                                                <Checkbox
                                                    color="primary"
                                                    checked={Boolean(row.isSelected)}
                                                    onChange={(e) => onCheckHandler(index, e.target.checked)}
                                                />
                                            </StyledTableCell>
                                        }
                                        <StyledTableCell component="th" scope="row">
                                            {row.questionText}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.type}</StyledTableCell>
                                        <StyledTableCell align="right">{`${row.instructor.degree}, ${row.instructorName}`}</StyledTableCell>
                                        <StyledTableCell align="right">{row.created_at}</StyledTableCell>
                                        {!isSelectionMode &&
                                            <StyledTableCell onClick={(e) => handleClick(e, row.id)} align="right">
                                                <SettingsIcon fontSize='medium' color='secondary' />
                                            </StyledTableCell>
                                        }

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                :
                null
            }

            {!questions?.length ?
                <NoContentComponent text="No Questions at the moment" />
                :
                null
            }

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                autoFocus={false}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={editQuestionHandler}>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem color='error' onClick={deleteQuestionHandler}>
                    <DeleteForeverIcon color='error' />
                    Delete
                </MenuItem>
            </Menu>


        </div>
    )
}

export default Questions
