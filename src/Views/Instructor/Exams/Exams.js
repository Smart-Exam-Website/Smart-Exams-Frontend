import React from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import { ExamServices } from '../../../apis/Services/ExamService';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: Colors.primary,
        color: theme.palette.common.white,
        fontWeight: 700
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}:first-child`]: {
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

const Exams = () => {
    const history = useHistory();

    const addNewExamHandler = () => {
        history.push('/exams/add')
    }

    const [exams, setExams] = useState(null)
    function createData({ name, startAt, endAt, totalMark, duration, id }) {
        return { name, startAt, endAt, totalMark, duration, id };
    }
    useEffect(() => {
        ExamServices.getMyExams()
            .then(res => {
                console.log(res)
                setExams(res?.map(item => createData(item)))
            })
            .catch(err => HandleErrors(err))
    }, [])

    const GoToExamDetailsHandler = () => {
        console.log('hiiiiiiiiiiiii')
    }

    return (
        <div className='container'>
            <div style={{}} className='d-flex mt-4 justify-content-end'>
                <button onClick={addNewExamHandler} className='btn btn-success'>
                    <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff' }} />
                </button>
            </div>

            <TableContainer className='mt-5' component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Exam Name</StyledTableCell>
                            <StyledTableCell align="right">Start Date</StyledTableCell>
                            <StyledTableCell align="right">End Date</StyledTableCell>
                            <StyledTableCell align="right">Total Marks</StyledTableCell>
                            <StyledTableCell align="right">Duration</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exams?.map((row) => (
                            <StyledTableRow onClick={GoToExamDetailsHandler} key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.startAt}</StyledTableCell>
                                <StyledTableCell align="right">{row.endAt}</StyledTableCell>
                                <StyledTableCell align="right">{row.totalMark}</StyledTableCell>
                                <StyledTableCell align="right">{row.duration}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Exams
