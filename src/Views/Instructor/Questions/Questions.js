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
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Questions
