import { Button, Chip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MarkExamServices } from '../../../../apis/Services/MarkExamService'
import HandleErrors from '../../../../hooks/handleErrors'
import useImageResolver from '../../../../hooks/useImageResolver'
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import McqAnswer from '../../../../Components/AnsweredQuestion/McqAnswer'

const StudentCard = ({ studentInfo }) => {
    const imageResolver = useImageResolver()

    return (
        <div className="row mt-5">
            <div className="col-md-6 col-12">
                <div className="d-flex">
                    <img
                        className='shadow-sm'
                        src={imageResolver('https://mui.com/static/images/avatar/3.jpg')}
                        style={{ height: 200, width: 200, objectFit: 'cover', borderRadius: 15 }}
                        alt="student Photo"
                    />
                    <div className='ms-3'>
                        <Typography variant="h4" fontWeight={'bold'} color={'primary'}>Hossam Sherif</Typography>
                        <Chip icon={<PersonIcon />} color='success' label={`1 face detected`} className="me-2" />
                        <Chip icon={<VerifiedIcon />} color='error' label={"Unverified"} />
                    </div>
                </div>
            </div>
            <div className='col-md-6 col-12 mt-md-0 mt-5 text-md-end text-center'>
                <Button variant="contained" color="success">
                    Mark Automatic
                </Button>
            </div>
        </div>
    )
}

const StudentSolvedExam = () => {
    const params = useParams()
    const [studentExamResult, setStudentExamResult] = useState(null)
    useEffect(() => {
        // MarkExamServices.getSpecificStudentAnswers(params?.examId, params?.studentId)
        //     .then(res => {
        //         setStudentExamResult(res)
        //         console.log(res)
        //     })
        //     .catch(err => HandleErrors(err))
    }, [])

    return (
        <div className='container'>
            <StudentCard />
            <hr />
            <div className="row mt-5 justify-content-center">
                <div className="col-12">
                    <>
                        {[{
                            questionText: "sss", type: 'mcq',
                            answers: [{
                                "id": 2,
                                "isCorrect": true,
                                "value": "Answer 1"
                            }, {
                                "id": 3,
                                "isCorrect": false,
                                "value": "Answeffde 1"
                            }, , {
                                "id": 4,
                                "isCorrect": false,
                                "value": "Answersd 1"
                            }]
                        }]?.map(item =>
                            (item.type === 'mcq') &&
                            <div className='my-2'>
                                <McqAnswer
                                    markAsRight={() => { }}
                                    markAsWrong={() => { }}
                                    studentAnswer={{ id: 2, value: 'Answer 1' }}
                                    questionText={item?.questionText}
                                    choices={item?.answers}
                                />
                            </div>

                        )}
                    </>
                </div>
            </div>
        </div>
    )
}

export default StudentSolvedExam