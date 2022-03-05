import { Button, Chip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MarkExamServices } from '../../../../apis/Services/MarkExamService'
import HandleErrors from '../../../../hooks/handleErrors'
import useImageResolver from '../../../../hooks/useImageResolver'
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';

const StudentSolvedExam = () => {
    const params = useParams()
    const imageResolver = useImageResolver()
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
            <div className="row mt-5">
                <div className="col-md-6 col-12">
                    <div className="d-flex">
                        <img
                            className='shadow-sm'
                            src={imageResolver('https://mui.com/static/images/avatar/3.jpg')}
                            style={{ height: 200, width: 200, objectFit: 'cover', borderRadius:15 }}
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
            <hr />
            <div className="row mt-5">
                <div className="col-md-8 col-12">
                    <h1>{params.studentId}</h1>
                </div>
            </div>
        </div>
    )
}

export default StudentSolvedExam