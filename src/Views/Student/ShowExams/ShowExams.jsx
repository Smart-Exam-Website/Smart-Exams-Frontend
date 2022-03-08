import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { ExamServices } from '../../../apis/Services/ExamService';
import HandleErrors from '../../../hooks/handleErrors';
import { useEffect } from 'react';
import moment from 'moment';
import { Colors } from '../../../constants/Colors';
import { Chip, colors, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';




const ShowExams = (props) => {
    // const [exam, setExam] = useState(null)

    const goToInstructionsHandler = (event, exam) => {
        // this code pevents from going to another page
        //event.preventDefault()

        props.history.push({
            pathname: `/exams/${exam.id}`,
            state: { exam: exam }
        })
    }

    /**
     * Get exams
     */
    const [exams, setExams] = useState(null)
    useEffect(() => {
        ExamServices.getAllPublishedExams()
            .then(res => {
                // console.log(res)
                setExams(res)
            })
            .catch(err => HandleErrors(err))
    }, [])

    const getRemainingEndTime = (examEndDate) => {
        let result = moment(examEndDate).diff(moment(), 'hours')
        return result
    }
    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={'Your Exams'}>
                    <div className="m-5 text-start ">
                        {exams?.map(exam => (
                            <Card style={{ border: exam.isSubmitted ? `1px solid ${Colors.success}` : '' }} key={exam.id} className='shadow p-3 mb-5 bg-white rounded' sx={{ minWidth: 275 }}>
                                <CardContent>
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
                                    <hr />
                                    <Typography variant="body3">
                                        {exam.description}
                                    </Typography>
                                </CardContent>
                                <CardActions className='d-flex m-2 justify-content-between'>
                                    <Grid display={'flex'} alignItems={'center'} direction={'row'}>
                                        <Typography fontWeight={'bold'}>Due:</Typography>
                                        {getRemainingEndTime(exam.endAt) >= 0 ?
                                            < Typography
                                                className='mx-1'
                                                color={getRemainingEndTime(exam.endAt) > 24 ? Colors.success : Colors.danger}>
                                                {`${moment(exam.endAt).format('yyyy/MM/DD hh:mm A')} [${getRemainingEndTime(exam.endAt)} hours left]`}
                                            </Typography>
                                            :
                                            <Typography className='mx-1'>
                                                {moment(exam.endAt).format('yyyy/MM/DD hh:mm A')}
                                            </Typography>
                                        }
                                    </Grid>
                                    <Typography variant="body3">
                                        <b>Duration:</b> {exam.duration}
                                    </Typography>
                                    <Button
                                        className='btn m-2 p-2 btn-primary text-white'
                                        size="small"
                                        onClick={(e) => goToInstructionsHandler(e, exam)}
                                    >
                                        Go to this Exam
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </CardComponent>
            </div >
        </div >
    );
}

export default withRouter(ShowExams);
