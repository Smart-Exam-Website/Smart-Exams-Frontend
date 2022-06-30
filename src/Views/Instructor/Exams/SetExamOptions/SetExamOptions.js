import { Switch } from '@mui/material'
import React, { useEffect } from 'react'
import { Formik } from 'formik';
import CardComponent from '../../../../Components/CardComponent/CardComponent';
import { matchPath } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { ExamServices } from '../../../../apis/Services/ExamService';
import HandleErrors from '../../../../hooks/handleErrors';
import showSuccessMsg from '../../../../hooks/showSuccessMsg';

const SetExamOptions = () => {

    const history = useHistory()
    const location = useLocation()

    const [examId, setExamId] = useState(null)

    /** Stuff for editing mode */
    const isEditMode = Boolean(location.state?.exam)
    const examOldData = location.state?.exam
    const oldExamConfig = examOldData?.config

    useEffect(() => {
        const match = matchPath(history.location.pathname, {
            path: '/exams/:examId/set-options'
        })
        setExamId(match.params.examId)
    }, [history.location.pathname])

    const setOptionsHandler = (values, actions) => {
        let submittedValues = { ...values }
        submittedValues['gradingMethod'] = submittedValues['gradingMethod'] ? 'auto' : 'manual'

        if (isEditMode && oldExamConfig) {
            ExamServices.editExamOptions(examId, submittedValues)
                .then(res => {
                    showSuccessMsg('Exam options has been edited!')
                    history.push(`/exams/${examOldData?.id}/add-questions`, { exam: examOldData })
                })
                .catch(err => HandleErrors(err))
            return
        }

        ExamServices.setExamOptions(examId, submittedValues)
            .then(res => {
                showSuccessMsg('Exam options has been saved!')
                history.push(`/exams/${examId}/add-questions`)
            })
            .catch(err => HandleErrors(err))
    }

    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={!isEditMode ? 'Create Exam: options' : 'Edit Exam: options'}>
                    <Formik
                        initialValues={{
                            faceRecognition: oldExamConfig ? Boolean(oldExamConfig?.faceRecognition) : false,
                            faceDetection: oldExamConfig ? Boolean(oldExamConfig?.faceDetection) : false,
                            questionsRandomOrder: oldExamConfig ? Boolean(oldExamConfig?.questionsRandomOrder) : false,
                            plagiarismCheck: oldExamConfig ? Boolean(oldExamConfig?.plagiarismCheck) : false,
                            disableSwitchBrowser: oldExamConfig ? Boolean(oldExamConfig?.disableSwitchBrowser) : false,
                            gradingMethod: oldExamConfig ? Boolean(oldExamConfig?.gradingMethod === 'auto') : true,
                        }}
                        onSubmit={setOptionsHandler}
                    >
                        {props => (
                            <form className='m-5' onSubmit={props.handleSubmit}>
                                <div className='mt-4'>
                                    <label onClick={() => props.setFieldValue('questionsRandomOrder', !props.values.questionsRandomOrder)}>Questions Random Order</label>
                                    <Switch
                                        name='questionsRandomOrder'
                                        checked={props.values.questionsRandomOrder}
                                        onChange={props.handleChange}
                                        color='primary'
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label onClick={() => props.setFieldValue('disableSwitchBrowser', !props.values.disableSwitchBrowser)}>Disable Switch Browser</label>
                                    <Switch
                                        name='disableSwitchBrowser'
                                        checked={props.values.disableSwitchBrowser}
                                        onChange={props.handleChange}
                                        color='primary'
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label onClick={() => props.setFieldValue('plagiarismCheck', !props.values.plagiarismCheck)}>Plagiarism Check</label>
                                    <Switch
                                        name='plagiarismCheck'
                                        checked={props.values.plagiarismCheck}
                                        onChange={props.handleChange}
                                        color='primary'
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label onClick={() => props.setFieldValue('faceDetection', !props.values.faceDetection)}>Face Detection</label>
                                    <Switch
                                        name='faceDetection'
                                        checked={props.values.faceDetection}
                                        onChange={props.handleChange}
                                        color='primary'
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label onClick={() => props.setFieldValue('gradingMethod', !props.values.gradingMethod)}>Automatic Grading</label>
                                    <Switch
                                        name='gradingMethod'
                                        checked={props.values.gradingMethod}
                                        onChange={props.handleChange}
                                        color='primary'
                                    />
                                </div>

                                <div className='mt-4'>
                                    <label onClick={() => props.setFieldValue('faceRecognition', !props.values.faceRecognition)}>Face Recognition</label>
                                    <Switch
                                        name='faceRecognition'
                                        checked={props.values.faceRecognition}
                                        onChange={props.handleChange}
                                        color='primary'
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

export default SetExamOptions
