import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StudentServices } from '../../../apis/Services/StudentService'
import EssayAnswer from '../../../Components/AnsweredQuestion/EssayAnswer'
import McqAnswer from '../../../Components/AnsweredQuestion/McqAnswer'
import { QuestionTypes } from '../../../constants/QuestionTypes'
import HandleErrors from '../../../hooks/handleErrors'

const ResultDetails = () => {
    const { examId } = useParams()
    const [studentExamResult, setStudentExamResult] = useState(null)

    useEffect(() => {
        StudentServices.getSpecificExamResults(examId)
            .then(res => {
                setStudentExamResult(res.solution)
            })
            .catch(err => HandleErrors(err))

    }, [])

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-12">
                    {studentExamResult?.map(item =>
                        <div key={item.question_id} className='my-2'>
                            {(item?.question?.type === QuestionTypes.MCQ) ?
                                <McqAnswer
                                    studentAnswer={{ id: item?.option_id, value: item?.studentAnswer }}
                                    questionText={item?.question?.questionText}
                                    studentMark={item?.questionMark}
                                    questionMark={item?.totalQuestionMark}
                                    isMarked={item?.isMarked}
                                    choices={item?.question?.answers}
                                />
                                :
                                null
                            }
                            {(item?.question?.type === QuestionTypes.ESSAY) ?
                                <EssayAnswer
                                    studentAnswer={{ id: item?.option_id, value: item?.studentAnswer }}
                                    questionText={item?.question?.questionText}
                                    studentMark={item?.questionMark}
                                    questionMark={item?.totalQuestionMark}
                                    isMarked={item?.isMarked}
                                    correctAnswer={item?.question?.answers[0]}
                                />
                                :
                                null
                            }
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}

export default ResultDetails