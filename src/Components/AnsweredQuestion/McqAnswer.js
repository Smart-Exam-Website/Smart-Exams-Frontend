import React from 'react'
import { Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const McqAnswer = ({ questionText, choices, studentAnswer, markAsRight = () => { }, markAsWrong = () => { } }) => {
    const submitHandler = (values) => {
        console.log(values)
    }
    const correctAnswer = choices?.find(item => item.isCorrect)
    const formatedAnswer = (answer) => {
        return {
            id: answer?.id,
            displayText: (answer?.option?.value || answer?.value)
        }
    }
    
    return (
        <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
            {studentAnswer ?
                <CardHeader
                    action={
                        <div>
                            <IconButton onClick={markAsWrong} size='large'>
                                <CancelOutlinedIcon fontSize='large' color="error" />
                            </IconButton>
                            <IconButton onClick={markAsRight} size='large'>
                                <CheckCircleOutlineIcon fontSize='large' color="success" />
                            </IconButton>
                        </div>
                    }
                />
                :
                null
            }

            <CardContent>
                {/* Question Text */}
                <Typography className='m-3' variant='h5'>
                    {questionText}
                </Typography>
            </CardContent>

            {/* MCQ Content */}
            <CardContent className=''>
                <form onSubmit={submitHandler}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={formatedAnswer(studentAnswer)?.id || formatedAnswer(correctAnswer)?.id}
                            name="radio-buttons-group"
                        >
                            {choices?.map(choice => (
                                formatedAnswer(choice).id === formatedAnswer(correctAnswer).id ?
                                    <div key={choice.id} className='d-flex align-items-center py-3 text-success' >
                                        <FormControlLabel
                                            key={formatedAnswer(choice).id}
                                            value={formatedAnswer(choice).id}
                                            disabled
                                            control={<Radio />}
                                            label={formatedAnswer(choice).displayText}
                                        />
                                        <CheckCircleOutlineIcon fontSize='large' color='success' />
                                    </div>
                                    :
                                    <div className='d-flex align-items-center py-3 text-danger' >
                                        <FormControlLabel
                                            key={formatedAnswer(choice).id}
                                            disabled
                                            value={formatedAnswer(choice).id}
                                            control={<Radio />}
                                            label={formatedAnswer(choice).displayText}
                                        />
                                        {(!studentAnswer || (formatedAnswer(studentAnswer).id === formatedAnswer(choice).id)) ?
                                            <CancelOutlinedIcon fontSize='large' color='error' />
                                            :
                                            null
                                        }
                                    </div>
                            ))
                            }
                        </RadioGroup>
                    </FormControl>
                </form>
            </CardContent>
        </Card >
    )
}

export default McqAnswer