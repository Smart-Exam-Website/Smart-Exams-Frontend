import React from 'react'
import {  Card, CardContent, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const EssayAnswer = ({
    questionText,
    correctAnswer,
    studentAnswer,
    markAsRight = () => { },
    markAsWrong = () => { },
    isMarked,
    questionMark,
    studentMark
}) => {

    // const submitHandler = (values) => {
    //     console.log(values)
    // }
    // const correctAnswer = correctAnswer?.find(item => item.isCorrect)
    // const formatedAnswer = (answer) => {
    //     return {
    //         id: answer?.id,
    //         displayText: (answer?.option?.value || answer?.value)
    //     }
    // }

    // const isCorrectStudentAnswer = questionMark === studentMark
    return (
        <Card className='shadow p-3 mb-5 bg-white rounded position-relative' sx={{ minWidth: 275 }}>
            {/* {studentAnswer ?
                <CardHeader
                    action={
                        !isMarked ?
                            <div>
                                <IconButton onClick={markAsWrong} size='large'>
                                    <CancelOutlinedIcon fontSize='large' color="error" />
                                </IconButton>
                                <IconButton onClick={markAsRight} size='large'>
                                    <CheckCircleOutlineIcon fontSize='large' color="success" />
                                </IconButton>
                            </div>
                            :
                            <div className={`me-3 d-flex shadow-sm p-2 border ${isCorrectStudentAnswer ? 'border-success' : 'border-danger'}`}>
                                <Typography variant='h5' color={isCorrectStudentAnswer ? 'primary' : 'error'}>
                                    {3}
                                </Typography>
                                <Typography variant='h5'>
                                    {`/5`}
                                </Typography>
                            </div>
                    }
                />
                :
                null
            } */}

            <CardContent>
                {/* Question Text */}
                <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                    {questionText}
                </Typography>
            </CardContent>

            {/* Essay Content */}
            <Typography className='m-4' variant='h5'>
                {correctAnswer?.value}
                <CheckCircleOutlineIcon fontSize='large' color='success' />

            </Typography>

            <CardContent className=''>

            </CardContent>

        </Card >
    )
}

export default EssayAnswer