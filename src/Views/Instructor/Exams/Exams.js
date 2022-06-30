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
import SettingsIcon from '@mui/icons-material/Settings';
import { Chip, Menu, MenuItem } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import { useDispatch } from 'react-redux';
import { hideAlert, showAlert } from '../../../redux/actions/AppActions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PublishIcon from '@mui/icons-material/Publish';
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

const Exams = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const addNewExamHandler = (e) => {
        history.push('/exams/add')
    }

    const [exams, setExams] = useState(null)
    const getExamsHandler = () => {
        ExamServices.getMyExams()
            .then(res => {
                setExams(res)
            })
            .catch(err => HandleErrors(err))
    }
    useEffect(() => {
        getExamsHandler()
    }, [])

    const GoToExamDetailsHandler = (examId) => {
        history.push(`/exams/${examId}`)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedExam, setSelectedExam] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event, id) => {
        event.stopPropagation();
        setSelectedExam(id)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setSelectedExam(null)
    };

    const editExamHandler = () => {
        let exam = exams.find(item => item.id === selectedExam)
        history.push('/exams/edit', { exam })
        handleClose()
    }

    const deleteExamHandler = () => {
        let deleteFun = () => {
            ExamServices.deleteExam(selectedExam)
                .then(res => {
                    showSuccessMsg('Exam deleted successfully!')
                    let newExams = [...exams]
                    newExams = newExams.filter(item => item.id !== selectedExam)
                    setExams(newExams)
                })
                .catch(err => HandleErrors(err))
                .finally(() => {
                    handleClose() //for menu
                    dispatch(hideAlert()) //for alert
                })
        }
        dispatch(showAlert({
            header: 'Delete this exam?',
            details: 'You are going to delete this exam permanently',
            alertFunction: deleteFun
        }))
    }

    const makePublishHandler = (isWantToBePublish) => {
        let selectedExamObject = exams.find(item => item.id === selectedExam)
        let examName = selectedExamObject?.name
        let request = isWantToBePublish ? ExamServices.makeExamPublished(selectedExam) : ExamServices.makeExamUnPublished(selectedExam)
        request
            .then(res => {
                showSuccessMsg(`Your Exam (${examName}) has been ${isWantToBePublish ? 'published' : 'unpublished'} successfully!`)
            })
            .catch(err => HandleErrors(err))
            .finally(() => {
                handleClose() //for menu
                getExamsHandler()
            })
    }

    const isExamNotCompleted = (row) => (!row.config || !row.questions?.length)
    const isSelectedExamPublished = () => {
        if (!exams?.length) return null
        let selectedExamObject = exams.find(item => item.id === selectedExam)
        return selectedExamObject?.isPublished
    }
    const isSelctedExamIsNotCompleted = () => {
        if (!exams?.length) return null
        let selectedExamObject = exams.find(item => item.id === selectedExam)
        return (!selectedExamObject?.config || !selectedExamObject?.questions?.length)
    }

    return (
        <div className='container'>
            <div style={{}} className='d-flex mt-4 justify-content-end'>
                <button onClick={addNewExamHandler} className='btn btn-success'>
                    <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff' }} />
                </button>
            </div>

            {exams?.length ?
                <TableContainer className='mt-5' component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Exam Name</StyledTableCell>
                                <StyledTableCell align="right">Start Date</StyledTableCell>
                                <StyledTableCell align="right">End Date</StyledTableCell>
                                <StyledTableCell align="right">Total Marks</StyledTableCell>
                                <StyledTableCell align="right">Duration</StyledTableCell>
                                <StyledTableCell align="right"> </StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exams?.map((row) => (
                                <StyledTableRow
                                    className={isExamNotCompleted(row) ? 'bg-danger disablePointer' : ''}
                                    onClick={!isExamNotCompleted(row) ? () => GoToExamDetailsHandler(row.id) : null}
                                    key={row.id}
                                >
                                    {/* NAME */}
                                    <StyledTableCell className={isExamNotCompleted(row) ? 'text-light' : ''} component="th" scope="row">
                                        {row.name}
                                        {row.isPublished ?
                                            < Chip className='ms-2' size='small' color="success" icon={<DoneAllIcon />} label="Published" />
                                            :
                                            null
                                        }
                                    </StyledTableCell>
                                    {/* STARE DATE */}
                                    <StyledTableCell className={isExamNotCompleted(row) ? 'text-light' : ''} align="right">
                                        {row.startAt}
                                    </StyledTableCell>
                                    {/* END DATE */}
                                    <StyledTableCell className={isExamNotCompleted(row) ? 'text-light' : ''} align="right">
                                        {row.endAt}
                                    </StyledTableCell>
                                    {/* TOTAL MARK */}
                                    <StyledTableCell className={isExamNotCompleted(row) ? 'text-light' : ''} align="right">
                                        {row.totalMark}
                                    </StyledTableCell>
                                    {/* DURATION */}
                                    <StyledTableCell className={isExamNotCompleted(row) ? 'text-light' : ''} align="right">
                                        {row.duration}
                                    </StyledTableCell>
                                    {/* OPTIONS */}
                                    <StyledTableCell style={{ cursor: 'pointer' }} className={isExamNotCompleted(row) ? 'text-light' : ''} onClick={(e) => handleClick(e, row.id)} align="right">
                                        <SettingsIcon fontSize='medium' color={isExamNotCompleted(row) ? '#fff' : 'secondary'} />
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                :
                null
            }

            {!exams?.length ?
                <NoContentComponent text={"No Exams Right Now"} />
                :
                null
            }

            {
                selectedExam &&
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
                    {!isSelctedExamIsNotCompleted() ?
                        <MenuItem onClick={() => makePublishHandler(!isSelectedExamPublished())}>
                            <PublishIcon />
                            {isSelectedExamPublished() ? 'UnPublish' : 'Publish'}
                        </MenuItem>
                        :
                        null
                    }
                    <MenuItem onClick={editExamHandler}>
                        <EditIcon />
                        Edit
                    </MenuItem>
                    <MenuItem color='error' onClick={deleteExamHandler}>
                        <DeleteForeverIcon color='error' />
                        Delete
                    </MenuItem>
                </Menu>
            }
        </div >
    )
}

export default Exams
