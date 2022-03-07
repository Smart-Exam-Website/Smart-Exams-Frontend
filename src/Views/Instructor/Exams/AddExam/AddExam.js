import { TextField } from '@mui/material'
import React from 'react'
import CardComponent from '../../../../Components/CardComponent/CardComponent'
import { Formik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import { ExamServices } from '../../../../apis/Services/ExamService';
import HandleErrors from '../../../../hooks/handleErrors';
import showSuccessMsg from '../../../../hooks/showSuccessMsg';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import moment from 'moment';

const AddExam = () => {

    const history = useHistory()
    const location = useLocation()

    /** Stuff for editing mode */
    const isEditMode = Boolean(location.state?.exam)
    const examOldData = location.state?.exam
    console.log(examOldData)
    const onAddExamHandler = (values, actions) => {
        if (isEditMode) {
            ExamServices.editExamMainInfo(values, examOldData.id)
                .then(res => {
                    showSuccessMsg('Edited exam information successfully!')
                    history.push(`/exams/${examOldData.id}/set-options`, { exam: examOldData })
                })
                .catch(err => HandleErrors(err))
            return
        }

        ExamServices.createNewExam(values)
            .then(res => {
                showSuccessMsg('Exam information has been saved!')
                history.push(`/exams/${res.examId}/set-options`)
            })
            .catch(err => HandleErrors(err))
    }

    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={!isEditMode ? 'Create Exam' : 'Edit Exam'}>
                    <Formik
                        initialValues={{
                            name: examOldData?.name || '',
                            numberOfTrials: examOldData?.numberOfTrials || '',
                            description: examOldData?.description || '',
                            totalMark: examOldData?.totalMark || '',
                            duration: examOldData?.duration || '',
                            examSubject: examOldData?.examSubject || '',
                            startAt: examOldData?.startAt || moment(new Date().setMinutes(0)).format('yyyy-MM-DD hh:mm'),
                            endAt: examOldData?.endAt || moment(new Date().setMinutes(0)).add(7, 'days').format('yyyy-MM-DD hh:mm'),
                        }}
                        onSubmit={onAddExamHandler}
                    >
                        {props => (
                            <form className='m-5' onSubmit={props.handleSubmit}>
                                <div className='mt-4'>
                                    <TextField
                                        name="name"
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.name}
                                        type="text"
                                        label="Exam Name"
                                        variant="outlined"
                                    />
                                    {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                                </div>

                                <div className='mt-4'>
                                    <TextField
                                        name="numberOfTrials"
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.numberOfTrials}
                                        type="number"
                                        label="Number Of Trials"
                                        variant="outlined"
                                    />
                                    {props.errors.numberOfTrials && <div id="feedback">{props.errors.numberOfTrials}</div>}
                                </div>

                                <div className='mt-4'>
                                    <TextField
                                        name="description"
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.description}
                                        type="text"
                                        label="Description"
                                        variant="outlined"
                                    />
                                    {props.errors.description && <div id="feedback">{props.errors.description}</div>}
                                </div>

                                {/* Exam Subject */}
                                <div className='mt-4'>
                                    <TextField
                                        name="examSubject"
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.examSubject}
                                        type="text"
                                        label="Exam Subject"
                                        variant="outlined"
                                    />
                                    {props.errors.examSubject && <div id="feedback">{props.errors.examSubject}</div>}
                                </div>

                                {/* Start Date */}
                                <div className='mt-4'>
                                    <MobileDateTimePicker
                                        label="Start Date"
                                        minutesStep={5}
                                        inputFormat={'yyyy-MM-DD HH:mm'}
                                        value={props.values.startAt}
                                        onClose={() => {
                                            props.setFieldTouched('startAt', true)
                                        }}
                                        onChange={(date) => {
                                            let selectedDate = moment(date).format('yyyy-MM-DD HH:mm')
                                            console.log(selectedDate)
                                            props.setFieldValue('startAt', selectedDate)
                                        }}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                    {props.errors.startAt && <div id="feedback">{props.errors.startAt}</div>}
                                </div>

                                {/* End Date */}
                                <div className='mt-4'>
                                    <MobileDateTimePicker
                                        label="End Date"
                                        minutesStep={5}
                                        inputFormat={'yyyy-MM-DD HH:mm'}
                                        value={props.values.endAt}
                                        onClose={() => {
                                            props.setFieldTouched('endAt', true)
                                        }}
                                        onChange={(date) => {
                                            let selectedDate = moment(date).format('yyyy-MM-DD HH:mm')
                                            console.log(selectedDate)
                                            props.setFieldValue('endAt', selectedDate)
                                        }}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                    {props.errors.endAt && <div id="feedback">{props.errors.endAt}</div>}
                                </div>

                                <div className='mt-4'>
                                    <TextField
                                        name="totalMark"
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.totalMark}
                                        type="text"
                                        label="Total Mark"
                                        variant="outlined"
                                    />
                                    {props.errors.totalMark && <div id="feedback">{props.errors.totalMark}</div>}
                                </div>

                                <div className='mt-4'>
                                    <TextField
                                        name="duration"
                                        placeholder='Ex: 01:30:00'
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.duration}
                                        type="text"
                                        label="Duration"
                                        variant="outlined"
                                    />
                                    {props.errors.duration && <div id="feedback">{props.errors.duration}</div>}
                                </div>

                                <button className="btn btn-primary mx-auto mt-4" type="submit">Next</button>
                            </form>
                        )}
                    </Formik>
                </CardComponent>
            </div>
        </div>
    )
}

export default AddExam
