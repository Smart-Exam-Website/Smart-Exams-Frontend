import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../constants/Colors';
import CloseIcon from '@mui/icons-material/Close';
import { ClickableView } from '../../constants/GlobalStyle';
import { useHistory } from 'react-router-dom';
import BorderdQuestionController from './BorderdQuestionController';
import { TextField, Typography } from '@mui/material';
import { Formik } from 'formik';

const Wrapper = styled.div`
    border: 1px solid ${Colors.primary};
    border-radius: 12px;
    padding: 16px 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
const Text = styled.span`
    color: ${Colors.primary};
    text-decoration: underline;
    font-weight: 700;
    font-size: 21px;
  `

const BorderdGroupQuestion = ({ isCreationMode, getCreationData, cancelCreationFunction = () => { }, questionTitle, id, deleteFunction = () => { }, questionsMarkup }) => {
    const history = useHistory();

    const goToQuestion = () => {
        /** TODO */
        history.push('/questions/' + id)
    }

    const headerTextStyle = {
        backgroundColor: '#fff',
        position: 'absolute',
        top: -25,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '5px 10px'
    }


    const submitGroupQuesion = (values) => {
        console.log(values)
        getCreationData(values)
    }

    const cancelHandler = () => {
        cancelCreationFunction()
    }

    const CreationFormMarkup = (
        <Wrapper className='my-5 rounded-2' style={{ flexDirection: 'column', alignItems: 'stretch', position: 'relative' }}>
            <Typography
                variant='h5'
                className='fw-bolder'
                color="primary"
                style={headerTextStyle}
            >
                Create Group Question
            </Typography>
            <Formik
                initialValues={{ groupName: "" }}
                onSubmit={submitGroupQuesion}
            >
                {props => (
                    <>
                        <div className='mt-4'>
                            <TextField
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                name="groupName"
                                required
                                label="Group Name"
                                variant="outlined"
                            />
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button onClick={cancelHandler} className="btn btn-secondary mx-auto mt-4">Cancel</button>
                            <button onClick={props.handleSubmit} className="btn btn-primary mx-auto mt-4">Save</button>
                        </div>
                    </>
                )}
            </Formik>
        </Wrapper>
    )

    return (isCreationMode ?
        CreationFormMarkup
        :
        <div>
            <Wrapper className='my-5 rounded-2' style={{ flexDirection: 'column', alignItems: 'stretch', position: 'relative' }}>
                <Typography
                    variant='h5'
                    className='fw-bolder'
                    color="primary"
                    style={headerTextStyle}
                >
                    Group
                </Typography>
                <div className='mb-4 mt-4 w-100 d-flex align-items-start justify-content-between'>
                    <ClickableView onClick={goToQuestion}>
                        <Text>{questionTitle}</Text>
                    </ClickableView>
                    <ClickableView onClick={deleteFunction}>
                        <CloseIcon color={'error'} fontSize={'large'} />
                    </ClickableView>
                </div>
                <div className='mx-5'>
                    {questionsMarkup}
                </div>
            </Wrapper>

        </div>
    )

};

export default BorderdGroupQuestion;
