import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


const Examinstructions = (props) => {
    const exam = props.location.state.exam
    const goToExamHandler = (event) => {
        // this code pevents from going to another page
        event.preventDefault()

        props.history.push({
            pathname: `/exams/${exam.id}/start`,
            state: { exam: exam }
        })
    }

    return (
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
                                    <Typography variant="body3">
                                        <ul>
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
                                        <div className='text-center text-success' >
                                            Good Luck with your exam..!!
                                        </div>

                                    </Typography>
                                </CardContent>
                                <CardActions className='d-flex m-2 justify-content-end'>

                                    <Button
                                        className='btn m-2 p-2 text-white'
                                        size="small"
                                        variant="contained"
                                        color='success'
                                        onClick={goToExamHandler}
                                    >
                                        Start Exam Now
                                    </Button>

                                </CardActions>
                            </Card>



                        </div>
                    </CardComponent>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Examinstructions);
