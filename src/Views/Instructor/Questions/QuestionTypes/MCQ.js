import { TextField } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../../constants/Colors';
import * as yup from 'yup';

const Label = styled.label`
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: #000;
`
const DangerLabel = styled(Label)`
    color: ${Colors.danger};
`
const SuccessLabel = styled(Label)`
    color: ${Colors.success};
`

const MCQ = ({ getQuestionDetails = () => { } }) => {
    const MCQSCHEMA = yup.object().shape({
        questionText: yup.string().required('This is a required field'),
        correctAnswer: yup.string().required('This is a required field'),
        choise1: yup.string().required('This is a required field'),
        choise2: yup.string().required('This is a required field'),
        choise3: yup.string().required('This is a required field'),
    });

    const submitQuestionHandler = (values) => {
        getQuestionDetails(values)
    }

    return <Formik
        initialValues={{
            questionText: '',
            correctAnswer: '',
            choise1: '',
            choise2: '',
            choise3: ''
        }}
        validationSchema={MCQSCHEMA}
        onSubmit={submitQuestionHandler}
    >
        {props => (
            <form className='m-5' onSubmit={props.handleSubmit}>
                {/* Question Header */}
                <div className='mt-4 text-start'>
                    <Label htmlFor='questionText' className='mb-2'>Question Text</Label>
                    <TextField
                        name="questionText"
                        id="questionText"
                        placeholder='Question on your mind....'
                        multiline
                        rows={4}
                        fullWidth
                        value={props.values.questionText}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={props.touched.questionText && props.errors.questionText}
                        error={props.touched.questionText && Boolean(props.errors.questionText)}
                        variant="filled"
                    />
                </div>

                {/* Correct Answer */}
                <div className='mt-4 text-start'>
                    <SuccessLabel htmlFor='correctAnswer' className='mb-2'>Correct Option</SuccessLabel>
                    <TextField
                        name="correctAnswer"
                        id="correctAnswer"
                        placeholder='Correct Answer....'
                        fullWidth
                        value={props.values.correctAnswer}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        variant="filled"
                        helperText={props.touched.correctAnswer && props.errors.correctAnswer}
                        error={props.touched.correctAnswer && Boolean(props.errors.correctAnswer)}
                    />
                </div>

                {/* Options #1 */}
                <div className='mt-4 text-start'>
                    <DangerLabel htmlFor='choise1' className='mb-2'>Wrong Option 1</DangerLabel>
                    <TextField
                        name="choise1"
                        id="choise1"
                        placeholder='Wrong Answer....'
                        fullWidth
                        value={props.values.choise1}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        variant="filled"
                        helperText={props.touched.choise1 && props.errors.choise1}
                        error={props.touched.choise1 && Boolean(props.errors.choise1)}
                    />
                </div>

                {/* Options #2 */}
                <div className='mt-4 text-start'>
                    <DangerLabel htmlFor='choise2' className='mb-2'>Wrong Option 2</DangerLabel>
                    <TextField
                        name="choise2"
                        id="choise2"
                        placeholder='Wrong Answer....'
                        fullWidth
                        value={props.values.choise2}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        variant="filled"
                        helperText={props.touched.choise2 && props.errors.choise2}
                        error={props.touched.choise2 && Boolean(props.errors.choise2)}
                    />
                </div>

                {/* Options #3 */}
                <div className='mt-4 text-start'>
                    <DangerLabel htmlFor='choise3' className='mb-2'>Wrong Option 3</DangerLabel>
                    <TextField
                        name="choise3"
                        id="choise3"
                        placeholder='Wrong Answer....'
                        fullWidth
                        value={props.values.choise3}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        variant="filled"
                        helperText={props.touched.choise3 && props.errors.choise3}
                        error={props.touched.choise3 && Boolean(props.errors.choise3)}
                    />
                </div>

                <button className="btn btn-primary mx-auto mt-4" type="submit">ADD</button>
            </form>
        )}
    </Formik>
};

export default MCQ;