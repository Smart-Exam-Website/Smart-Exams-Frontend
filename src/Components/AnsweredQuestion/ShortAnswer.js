import React from 'react'
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ShortAnswer = ({
    questionText,
    correctAnswer,
    studentAnswer,
    markAsRight = () => { },
    markAsWrong = () => { },
    isMarked,
    questionMark,
    studentMark
}) => {
    const isCorrectStudentAnswer = questionMark === studentMark

    return (
        <Card className='shadow p-3 mb-5 bg-white rounded position-relative' sx={{ minWidth: 275 }}>
            {studentAnswer ?
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
                                    {studentMark.toFixed(2)}
                                </Typography>
                                <Typography variant='h5'>
                                    {`/${questionMark.toFixed(2)}`}
                                </Typography>
                            </div>
                    }
                />
                :
                null
            }

            <CardContent>
                {/* Question Text */}
                <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                    {questionText}
                </Typography>
            </CardContent>

            {/* Essay Content */}
            <CardContent className=''>
                {studentAnswer ?
                    <Typography sx={{ fontWeight: 'bold' }} style={{ textDecoration: 'underline' }}>Student Answer:</Typography>
                    :
                    null
                }
                <Typography className={studentAnswer ? '' : 'm-4'} variant={studentAnswer ? '' : 'h5'}>
                    {studentAnswer ? studentAnswer?.value : correctAnswer}
                    {!studentAnswer ?
                        < CheckCircleOutlineIcon fontSize='large' color='success' />
                        :
                        null
                    }
                </Typography>
            </CardContent>

            {/* MODEL ANSWER */}
            {studentAnswer ?
                <CardContent className=''>
                    <Typography color='green' sx={{ fontWeight: 'bold' }} style={{ textDecoration: 'underline' }}>Model Answer:</Typography>
                    <Typography color='green'>{correctAnswer}</Typography>
                </CardContent>
                :
                null
            }

            {isMarked ?
                <div className='position-absolute opacity-25' style={{ right: '10%', bottom: '25%' }}>
                    {(isCorrectStudentAnswer) ?
                        <CheckCircleOutlineIcon fontSize='large' style={{ transform: 'scale(6)' }} color="success" />
                        :
                        <CancelOutlinedIcon fontSize='large' style={{ transform: 'scale(6)' }} color="error" />
                    }
                </div>
                :
                null
            }

        </Card>
    )
}

export default ShortAnswer