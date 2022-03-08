import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
// import { connect } from 'react-redux';
// import { saveAnswer } from '../../../../redux/actions/QuestionActions'

const Essay = (props) => {



    const [essayAnswer, setEssayAnswer] = useState('');

    const essayChangedHandler = (event) => {
        setEssayAnswer(event.target.value);
    };



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
                        {props.questionText}
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
                        onChange={essayChangedHandler}
                    />

                </CardContent>


                <CardActions className='d-flex m-2 p-2 justify-content-between'>

                    <button
                        className='btn m-2 p-auto btn-danger text-white'
                        variant="contained"
                        onClick={props.clickedPrevious}
                        disabled={props.previousButtonDisabled}
                    >
                        Previous
                    </button>

                    <button
                        className='btn m-2 p-auto btn-primary text-white'
                        variant="contained"
                        onClick={() => {
                            // props.clickedNext(chosenOptionID, chosenAnswer)
                            // props.studentAnswerFunction(props.questionIndex, chosenOptionID, chosenAnswer)
                            // setChosenOptionID(null)
                        }}
                    >
                        {props.changeNextNameIntoFinish ? "Finish Exam" : "Next"}
                    </button>

                </CardActions>
            </Card>
        </div>

    );
}


export default Essay;
