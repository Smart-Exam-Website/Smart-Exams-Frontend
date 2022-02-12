import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const MCQ = (props) => {
    return (
        <div className="m-5 text-start ">
            <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                <CardContent>

                    {/* Question Label */}
                    <Typography className='font-weight-bold' variant="h4" component="div">
                        {/* TODO, FETCH QUESTION NUMBER */}
                        Question 1
                        <hr />
                    </Typography>


                    {/* Question Text */}
                    <Typography className='m-3' variant='h5'>
                        {props.questionText}

                    </Typography>

                </CardContent>


                {/* MCQ Content */}
                <CardContent className=''>
                    <form action="">
                        <div className="form-check m-3">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" for="flexRadioDefault1">
                                {props.wrongOptions[0]}
                            </label>
                        </div>
                        <div className="form-check m-3">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">

                                {props.wrongOptions[1]}
                            </label>
                        </div>
                        <div className="form-check m-3">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label className="form-check-label" for="flexRadioDefault3">

                                {props.correctOption}
                            </label>
                        </div>
                        <div className="form-check m-3">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                            <label className="form-check-label" for="flexRadioDefault4">
                                {props.wrongOptions[2]}
                            </label>
                        </div>
                    </form>




                </CardContent>


                <CardActions className='d-flex m-2 p-2 justify-content-between'>

                    <button
                        className='btn m-2 p-auto btn-danger text-white'
                        variant="contained"

                    >
                        Previous
                    </button>

                    <button
                        className='btn m-2 p-auto btn-primary text-white'
                        variant="contained"

                    >
                        Next
                    </button>

                </CardActions>
            </Card>
        </div>

    );
}

export default MCQ;
