import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { QuestionTypes } from '../../../../constants/QuestionTypes'
import Essay from '../Essay/Essay';
import MCQ from '../MCQ/MCQ';
import Formula from '../Formula/Formula';

const Group = (props) => {
    const [groupAnswers, setGroupAnswers] = useState(null);
    const groupAnswersChangesHandler = (answer, index, questionId) => {
        if (!groupAnswers) return
        setGroupAnswers(prevState => {
            let newGroup = [...prevState]
            newGroup[index] = { answer, questionId }
            return newGroup
        }
        );
    };

    useEffect(() => {
        //setGroupAnswers(props.question?.studentAnswer?.chosenAnswer || '')
        setGroupAnswers(props?.question?.questions?.map(item => ''))
    }, []);

    const retrieveOldAnswer = () => {
        return groupAnswers
    }

    return (
        <div className="m-5 text-start ">

            <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                <CardContent>
                    {/* Question Label */}
                    <Typography className='font-weight-bold' variant="h4" component="div">
                        Question {props.questionIndex}
                        <hr />
                    </Typography>

                    {/* Question Text */}
                    <Typography className='m-3' variant='h5'>
                        {props.question?.questionText}
                    </Typography>
                </CardContent>

                {props?.question?.questions?.map((subQuestion, index) => {
                    if (subQuestion?.type === QuestionTypes.ESSAY)
                        return (
                            <Essay
                                sentAnswerChanges={groupAnswersChangesHandler}
                                questionIndex={index + 1}
                                question={subQuestion}
                                key={subQuestion?.id}
                                questionId={subQuestion?.id}
                            />
                        )
                    else if (subQuestion?.type === QuestionTypes.MCQ)
                        return (
                            <MCQ
                                sentAnswerChanges={groupAnswersChangesHandler}
                                questionIndex={index + 1}
                                key={subQuestion?.id}
                                questionText={subQuestion.questionText}
                                answers={subQuestion.options}
                                questionId={subQuestion?.id}
                                savedStudentAnswer={subQuestion?.studentAnswer}
                            />
                        )

                    else if (subQuestion?.type === QuestionTypes.FORMULA)
                        return (
                            <Formula
                                sentAnswerChanges={groupAnswersChangesHandler}
                                questionIndex={index + 1}
                                question={subQuestion}
                                key={subQuestion?.id}
                                questionId={subQuestion?.id}
                            />
                        )
                })
                }

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
                            props.clickedNext(null, groupAnswers, QuestionTypes.GROUP)
                        }}
                    >
                        {props.changeNextNameIntoFinish ? "Finish Exam" : "Next"}
                    </button>
                </CardActions>
            </Card>

        </div >
    );
}


export default Group;
