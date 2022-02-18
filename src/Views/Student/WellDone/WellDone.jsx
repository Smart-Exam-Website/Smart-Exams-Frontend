import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import Typography from '@mui/material/Typography';
const WellDone = (props) => {
    const examName = props.location.state.examName

    return (
        <div className="row justify-content-center text-center my-5">
            <div className='col-md-8 col-12'>

                <CardComponent title={examName}>
                    <div className="m-5 text-start text-center">


                        <Card className='shadow p-3 mb-5 bg-white rounded ' sx={{ minWidth: 275 }}>
                            <CardContent>

                                {/* Well Done Label */}
                                <Typography className='font-weight-bold ' variant="h3" component="div">

                                    Well Done
                                </Typography>


                                {/* Hope Text */}
                                <Typography className='m-3 text-success' variant='h4'>
                                    We hope you done well in this exam and best wishes for next....!
                                </Typography>

                            </CardContent>


                            <button
                                className='btn m-2 p-auto btn-primary text-white'
                                onClick={() => {props.history.push('/')}}
                            >
                                Homepage


                            </button>



                        </Card>
                    </div>
                </CardComponent>
            </div>
        </div >
    )
}
export default WellDone;
