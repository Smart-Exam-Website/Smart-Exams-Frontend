import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, TextField, Button } from '@mui/material'

import { CheatServices } from '../../../../apis/Services/CheatService';

import Mofty_Image from '../../../../assets/images/mofty.jpg';
import Mofty_Image_2 from '../../../../assets/images/mofty2.jpg';
import showSuccessMsg from '../../../../hooks/showSuccessMsg';
import { CheatActions } from '../../../../constants/CheatActions';
const ExamReport = () => {
    const [cheaters, setCheaters] = useState([]);
    const [decrementDegree, setDecrementDegree] = useState(0);
    const params = useParams()



    useEffect(() => {
        // Data format
        // {
        //     action_id: null
        // created_at: null
        // exam_id: 16
        // id: 84
        // image: ""
        // minusMarks: 0
        // student_id: 7
        // type: "SWITCH_BROWSER"
        // updated_at:
        //     ]
        //   }

        CheatServices.getCheaters(params?.examId)
            .then((response) => {
                console.log("response.details")
                console.log(response.details)
                setCheaters(response.details)

            }).catch((error) => {
                console.log(error)


            })


    }, []);



    const actionHandler = (cheaterDetails, action) => {

        // {
        //     "cheatingDetailId": 1,
        //     "action": "string",
        //     "minusMarks": 3.5,
        //     "type": "string"
        // }

        // Real TODO DATA
        // const ActionData = {

        //     "cheatingDetailId": cheaterDetails?.id,
        //     "action": action,
        //     "minusMarks": decrementDegree,
        //     "type": cheaterDetails?.type

        // }
        const ActionData = {

            "cheatingDetailId": 86,
            "action": action,
            "minusMarks": decrementDegree,
            "type": "SWITCH_BROWSER"

        }
        CheatServices.performStudentDecrement(ActionData)
            .then((response) => {
                console.log("Success Yastaaa")
                showSuccessMsg("Success Yasta")
                console.log(response)

            }).catch((error) => {
                console.log(error)


            })

        return
    }

    return (
        <div>
            <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                Suspicious Cheaters
            </Typography>
            <hr />


            <Card className='shadow p-3 mb-5 bg-white rounded position-relative' sx={{ minWidth: 275 }}>


                <div className="d-flex col-8 justify-content-start">
                    <div>
                        <img
                            style={{ width: 200 }}
                            src={`${Mofty_Image}`}
                            // src={`${cheaters[0]?.image}`}
                            alt={'User'}
                            loading="lazy"
                        />

                    </div>
                    <div>

                        <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                            Name: Hazem Ali
                        </Typography>
                        <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                            Type: SWITCH_BROWSER
                        </Typography>

                    </div>

                </div>

                <div className='m-4' />

                <div className="d-flex col-8 align-items-center">
                    <div>
                        <img
                            style={{ width: 200 }}
                            src={`${Mofty_Image_2}`}
                            // src={`${cheaters[0]?.image}`}
                            alt={'User'}
                            loading="lazy"
                        />

                    </div>
                    <div>
                        <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                            Suspect image (from his webcam)
                        </Typography>


                    </div>

                </div>

                <hr />
                {/* Action Line */}

                <Typography className=' text-danger font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                    Perform Action To This Student (Be Careful..!)
                </Typography>
                <Typography className=' text-danger font-weight-bold' variant='h6' >
                    You can either Pass this issue, decrease his mark, or Revoke the exam (Mark As Zero)
                </Typography>
                <div className='m-5' />

                <div className="d-flex m-3 justify-content-between">

                    <Button variant="contained" color="success" onClick={() => { actionHandler("", CheatActions.PASS) }}>
                        Pass This Issue
                    </Button>

                    <div className="d-flex justify-content-end">
                        <TextField
                            error
                            id="outlined-error"
                            label="Decrement Value. eg: 6"
                            onChange={(event) => setDecrementDegree(event.target.value)}
                        />
                        <div className='m-2' />

                        <Button variant="contained" color="error" onClick={() => { actionHandler("", CheatActions.MARK_MINUS) }}>
                            Confirm Decrease
                        </Button>

                    </div>
                    <Button variant="contained" color="error" onClick={() => { actionHandler("", CheatActions.REVOKE) }}>
                        Revoke Exam (Put Zero)
                    </Button>
                </div>

            </Card >


        </div>
    );
}

export default ExamReport;
