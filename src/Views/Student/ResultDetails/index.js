import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StudentServices } from '../../../apis/Services/StudentService'
import McqAnswer from '../../../Components/AnsweredQuestion/McqAnswer'
import HandleErrors from '../../../hooks/handleErrors'

const ResultDetails = () => {
    const { examId } = useParams()
    const [studentExamResult, setStudentExamResult] = useState(null)

    useEffect(() => {
        StudentServices.getSpecificExamResults(examId)
            .then(res => {
                console.log(res)
                setStudentExamResult(res.solution)
            })
            .catch(err => HandleErrors(err))

    }, [])

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-12">
                    {studentExamResult?.map(item =>
                        <div className='my-2'>
                            {(item?.question?.type === 'mcq') ?
                                <McqAnswer
                                    key={item.question_id}
                                    studentAnswer={{ id: item?.option_id, value: item?.studentAnswer }}
                                    questionText={item?.question?.questionText}
                                    choices={item?.question?.answers}
                                    studentMark={item?.questionMark}
                                    questionMark={item?.totalQuestionMark}
                                    isMarked={item?.isMarked}
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