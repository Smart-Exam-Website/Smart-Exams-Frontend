import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, TextField, Button } from '@mui/material'

import { CheatServices } from '../../../../apis/Services/CheatService';

import Mofty_Image from '../../../../assets/images/mofty.jpg';
import Mofty_Image_2 from '../../../../assets/images/mofty2.jpg';
import showSuccessMsg from '../../../../hooks/showSuccessMsg';
import { CheatActions } from '../../../../constants/CheatActions';
import useImageResolver from '../../../../hooks/useImageResolver';
import { CheatTypes } from '../../../../constants/CheatTypes';
import HandleErrors from '../../../../hooks/handleErrors';


const ExamReport = () => {
    const [cheaters, setCheaters] = useState([]);
    const [decrementDegree, setDecrementDegree] = useState(0);
    const params = useParams()

    useEffect(() => {
        CheatServices.getCheaters(params?.examId)
            .then((response) => {
                setCheaters(response?.details)

            }).catch((error) => {
                HandleErrors(error)

            })


    }, []);

    const actionHandler = (cheaterDetails, action) => {

        if (action === CheatActions.DISMISS || action === CheatActions.ZERO) {
            setDecrementDegree(0);

        }
        const ActionData = {

            "cheatingDetailId": cheaterDetails?.id,
            "action": action,
            "minusMarks": decrementDegree,
            "type": cheaterDetails?.type

        }

        CheatServices.performStudentDecrement(ActionData)
            .then((response) => {
                showSuccessMsg("ِAction Performed Successfully")

            }).catch((error) => {
                HandleErrors(error)


            })

        return
    }

    let imageResolver = useImageResolver()

    let CheatersMarkup = () => {
        const uniqueCheaters = [...new Map(cheaters.map(item => [item['student_id'], item])).values()];

        uniqueCheaters.forEach(unique_cheater => {
            let typeCounter = 0;
            cheaters.forEach(c => {
                if (c?.type === unique_cheater?.type) {
                    typeCounter++;
                }

            });
            unique_cheater['typeCounter'] = typeCounter;
        });


        return (
            uniqueCheaters?.map((cheater_details) => {
                return (
                    <Card className='shadow p-3 mb-5 bg-white rounded position-relative' sx={{ minWidth: 275 }}>
                        {/* <Stack spacing={2}/> */}
                        <div className="d-flex col-8 justify-content-start">
                            <div>
                                <img
                                    style={{ width: 200 }}
                                    src={`${imageResolver(cheater_details?.profileImage)}`}
                                    alt={'User'}
                                    loading="lazy"
                                />
                            </div>
                            <div>
                                <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                                    Name: {cheater_details?.studentName}
                                </Typography>
                                <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                                    Type: {cheater_details?.type} {cheater_details?.type === CheatTypes.SWITCH_BROWSER ? '(' + cheater_details?.typeCounter + ' times)' : ''}
                                </Typography>
                                <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                                    {cheater_details?.type !== CheatTypes.SWITCH_BROWSER ? 'Original Profile Photo ' : ''}
                                </Typography>
                            </div>
                        </div>

                        <div className='m-4' />
                        {cheater_details?.type !== CheatTypes.SWITCH_BROWSER &&
                            <div className="d-flex col-8 align-items-center">
                                <div>
                                    <img
                                        style={{ width: 200 }}
                                        src={`${imageResolver(cheater_details?.image)}`}
                                        alt={'no_photo'}
                                        loading="lazy"
                                    />
                                </div>
                                <div>
                                    <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                                        Suspect image (from his webcam)
                                    </Typography>
                                </div>
                            </div>}

                        <hr />
                        
                        <Typography className=' text-danger font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                            Perform Action To This Student (Be Careful..!)
                        </Typography>
                        <Typography className=' text-danger font-weight-bold' variant='h6' >
                            You can either dismiss this issue, decrease his mark, or Revoke the exam (Mark As Zero)
                        </Typography>
                        <div className='m-5' />

                        <div className="d-flex m-3 justify-content-between">
                            <Button variant="contained" color="success" onClick={() => { actionHandler(cheater_details, CheatActions.DISMISS) }}>
                                Dismiss This Issue
                            </Button>

                            <div className="d-flex justify-content-end">
                                <TextField
                                    error
                                    id="outlined-error"
                                    label="Decrement Value. eg: 6"
                                    onChange={(event) => setDecrementDegree(event.target.value)}
                                />
                                <div className='m-2' />

                                <Button variant="contained" color="error" onClick={() => { actionHandler(cheater_details, CheatActions.MINUS) }}>
                                    Confirm Decrease
                                </Button>

                            </div>
                            <Button variant="contained" color="error" onClick={() => { actionHandler(cheater_details, CheatActions.ZERO) }}>
                                Revoke Exam (Put Zero)
                            </Button>
                        </div>
                    </Card >
                );
            })
        );
    }

    return (
        <div>
            <Typography className='m-3 font-weight-bold' variant='h5' sx={{ fontWeight: 'bold' }}>
                Suspicious Cheaters
            </Typography>
            <hr />
            {
                CheatersMarkup()
            }
        </div>
    );
}

export default ExamReport;
