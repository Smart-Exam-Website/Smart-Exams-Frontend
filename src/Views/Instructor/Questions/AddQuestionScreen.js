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
import Essay from './QuestionTypes/Essay';
import Formula from './QuestionTypes/Formula';
import { QuestionTypes } from '../../../constants/QuestionTypes';


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
        let typesObject = QuestionTypes
        let typeList = []
        Object.keys(typesObject).forEach(key => {
            if (QuestionTypes[key] === QuestionTypes.GROUP)
                return;

            typeList.push({ id: key, value: typesObject[key] })
        })
        setQuestionTypes(typeList)
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
        let addedQuestion;
        request
            .then(res => {
                addedQuestion = res

                let isFromExamCreation = location?.state?.fromExamCreation
                let isFromGroup = location?.state?.isFromGroup
                let groupId = location?.state?.groupId

                if (groupId) {
                    QuestionServices.getQuestionDetails(groupId)
                        .then(res => {
                            let returnedQuestion = res?.question
                            let groupReturnedQuestions = res?.question?.questions
                            return QuestionServices.editGroupQuestion(groupId, {
                                questionText: returnedQuestion?.questionText,
                                questions: [...groupReturnedQuestions?.map(item => item.id), addedQuestion?.id]
                            })
                        })
                        .then(res => {
                            dispatch(saveAQuestion([addedQuestion], groupId))
                            showSuccessMsg("Request done successfully")
                            history.goBack()
                        })
                        .catch(err => HandleErrors(err))
                }
                else {
                    if(isFromExamCreation){
                        dispatch(saveAQuestion([addedQuestion], groupId))
                    }
                    showSuccessMsg("Request done successfully")
                    history.goBack()
                }
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

                    {questionType === QuestionTypes.MCQ &&
                        <div>
                            <MCQ
                                initValues={oldQuestionDetails?.type === QuestionTypes.MCQ ? oldQuestionDetails : null}
                                getQuestionCreationRequest={createQuestionHandler}
                            />
                        </div>
                    }
                    {questionType === QuestionTypes.ESSAY &&
                        <div>
                            <Essay
                                initValues={oldQuestionDetails?.type === QuestionTypes.ESSAY ? oldQuestionDetails : null}
                                getQuestionCreationRequest={createQuestionHandler}
                            />
                        </div>
                    }
                    {questionType === QuestionTypes.FORMULA &&
                        <div>
                            <Formula
                                initValues={oldQuestionDetails?.type === QuestionTypes.FORMULA ? oldQuestionDetails : null}
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
