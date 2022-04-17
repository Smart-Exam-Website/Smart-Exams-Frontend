import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import TakePhoto from '../TakePhoto/TakePhoto';
import { useState } from 'react';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import { ExamServices } from '../../../apis/Services/ExamService';
import moment from 'moment';
import HandleErrors from '../../../hooks/handleErrors';
import { useParams } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';


const Examinstructions = (props) => {
    const exam = props.location.state.exam

    const [isLoading, setIsLoading] = useState(false)

    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const [noOfFaces, setNoOfFaces] = useState(0);
    const [photoVerified, setPhotoVerified] = useState(false);

    const { examId } = useParams()
    const [examConfigs, setExamConfigs] = useState(null)
    useEffect(() => {
        console.log(examId)
        ExamServices.getExamConfig(examId)
            .then(res => {
                console.log(res.configuration)
                setExamConfigs(res.configuration)
            })
            .catch(err => HandleErrors(err))
    }, [])

    const [startDate, setstartDate] = useState(null)
    useEffect(() => {
        console.log(examId)
        ExamServices.getExamInfo(examId)
            .then(res => {
                setstartDate(res.exam.startAt)
            })
            .catch(err => HandleErrors(err))
    }, [])

    const goToExamHandler = (event) => {
        // this code pevents from going to another page
        event.preventDefault()

        let startExamData = {
            "startTime": moment().format('yyyy-MM-DD HH:mm:ss'),
            "numberOfFaces": noOfFaces,
            "isVerified": photoVerified
        }
        ExamServices.startExam(exam.id, startExamData)
            .then((response) => {
                console.log("Starting Exam")
                console.log(response)

                props.history.push({
                    pathname: `/exams/${exam.id}/start`,
                    state: { exam: exam }
                })
            }).catch((error) => {
                if (error?.message?.includes("You must submit the previous attempt first before starting a new attempt")) {
                    props.history.push({
                        pathname: `/exams/${exam.id}/start`,
                        state: { exam: exam }
                    })
                    return
                }
                HandleErrors(error)
            })
    }

    const photoTakenHandler = (img) => {
        setIsLoading(true)
        setIsPhotoTaken(true)
        showSuccessMsg("Photo Taken Successfully")

        let faceDetectionData = {
            "image": img,
            "examId": exam.id
        }
        let faceVerificationData = {
            "image1": img,
            "examId": exam.id
        }

        ExamServices.applyFaceDetection(faceDetectionData)
            .then((response) => {
                setNoOfFaces(response.numberOfFaces)
                if (response.numberOfFaces !== 1) {
                    return { verified: false }
                }
                return ExamServices.applyFaceVerification(faceVerificationData)
            })
            .then((response) => {
                setPhotoVerified(response.verified)
            })
            .finally(() => { setIsLoading(false) })
        return
    }

    const mustVerifyFace = (examConfigs?.faceRecognition || examConfigs?.faceDetection)
    const isNotStartYet = startDate && moment(startDate).isBefore(moment())
    return ((examConfigs && startDate) ?
        <div>
            <div className="row justify-content-center text-center my-5">
                <div className="col-md-8 col-12">
                    <CardComponent title={'Before The Exam'}>
                        <div className="m-5 text-start ">
                            <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                                <CardContent>
                                    {/* Instructions Title */}
                                    <Typography className='text-danger font-weight-bold' variant="h4" component="div">
                                        Important Instructions
                                        <hr />
                                    </Typography>
                                    <ul>
                                        {mustVerifyFace ?
                                            <li className='text-danger font-weight-bold'>
                                                Verify your identity with a photo before entering the exam.
                                            </li>
                                            :
                                            null
                                        }
                                        <li>
                                            Don't use internet for getting information.
                                        </li>
                                        <li>
                                            No one else can be in the room with you.
                                        </li>
                                        <li>
                                            Time is limited, so organize your time well with questions.
                                        </li>
                                        <li>
                                            The room must be well-lit and you must be clearly visible.
                                        </li>
                                    </ul>
                                    <div className='text-center'>

                                    </div>
                                    <div className='text-center text-success' >
                                        Good Luck with your exam!
                                    </div>

                                </CardContent>
                                <CardActions className='d-flex m-2 justify-content-end'>
                                    {!isLoading ?
                                        <>
                                            {mustVerifyFace ?
                                                <Popup
                                                    trigger={
                                                        <Button
                                                            className='btn m-2 p-2 text-white'
                                                            size="large"
                                                            variant="contained"
                                                            color='warning'
                                                        >
                                                            Take Photo
                                                        </Button>
                                                    }
                                                    modal
                                                    lockScroll
                                                    position="top center"
                                                >
                                                    {close => (
                                                        <CardComponent title={'Take a nice photo'}>
                                                            <h4 className="d-flex justify-content-center">
                                                                Make sure the place is well lit!
                                                            </h4>
                                                            <TakePhoto
                                                                captured={photoTakenHandler}
                                                                clicked={close}
                                                            ></TakePhoto>
                                                        </CardComponent>

                                                    )}
                                                </Popup>
                                                :
                                                null
                                            }
                                            <Button
                                                className='btn m-2 p-2 text-white'
                                                size="small"
                                                variant="contained"
                                                color='success'
                                                onClick={goToExamHandler}
                                                disabled={(mustVerifyFace && !isPhotoTaken) || (isNotStartYet)}
                                            >
                                                {`Start Exam Now ${isNotStartYet ? '(Not Started)' : ''}`}
                                            </Button>
                                        </>
                                        :
                                        <div className='me-4 d-flex flex-column align-items-center'>
                                            <Typography color="primary">Verifing...!</Typography>
                                            <Loader />
                                        </div>
                                    }
                                </CardActions>
                            </Card>
                        </div>
                    </CardComponent>
                </div>
            </div >
        </div>
        :
        <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
            <Loader />
        </div>
    );
}

export default withRouter(Examinstructions);
