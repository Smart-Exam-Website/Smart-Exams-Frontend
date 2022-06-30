import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { QuestionTypes } from '../../../../constants/QuestionTypes'

// import { connect } from 'react-redux';
// import { saveAnswer } from '../../../../redux/actions/QuestionActions'

const Essay = (props) => {
    const isInGroupQuestion = Boolean(props?.sentAnswerChanges)


    const [essayAnswer, setEssayAnswer] = useState('');
    const essayChangedHandler = (event) => {
        setEssayAnswer(event.target.value);
    };

    useEffect(() => {
        setEssayAnswer(props.question?.studentAnswer?.chosenAnswer || '')
    }, []);

    const retrieveOldAnswer = () => {
        return essayAnswer
    }

    useEffect(() => {
        if (!isInGroupQuestion) return

        props?.sentAnswerChanges(
            { chosenOptionID: null, chosenAnswer: essayAnswer, questionType: QuestionTypes.ESSAY },
            props?.questionIndex - 1,
            props?.questionId
        )
    }, [essayAnswer])
    return (
        <div className="m-5 text-start ">
            <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                <CardContent>
                    {/* Question Label */}
                    <Typography className='font-weight-bold' variant="h4" component="div">
                        {/* TODO, FETCH QUESTION NUMBER */}
                        Question {props.questionIndex}
                        <hr />
                    </Typography>

                    {/* Question Text */}
                    <Typography className='m-3' variant='h5'>
                        {props.question?.questionText}
                    </Typography>
                </CardContent>

                {/* Essay Text Field */}
                <CardContent className=''>
                    <TextField
                        id="outlined-multiline"
                        label="Your Answer"
                        multiline
                        rows={8}
                        fullWidth
                        value={essayAnswer}
                        onChange={essayChangedHandler}
                    />
                </CardContent>

                {!isInGroupQuestion ?
                    <CardActions className='d-flex m-2 p-2 justify-content-between'>
                        <button
                            className='btn m-2 p-auto btn-danger text-white'
                            variant="contained"
                            disabled={props.previousButtonDisabled}
                            onClick={() => {
                                props.clickedPrevious()
                                retrieveOldAnswer()
                            }}
                        >
                            Previous
                        </button>

                        <button
                            className='btn m-2 p-auto btn-primary text-white'
                            variant="contained"
                            onClick={() => {
                                const answer = essayAnswer
                                props.clickedNext(null, answer, QuestionTypes.ESSAY)
                                const nextAnswer = props.question?.studentAnswer?.chosenAnswer || ''
                                setTimeout(() => {
                                    setEssayAnswer(nextAnswer)

                                }, 1000);
                            }}
                        >
                            {props.changeNextNameIntoFinish ? "Finish Exam" : "Next"}
                        </button>
                    </CardActions>
                    :
                    null
                }
            </Card>
        </div>

    );
}


export default Essay;
