import React from 'react'
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ShortAnswer from './ShortAnswer';
import BorderdQuestionController from '../QuestionComponents/BorderdQuestionController';
import { QuestionTypes } from '../../constants/QuestionTypes';

const FormulaAnswer = ({
    formula_questions,
    studentAnswer,
    markAsRight = () => { },
    markAsWrong = () => { },
    isMarked,
    questionMark,
    studentMark,
    teacherMode,
    questionHeader
}) => {

    return (
        <BorderdQuestionController
            questionTitle={questionHeader}
            questionType={QuestionTypes.FORMULA}
            hasNoDelete
        >
            {formula_questions?.map(question => (
                <ShortAnswer
                    questionText={question?.formulaText}
                    correctAnswer={question?.value}
                    studentAnswer={studentAnswer}
                    markAsRight={markAsRight}
                    markAsWrong={markAsWrong}
                    isMarked={isMarked}
                    questionMark={questionMark}
                    studentMark={studentMark}
                />
            ))
            }
        </BorderdQuestionController>
    )
}

export default FormulaAnswer