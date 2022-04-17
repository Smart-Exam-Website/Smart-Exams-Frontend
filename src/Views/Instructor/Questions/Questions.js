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
import { Checkbox, Menu, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import { useDispatch } from 'react-redux';
import { hideAlert, showAlert } from '../../../redux/actions/AppActions';
import { saveAQuestion } from '../../../redux/actions/ExamAction';
import NoContentComponent from '../../../Components/NoContentComponent/NoContentComponent';

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
        getAllQuestions();
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
    const sentSelectedQuestionHandler = () => {
        dispatch(saveAQuestion(selectedQuestions))
        history.goBack()
    }


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

            {questions?.length ?

                <TableContainer className='mt-4' component={Paper}>
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
