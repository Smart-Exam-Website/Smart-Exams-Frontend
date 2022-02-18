import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
const MCQ = (props) => {

    const [chosenOptionID, setChosenOptionID] = useState(null);
    const [chosenAnswer, setChosenAnswer] = useState(null);

    const checkHandler = (e) => {

        setChosenOptionID(parseInt(e.target.id))
        setChosenAnswer(e.target.value)
    }

    return (
        <div className="m-5 text-start ">
            <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                <CardContent>

                    {/* Question Label */}
                    <Typography className='font-weight-bold' variant="h4" component="div">
                        {/* TODO, FETCH QUESTION NUMBER */}
                        Question {props.question_index}
                        <hr />
                    </Typography>


                    {/* Question Text */}
                    <Typography className='m-3' variant='h5'>
                        {props.questionText}

                    </Typography>

                </CardContent>


                {/* MCQ Content */}
                <CardContent className=''>
                    <form >
                        {/* Option 1 */}
                        <div className="form-check m-3">
                            <input
                                className="form-check-input"
                                checked={parseInt(chosenOptionID) === parseInt(props.answers[0].id)}
                                type="radio"
                                value={props.answers[0].value}
                                id={props.answers[0].id}
                                onChange={checkHandler}
                                name="flexRadioDefault" />

                            <label className="form-check-label" htmlFor={props.answers[0].id}>
                                {props.answers[0].value}
                            </label>
                        </div>



                        {/* Option 2 */}
                        <div className="form-check m-3">
                            <input
                                className="form-check-input"
                                checked={parseInt(chosenOptionID) === parseInt(props.answers[1].id)}
                                type="radio"
                                value={props.answers[1].value}
                                id={props.answers[1].id}
                                onChange={checkHandler}
                                name="flexRadioDefault" />

                            <label className="form-check-label" htmlFor={props.answers[1].id}>

                                {props.answers[1].value}
                            </label>
                        </div>




                        {/* Option 3 */}
                        <div className="form-check m-3">
                            <input
                                className="form-check-input"
                                checked={parseInt(chosenOptionID) === parseInt(props.answers[2].id)}
                                type="radio"
                                value={props.answers[2].value}
                                id={props.answers[2].id}
                                onChange={checkHandler}
                                name="flexRadioDefault" />

                            <label className="form-check-label" htmlFor={props.answers[2].id} >

                                {props.answers[2].value}
                            </label>
                        </div>



                        {/* Option 4 */}
                        <div className="form-check m-3">
                            <input
                                className="form-check-input"
                                checked={parseInt(chosenOptionID) === parseInt(props.answers[3].id)}
                                type="radio"
                                value={props.answers[3].value}
                                id={props.answers[3].id}
                                onChange={checkHandler}
                                name="flexRadioDefault" />

                            <label className="form-check-label" htmlFor={props.answers[3].id}>
                                {props.answers[3].value}
                            </label>
                        </div>



                    </form>




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
                            props.clickedNext(chosenOptionID, chosenAnswer)

                        }}
                    >
                        {props.changeNextNameIntoFinish ? "Finish Exam" : "Next"}
                    </button>

                </CardActions>
            </Card>
        </div>

    );
}

export default MCQ;
