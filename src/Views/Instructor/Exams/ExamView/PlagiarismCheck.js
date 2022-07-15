import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MarkExamServices } from '../../../../apis/Services/MarkExamService'
import { Colors } from '../../../../constants/Colors';
import HandleErrors from '../../../../hooks/handleErrors'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import styles from './ExamView.module.css'

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
  '&:hover': {
    textDecoration: 'underline'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PlagiarismCheck = ({ examId }) => {
  const getTheMostSimilar = (students) => {
    if (!students?.length) return

    let maxStudent = students[0]
    students.forEach(element => {
      if (element.similarity > maxStudent.similarity)
        maxStudent = element
    })

    return { ...maxStudent }
  }

  const [plagResult, setPlagResult] = useState(null)
  useEffect(() => {
    MarkExamServices.getPlagiarismResults(examId)
      .then(res => {
        let result = res?.result?.map(item => {
          return { ...item, similarStudents: getTheMostSimilar(item.similarStudents) }
        })
        setPlagResult(result)
        console.log(result)
      })
      .catch(err => HandleErrors(err))
  }, [])

  const history = useHistory()
  const location = useLocation()
  const goToStudentExam = (studentId, cheatedQuestionId, newTapName) => {
    if(newTapName){
      window.open(`${location.pathname}/${studentId}?questionId=${cheatedQuestionId}`, newTapName);
      return
    }
    history.push(`${location.pathname}/${studentId}?questionId=${cheatedQuestionId}`)
  }

  const openTaps = (firstStudentId, secondStuentId, questionId) => {
    goToStudentExam(firstStudentId, questionId, 'tap1')
    goToStudentExam(secondStuentId, questionId, 'tap2')
  }

  return (
    <TableContainer className='mt-5' component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="right">Most Similar Colleague</StyledTableCell>
            <StyledTableCell align="right">{'Percentage of similarity (%)'}</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plagResult?.map((row) => (
            <StyledTableRow key={row.id}>
              {/* NAME */}
              <StyledTableCell onClick={() => goToStudentExam(row.id, row.similarStudents?.questionId)} className='text-dark pointer' component="th" scope="row">
                {row.name}
              </StyledTableCell>
              {/* Collage Name */}
              <StyledTableCell onClick={() => goToStudentExam(row.similarStudents?.id, row.similarStudents?.questionId)} className='text-dark pointer' align="right">
                {row.similarStudents?.name}
              </StyledTableCell>
              {/* Plgrism Percentage */}
              <StyledTableCell className={`text-danger ${styles.preventHoverEffect}`} align="right">
                {(row.similarStudents?.similarity * 100).toFixed(2)} %
              </StyledTableCell>
              {/* ViewQuestion */}
              <StyledTableCell onClick={() => openTaps(row.id, row.similarStudents?.id, row.similarStudents?.questionId)} className='pointer' align="right">
                <RemoveRedEyeOutlinedIcon color='primary' />
              </StyledTableCell>
            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PlagiarismCheck