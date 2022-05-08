import { Button, Chip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { MarkExamServices } from '../../../../apis/Services/MarkExamService'
import HandleErrors from '../../../../hooks/handleErrors'
import useImageResolver from '../../../../hooks/useImageResolver'
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import McqAnswer from '../../../../Components/AnsweredQuestion/McqAnswer'
import showSuccessMsg from '../../../../hooks/showSuccessMsg'
import { QuestionTypes } from '../../../../constants/QuestionTypes'
import EssayAnswer from '../../../../Components/AnsweredQuestion/EssayAnswer'
import FormulaAnswer from '../../../../Components/AnsweredQuestion/FormulaAnswer'
import GroupAnswer from '../../../../Components/AnsweredQuestion/GroupAnswer'

const StudentCard = ({ name, isVerified, numberOfFaces, image, markAutoFun, examConfigs }) => {
    const imageResolver = useImageResolver()

    return (
        <div className="row mt-5">
            <div className="col-md-6 col-12">
                <div className="d-flex">
                    <img
                        className='shadow-sm'
                        src={imageResolver(image)}
                        style={{ height: 200, width: 200, objectFit: 'cover', borderRadius: 15 }}
                        alt="student Photo"
                    />
                    <div className='ms-3'>
                        <Typography variant="h4" fontWeight={'bold'} color={'primary'}>{name}</Typography>
                        {examConfigs?.faceDetection ?
                            <Chip icon={<PersonIcon />} color={(numberOfFaces === 1) ? 'success' : 'error'} label={`${numberOfFaces} face detected`} className="me-2" />
                            :
                            null
                        }
                        {examConfigs?.faceRecognition ?
                            <Chip icon={<VerifiedIcon />} color={isVerified ? 'success' : 'error'} label={isVerified ? "Verified" : "Unverified"} />
                            :
                            null
                        }
                    </div>
                </div>
            </div>
            <div className='col-md-6 col-12 mt-md-0 mt-5 text-md-end text-center'>
                <Button onClick={markAutoFun} variant="contained" color="success">
                    Mark Automatic
                </Button>
            </div>
        </div>
    )
}

const StudentSolvedExam = () => {
    const params = useParams()
    const history = useHistory()
    const location = useLocation()
    const examConfigs = location?.state?.examConfigs

    const [studentExamResult, setStudentExamResult] = useState(null)

    const autoMarkThisStudentHandler = () => {
        MarkExamServices.markSpecificStudentAutomatic(params?.examId, params?.studentId)
            .then(res => {
                showSuccessMsg(`Mark ${studentExamResult.studentName}'s exam successfully!`)
                history.goBack()
            })
            .catch(err => HandleErrors(err))
    }

    const markAsRightHandler = (questionId, mark) => {
        MarkExamServices.manualMark({
            examId: params?.examId,
            studentId: params?.studentId,
            questionId: questionId,
            questionMark: mark
        })
            .then(res => {
                getStudentAnswers()
            })
            .catch(err => HandleErrors(err))
    }

    const markAsWrongHandler = (questionId) => {
        MarkExamServices.manualMark({
            examId: params?.examId,
            studentId: params?.studentId,
            questionId: questionId,
            questionMark: 0
        })
            .then(res => {
                getStudentAnswers()
            })
            .catch(err => HandleErrors(err))
    }

    const getStudentAnswers = () => {
        MarkExamServices.getSpecificStudentAnswers(params?.examId, params?.studentId)
            .then(res => {
                setStudentExamResult(res)
                console.log(res)
            })
            .catch(err => HandleErrors(err))
    }
    useEffect(() => {
        getStudentAnswers()
    }, [])

    return (
        <div className='container'>
            <StudentCard
                name={studentExamResult?.studentName}
                isVerified={studentExamResult?.isVerified}
                numberOfFaces={studentExamResult?.numberOfFaces}
                image={studentExamResult?.image}
                markAutoFun={autoMarkThisStudentHandler}
                examConfigs={examConfigs}
            />
            <hr />
            <div className="row mt-5 justify-content-center">
                <div className="col-12">
                    <>
                        {studentExamResult?.solution?.map(item =>
                            <div key={item.id} className='my-2'>
                                {(item?.type === QuestionTypes.MCQ) ?
                                    <McqAnswer
                                        markAsRight={() => markAsRightHandler(item?.id, item?.pivot?.mark)}
                                        markAsWrong={() => markAsWrongHandler(item?.id)}
                                        studentAnswer={{ id: item?.answer?.option_id, value: item?.answer?.studentAnswer }}
                                        questionText={item?.questionText}
                                        choices={item?.options}
                                        studentMark={item?.answer?.questionMark}
                                        questionMark={item?.pivot?.mark}
                                        isMarked={item?.answer?.isMarked}
                                    />
                                    :
                                    null
                                }
                                {(item?.type === QuestionTypes.ESSAY) ?
                                    <EssayAnswer
                                        markAsRight={() => markAsRightHandler(item?.id, item?.pivot?.mark)}
                                        markAsWrong={() => markAsWrongHandler(item?.id)}
                                        studentAnswer={{ id: item?.answer?.option_id, value: item?.answer?.studentAnswer }}
                                        questionText={item?.questionText}
                                        studentMark={item?.answer?.questionMark}
                                        questionMark={item?.pivot?.mark}
                                        isMarked={item?.answer?.isMarked}
                                        correctAnswer={item?.options[0]}
                                    />
                                    :
                                    null
                                }
                                {(item?.type === QuestionTypes.FORMULA) ?
                                    <FormulaAnswer
                                        markAsRight={() => markAsRightHandler(item?.id, item?.pivot?.mark)}
                                        markAsWrong={() => markAsWrongHandler(item?.id)}
                                        studentAnswer={{ id: item?.answer?.option_id, value: item?.answer?.studentAnswer }}
                                        formula_questions={[item?.formula_questions]}
                                        studentMark={item?.answer?.questionMark}
                                        questionMark={item?.pivot?.mark}
                                        isMarked={item?.answer?.isMarked}
                                        correctAnswer={item?.formula_questions?.value}
                                    />
                                    :
                                    null
                                }
                                {(item?.type === QuestionTypes.GROUP) ?
                                    <GroupAnswer
                                        questions={item?.questions}
                                        markAsRight={markAsRightHandler}
                                        markAsWrong={markAsWrongHandler}
                                        questionMark={item?.pivot?.mark}
                                    />
                                    :
                                    null
                                }
                            </div>

                        )}
                    </>
                </div>
            </div>
        </div>
    )
}

export default StudentSolvedExam