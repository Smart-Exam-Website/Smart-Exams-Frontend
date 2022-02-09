import { Switch, TextField } from '@mui/material'
import React from 'react'
import CardComponent from '../../../../Components/CardComponent/CardComponent'
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { ExamServices } from '../../../../apis/Services/ExamService';
import HandleErrors from '../../../../hooks/handleErrors';
import showSuccessMsg from '../../../../hooks/showSuccessMsg';

const AddExam = () => {

    const history = useHistory()
    const onAddExamHandler = (values, actions) => {
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
                <CardComponent title={'Create Exam'}>
                    <Formik
                        initialValues={{
                            name: '',
                            numberOfTrials: '',
                            description: '',
                            totalMark: '',
                            duration: '',
                            examSubject: '',
                            startAt: '',
                            endAt: '',
                            willPublish: true
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

                                <div className='mt-4'>
                                    <TextField
                                        name="startAt"
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.startAt}
                                        type="text"
                                        label="Start Date"
                                        variant="outlined"
                                    />
                                    {props.errors.startAt && <div id="feedback">{props.errors.startAt}</div>}
                                </div>

                                <div className='mt-4'>
                                    <TextField
                                        name="endAt"
                                        fullWidth
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.endAt}
                                        type="text"
                                        label="End Date"
                                        variant="outlined"
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

                                <div className='mt-4'>
                                    <label onClick={() => props.setFieldValue('willPublish', !props.values.willPublish)}>Publish Exam</label>
                                    <Switch
                                        name='willPublish'
                                        checked={props.values.willPublish}
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

export default AddExam
