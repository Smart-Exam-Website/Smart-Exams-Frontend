import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { QuestionTypes } from '../../../../constants/QuestionTypes'




const MCQ = (props) => {
    const isInGroupQuestion = Boolean(props?.sentAnswerChanges)

    const [chosenOptionID, setChosenOptionID] = useState(null);
    const [chosenAnswer, setChosenAnswer] = useState(null);



    useEffect(() => {
        if (props.currentQuestionNumber !== props.questionIndex - 1) return

        setChosenOptionID(props.savedStudentAnswer?.chosenOptionID)
        setChosenAnswer(props.savedStudentAnswer?.chosenAnswer)
        // eslint-disable-next-line
    }, [props.currentQuestionNumber]);



    const onChangeHandler = (e) => {
        setChosenOptionID(parseInt(e.target.id))
        setChosenAnswer(e.target.value)
    }

    let isCheckedCondition = (ansIndex) => {
        // return chosenOptionID && parseInt(chosenOptionID) === parseInt(props.savedStudentAnswer?.chosenOptionID)
        return parseInt(chosenOptionID) === parseInt(props.answers[ansIndex]?.id)
    }

    useEffect(() => {
        if (!isInGroupQuestion) return

        props?.sentAnswerChanges(
            { chosenOptionID: chosenOptionID, chosenAnswer: chosenAnswer, questionType: QuestionTypes.MCQ },
            props?.questionIndex - 1,
            props?.questionId
        )
    }, [chosenAnswer])
    return (
        <div className="m-5 text-start ">
            <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                <CardContent>

                    {/* Question Label */}
                    <Typography className='font-weight-bold' variant="h4" component="div">
                        {/* FETCH QUESTION NUMBER */}
                        Question {props.questionIndex}
                        <hr />
                    </Typography>


                    {/* Question Text */}
                    <Typography className='m-3' variant='h5'>
                        {props.questionText}

                    </Typography>

                </CardContent>


                {/* MCQ Content */}
                <CardContent className=''>
                    <form>
                        {props.answers?.map((item, index) => (
                            <div className="form-check m-3">
                                <input
                                    className="form-check-input"
                                    checked={isCheckedCondition(index)}
                                    type="radio"
                                    value={item?.value}
                                    id={item?.id}
                                    onChange={onChangeHandler}
                                    name="flexRadioDefault" />

                                <label className="form-check-label" htmlFor={item?.id}>
                                    {item?.value}
                                </label>
                            </div>
                        ))
                        }
                    </form>
                </CardContent>

                {!isInGroupQuestion ?
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
                                props.clickedNext(chosenOptionID, chosenAnswer, QuestionTypes.MCQ)
                                props.studentAnswerFunction(props.questionIndex, chosenOptionID, chosenAnswer)
                                setChosenOptionID(null)
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


export default MCQ;
