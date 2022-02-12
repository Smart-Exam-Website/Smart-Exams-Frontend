import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';





const ShowExams = (props) => {
    // const [exam, setExam] = useState(null)

    const goToInstructionsHandler = (event, exam) => {
        // this code pevents from going to another page
        event.preventDefault()

        props.history.push({
            pathname: '/exam-instructions',
            state: { exam: exam }
        })


    }
    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={'Your Exams'}>
                    <div className="m-5 text-start ">
                        <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                            <CardContent>
                                {/* Exam Title */}
                                <Typography variant="h4" component="div">
                                    Exam 1
                                    <hr />
                                </Typography>
                                <Typography variant="body3">
                                    This exam is until chapter 3

                                </Typography>
                            </CardContent>
                            <CardActions className='d-flex m-2 justify-content-between'>

                                <Typography variant="body3">
                                    Due: 19/8/2022 10:00 PM

                                </Typography>
                                <Typography variant="body3">
                                    Time: 3 hours

                                </Typography>
                                <Button
                                    className='btn m-2 p-2 btn-primary text-white'
                                    size="small"
                                    onClick={(e) => goToInstructionsHandler(e, "LOL Exam")}
                                    

                                >
                                    Go to this Exam
                                </Button>

                            </CardActions>
                        </Card>



                        <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                            <CardContent>
                                {/* Exam Title */}
                                <Typography variant="h4" component="div">
                                    Exam 2
                                    <hr />
                                </Typography>
                                <Typography variant="body3">
                                    This exam is until chapter 6

                                </Typography>
                            </CardContent>
                            <CardActions className='d-flex m-2 justify-content-between'>

                                <Typography variant="body3">
                                    Due: 19/11/2022 10:00 PM

                                </Typography>
                                <Typography variant="body3">
                                    Time: 2 hours

                                </Typography>
                                <Button className='btn m-2 p-2 btn-primary text-white' size="small">Go to this Exam</Button>

                            </CardActions>
                        </Card>


                    </div>
                </CardComponent>
            </div>
        </div>
    );
}

export default withRouter(ShowExams);
