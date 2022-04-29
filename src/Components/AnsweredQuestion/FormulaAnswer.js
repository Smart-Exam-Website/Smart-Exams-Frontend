import React from 'react'
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ShortAnswer from './ShortAnswer';

const FormulaAnswer = ({
    formula_questions,
    studentAnswer,
    markAsRight = () => { },
    markAsWrong = () => { },
    isMarked,
    questionMark,
    studentMark
}) => {
    return (
        <div>
            {formula_questions?.map(question => (
                <ShortAnswer
                    questionText={question?.formulaText}
                    correctAnswer={question?.value}
                />
            ))
            }
        </div>
    )
}

export default FormulaAnswer