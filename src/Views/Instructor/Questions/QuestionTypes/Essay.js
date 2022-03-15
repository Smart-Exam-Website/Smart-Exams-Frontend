import { TextField } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../../constants/Colors';
import * as yup from 'yup';
import { QuestionServices } from '../../../../apis/Services/QuestionService';

const Label = styled.label`
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: #000;
`


const SuccessLabel = styled(Label)`
    color: ${Colors.success};
`

const Essay = ({ initValues, getQuestionCreationRequest = () => { } }) => {
    const EssaySchema = yup.object().shape({
        questionText: yup.string().required('This is a required field'),
        correctAnswer: yup.string().required('This is a required field'),
    });
    const submitQuestionHandler = (values) => {
        // console.log(values)
        if (!initValues) {
            let creationRequest = QuestionServices.createEssayQuestion({
                questionText: values?.questionText,
                // correctAnswer: values?.correctAnswer,
                answers: [values?.correctAnswer]
            }).then((response) => {
                console.log("Success Response")
                console.log(response)

            }).catch((error) => {
                console.log("error")
                console.log(error)


            })
            // pass the request outside the component
            getQuestionCreationRequest(creationRequest)
        }
        //EDIT MODE
        else {
            let editRequest = QuestionServices.editQuestion(initValues?.id, {
                questionText: values.questionText,
                answers: [values.correctAnswer],
            })

            // pass the request outside the component
            getQuestionCreationRequest(editRequest)
        }

    }

    return <Formik
        initialValues={{
            questionText: initValues?.questionText || '',
            correctAnswer: initValues?.correctAnswer || '',

        }}
        enableReinitialize={true}
        validationSchema={EssaySchema}
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
                    <SuccessLabel htmlFor='correctAnswer' className='mb-2'>Model Answer</SuccessLabel>
                    <TextField
                        name="correctAnswer"
                        id="correctAnswer"
                        placeholder='Model Answer....'
                        multiline
                        rows={9}
                        fullWidth
                        value={props.values.correctAnswer}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        variant="filled"
                        helperText={props.touched.correctAnswer && props.errors.correctAnswer}
                        error={props.touched.correctAnswer && Boolean(props.errors.correctAnswer)}
                    />
                </div>

                <button className="btn btn-primary mx-auto mt-4" type="submit">ADD</button>
            </form>
        )}
    </Formik>
};

export default Essay;
