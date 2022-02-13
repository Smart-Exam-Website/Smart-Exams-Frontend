import { PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
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
import { Menu, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import { useDispatch } from 'react-redux';
import { hideAlert, showAlert } from '../../../redux/actions/AppActions';

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
    const history = useHistory();

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

    const GoToQuestionDetailsHandler = () => {

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
                    newQuestions = newQuestions.filter(item=>item.id !== selectedQuestion)
                    setQuestions(newQuestions)
                })
                .catch(err => HandleErrors(err))
            handleClose() //for menu
            dispatch(hideAlert()) //for alert
        }
        // show alert
        dispatch(showAlert({
            header: 'Delete this question?',
            details: 'You are going to delete this question permanently',
            alertFunction: deleteFun
        }))
    }

    return (
        <div className='container'>
            <div className='d-flex mt-4 justify-content-end'>
                <button onClick={goToAddQuestionPageHandler} className='btn btn-success'>
                    <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff' }} />
                </button>
            </div>

            <TableContainer className='mt-5' component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Question Header</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Created Date</StyledTableCell>
                            <StyledTableCell align="right"> </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions?.map((row) => (
                            <StyledTableRow onClick={GoToQuestionDetailsHandler} key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.questionText}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.type}</StyledTableCell>
                                <StyledTableCell align="right">{row.created_at}</StyledTableCell>
                                <StyledTableCell onClick={(e) => handleClick(e, row.id)} align="right">
                                    <SettingsIcon fontSize='medium' color='secondary' />
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
