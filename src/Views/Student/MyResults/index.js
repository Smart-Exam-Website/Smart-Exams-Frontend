import { Card, CardActions, CardContent, Chip, Typography, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ExamServices } from '../../../apis/Services/ExamService'
import CardComponent from '../../../Components/CardComponent/CardComponent'
import HandleErrors from '../../../hooks/handleErrors'
import moment from 'moment';
import { Colors } from '../../../constants/Colors';
import CheckIcon from '@mui/icons-material/Check';
import { useHistory, useLocation } from 'react-router-dom'

const MyResults = () => {
    const history = useHistory()
    const location = useLocation()
    const [exams, setExams] = useState(null)
    useEffect(() => {
        ExamServices.getAllPublishedExams({ isMarked: true })
            .then(res => {
                console.log(res)
                setExams(res)
            })
            .catch(err => HandleErrors(err))
    }, [])

    const goToResultDetails = (examId) => {
        history.push(`${location.pathname}/${examId}`)
    }

    const isFailed = (studentMark, totalMark) => {
        return studentMark < (totalMark / 2)
    }

    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={'Marked Exams'}>
                    <div className="m-5 text-start ">
                        {exams?.map(exam => (
                            <Card onClick={() => goToResultDetails(exam.id)} key={exam.id} className='shadow p-3 mb-5 bg-white rounded' sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Grid display={'flex'} justifyContent={'space-between'} direction={'row'}>
                                        <Grid>
                                            {/* Exam Title */}
                                            <Typography variant="h4" component="div">
                                                {exam.name}
                                            </Typography>
                                            {exam.isSubmitted &&
                                                <Chip
                                                    variant='filled'
                                                    color='success'
                                                    label={'Submitted'}
                                                    size={'small'}
                                                    className='mx-1'
                                                    icon={<CheckIcon />}
                                                />
                                            }
                                            {exam.isMarked &&
                                                <Chip
                                                    variant='filled'
                                                    color='success'
                                                    label={'Marked'}
                                                    size={'small'}
                                                    className='mx-1'
                                                    icon={<CheckIcon />}
                                                />
                                            }
                                        </Grid>
                                        <Grid className={isFailed(exam.mark?.totalMark, exam.totalMark) ? 'text-danger' : 'text-success'} display={'flex'} direction={'row'}>
                                            <Typography variant='h5'>
                                                {exam.mark?.totalMark}
                                            </Typography>
                                            <Typography variant='h5'>
                                                {`/${exam.totalMark}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Typography variant="body3">
                                        {exam.description}
                                    </Typography>
                                </CardContent>
                                <CardActions className='d-flex m-2 justify-content-between'>
                                    <Grid display={'flex'} alignItems={'center'} direction={'row'}>
                                        <Typography fontWeight={'bold'} color="secondary">Due:</Typography>
                                        <Typography className='mx-1'>
                                            {moment(exam.endAt).format('yyyy/MM/DD hh:mm A')}
                                        </Typography>
                                    </Grid>
                                    <Grid display={'flex'} alignItems={'center'} direction={'row'}>
                                        <Typography fontWeight={'bold'} color="secondary">Duration:</Typography>
                                        <Typography className='mx-1'>
                                            {exam.duration}
                                        </Typography>
                                    </Grid>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </CardComponent>
            </div >
        </div >
    )
}

export default MyResults