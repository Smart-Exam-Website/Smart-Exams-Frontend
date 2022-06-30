import { TextField } from '@mui/material'
import React, { useState } from 'react'
import CardComponent from '../../../../Components/CardComponent/CardComponent'
import { Formik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import { ExamServices } from '../../../../apis/Services/ExamService';
import HandleErrors from '../../../../hooks/handleErrors';
import showSuccessMsg from '../../../../hooks/showSuccessMsg';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import moment from 'moment';
import * as yup from 'yup';

const DURATION_REGEX = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/
const AddExam = () => {
    const createExamSchema = yup.object().shape({
        name: yup.string().required('This is a required field'),
        numberOfTrials: yup.number().min(1).required('This is a required field'),
        description: yup.string().required('This is a required field'),
        totalMark: yup.number().min(1).required('This is a required field'),
        duration: yup
            .string()
            .matches(DURATION_REGEX, "Wrong Duration Formate (hh:mm:ss)")
            .test("duration", "mins must not be more than 60", value => Number(value?.split(':')?.[1]) <= 60)
            .test("duration", "seconds must not be more than 60", value => Number(value?.split(':')?.[2]) <= 60)
            .required('This is a required field'),
        examSubject: yup.string().required('This is a required field'),
        startAt: yup.date().min(new Date(), "Start Date must be a future date").required('This is a required field'),
        endAt: yup
            .date()
            .when('startAt', (startAt, schema) => {
                return schema.test({
                    test: endAt => moment(startAt).isBefore(moment(endAt)),
                    message: "End Date must be after start date"
                })
            })
            .required('This is a required field')

    });

    const history = useHistory()
    const location = useLocation()

    /** Stuff for editing mode */
    const isEditMode = Boolean(location.state?.exam)
    const examOldData = location.state?.exam
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
                            startAt: examOldData?.startAt || moment(new Date().setMinutes(0)).format('yyyy-MM-DD HH:mm'),
                            endAt: examOldData?.endAt || moment(new Date().setMinutes(0)).add(7, 'days').format('yyyy-MM-DD HH:mm'),
                        }}
                        validationSchema={createExamSchema}
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
                                        helperText={props.touched.name && props.errors.name}
                                        error={props.touched.name && Boolean(props.errors.name)}
                                    />
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
                                        helperText={props.touched.numberOfTrials && props.errors.numberOfTrials}
                                        error={props.touched.numberOfTrials && Boolean(props.errors.numberOfTrials)}
                                    />
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
                                        helperText={props.touched.description && props.errors.description}
                                        error={props.touched.description && Boolean(props.errors.description)}
                                    />
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
                                        helperText={props.touched.examSubject && props.errors.examSubject}
                                        error={props.touched.examSubject && Boolean(props.errors.examSubject)}
                                    />
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
                                            props.setFieldValue('startAt', selectedDate)
                                        }}
                                        renderInput={
                                            (params) => <TextField
                                                {...params}
                                                fullWidth
                                                helperText={props.touched.startAt && props.errors.startAt}
                                                error={props.touched.startAt && Boolean(props.errors.startAt)}
                                            />
                                        }
                                    />
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
                                            props.setFieldValue('endAt', selectedDate)
                                        }}
                                        renderInput={(params) => <TextField
                                            {...params}
                                            fullWidth
                                            helperText={props.touched.endAt && props.errors.endAt}
                                            error={props.touched.endAt && Boolean(props.errors.endAt)}
                                        />
                                        }
                                    />
                                </div>

                                <div className='mt-4'>
                                    <TextField
                                        name="totalMark"
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.totalMark}
                                        type="number"
                                        label="Total Mark"
                                        variant="outlined"
                                        helperText={props.touched.totalMark && props.errors.totalMark}
                                        error={props.touched.totalMark && Boolean(props.errors.totalMark)}
                                    />
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
                                        helperText={props.touched.duration && props.errors.duration}
                                        error={props.touched.duration && Boolean(props.errors.duration)}
                                    />
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
