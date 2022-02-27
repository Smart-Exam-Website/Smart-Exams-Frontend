import React from 'react'
import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';

const McqAnswer = ({ questionText, choices }) => {
    const submitHandler = (values) => {
        console.log(values)
    }
    const correctAnswer = choices?.find(item => item.isCorrect)
    const formatedAnswer = (answer) => {
        return {
            id: answer?.id,
            displayText: answer?.option.value
        }
    }
    return (
        <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
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
                            defaultValue={formatedAnswer(correctAnswer).id}
                            name="radio-buttons-group"
                        >
                            {choices?.map(choice => (
                                formatedAnswer(choice).id === formatedAnswer(correctAnswer).id ?
                                    <div className='d-flex align-items-center py-3 text-success' >
                                        <FormControlLabel
                                            key={formatedAnswer(choice).id}
                                            value={formatedAnswer(choice).id}
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
                                        <DangerousOutlinedIcon fontSize='large' color='error' />
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