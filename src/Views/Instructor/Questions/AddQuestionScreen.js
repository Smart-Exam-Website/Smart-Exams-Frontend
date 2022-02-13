import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MCQ from './QuestionTypes/MCQ';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import { Colors } from '../../../constants/Colors';
import HandleErrors from '../../../hooks/handleErrors';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveAQuestion } from '../../../redux/actions/ExamAction';
import { QuestionServices } from '../../../apis/Services/QuestionService';


const AddQuestionScreen = () => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    /** Stuff for editing mode */
    const isEditMode = Boolean(location.state?.question)
    const oldQuestion = location.state?.question

    /** get question details */
    const [oldQuestionDetails, setOldQuestionDetails] = useState(null)
    useEffect(() => {
        if (!oldQuestion?.id) return
        QuestionServices.getQuestionDetails(oldQuestion?.id)
            .then(res => {
                setOldQuestionDetails(res?.question)
            })
            .catch(err => HandleErrors(err))
    }, [oldQuestion?.id])

    const [questionTypes, setQuestionTypes] = useState(null);
    const getQuestionTypes = () => {
        setQuestionTypes([
            { id: '123', value: 'mcq' }
        ])
    }
    useEffect(() => {
        getQuestionTypes();
    }, []);


    const [questionType, setQuestionType] = useState(oldQuestion?.type || '');
    const questionTypeSelectionMenuMarkup = (
        <div className='w-50 mx-auto'>
            <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label="Question Type"
                value={questionType}
                onChange={(event) => setQuestionType(event.target.value)}
                disabled={isEditMode}
            >
                {questionTypes?.map((type) => (
                    <MenuItem key={type.id} value={type.value}>
                        {type.value}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )

    const createQuestionHandler = (request) => {
        request
            .then(res => {
                console.log("Question request", res)

                let isFromExamCreation = location.state?.fromExamCreation
                if (isFromExamCreation) {
                    dispatch(saveAQuestion({ questionText: res.questionText, id: res.id }))
                }
                showSuccessMsg("Request done successfully")
                history.goBack()
            })
            .catch(err => HandleErrors(err))
    }

    return <div className="row justify-content-center text-center my-5">
        <div className="col-md-8 col-12">
            <CardComponent title={!isEditMode ? 'Add Question' : 'Edit Question'}>
                <div className='p-4'>
                    {questionTypes && questionTypeSelectionMenuMarkup}

                    {!questionType &&
                        <div className='d-flex flex-row justify-content-center align-items-center mt-5'>
                            <ExclamationCircleOutlined size={36} style={{ color: Colors.danger, marginInlineEnd: '.5rem' }} />
                            <h6 className='text-danger m-0'>Please Choose Question Type</h6>
                        </div>
                    }

                    {questionType === 'mcq' &&
                        <div>
                            <MCQ
                                initValues={oldQuestionDetails?.type === 'mcq' ? oldQuestionDetails : null}
                                getQuestionCreationRequest={createQuestionHandler}
                            />
                        </div>
                    }
                </div>
            </CardComponent>
        </div>
    </div>
};

export default AddQuestionScreen;
