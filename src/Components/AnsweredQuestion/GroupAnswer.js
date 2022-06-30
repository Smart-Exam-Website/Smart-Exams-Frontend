import React from 'react'
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ShortAnswer from './ShortAnswer';
import BorderdGroupQuestion from '../QuestionComponents/BorderdGroupQuestion';
import FormulaAnswer from './FormulaAnswer';
import EssayAnswer from './EssayAnswer';
import McqAnswer from './McqAnswer';
import { QuestionTypes } from '../../constants/QuestionTypes';

const GroupAnswer = ({
    questions,
    studentAnswer,
    markAsRight = () => { },
    markAsWrong = () => { },
    isMarked,
    questionMark,
    studentMark,
    teacherMode,
    questionHeader
}) => {
    const specificQuestionMark = (questionMark / (questions?.length))
    return (
        <div className="shadow">
            <BorderdGroupQuestion
                hasNoDelete
                questionTitle={questionHeader}
                questionsMarkup={
                    questions?.map(subQuestion => {
                        if (subQuestion?.type === QuestionTypes.MCQ) {
                            return (
                                <div key={subQuestion?.id} className='m-4'>
                                    <McqAnswer
                                        markAsRight={() => markAsRight(subQuestion?.id, specificQuestionMark)}
                                        markAsWrong={() => markAsWrong(subQuestion?.id)}
                                        studentAnswer={subQuestion?.answers ? { id: subQuestion?.answers?.option_id, value: subQuestion?.answers?.studentAnswer } : null}
                                        questionText={subQuestion?.questionText}
                                        choices={subQuestion?.options}
                                        studentMark={subQuestion?.answers?.questionMark}
                                        questionMark={specificQuestionMark}
                                        isMarked={subQuestion?.answers?.isMarked}
                                    />
                                </div>)
                        }
                        else if (subQuestion?.type === QuestionTypes.ESSAY) {
                            return (
                                <div key={subQuestion?.id} className='m-4'>
                                    <EssayAnswer
                                        markAsRight={() => markAsRight(subQuestion?.id, specificQuestionMark)}
                                        markAsWrong={() => markAsWrong(subQuestion?.id)}
                                        studentAnswer={subQuestion?.answers ? { id: subQuestion?.answers?.option_id, value: subQuestion?.answers?.studentAnswer } : null}
                                        questionText={subQuestion?.questionText}
                                        studentMark={subQuestion?.answers?.questionMark}
                                        questionMark={specificQuestionMark}
                                        isMarked={subQuestion?.answers?.isMarked}
                                        correctAnswer={subQuestion?.options[0]}
                                    />
                                </div>)
                        }
                        else if (subQuestion?.type === QuestionTypes.FORMULA) {
                            return (
                                <div key={subQuestion?.id} className='m-4'>
                                    <FormulaAnswer
                                        markAsRight={() => markAsRight(subQuestion?.id, specificQuestionMark)}
                                        markAsWrong={() => markAsWrong(subQuestion?.id)}
                                        studentAnswer={subQuestion?.answers ? { id: subQuestion?.answers?.option_id, value: subQuestion?.answers?.studentAnswer } : null}
                                        formula_questions={subQuestion?.questions}
                                        teacherMode
                                        questionHeader={subQuestion?.questionText}
                                        studentMark={subQuestion?.answers?.questionMark}
                                        questionMark={specificQuestionMark}
                                        isMarked={subQuestion?.answers?.isMarked}
                                        correctAnswer={subQuestion?.formula_questions?.value}
                                    />
                                </div>)
                        }
                    })
                }
            />
        </div>
    )
}

export default GroupAnswer