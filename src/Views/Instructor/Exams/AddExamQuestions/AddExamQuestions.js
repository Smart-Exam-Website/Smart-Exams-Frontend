import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { matchPath, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { ExamServices } from '../../../../apis/Services/ExamService'
import CardComponent from '../../../../Components/CardComponent/CardComponent'
import MaterialModal from '../../../../Components/MaterialModal/MaterialModal'
import AddationMethodsMenu from '../../../../Components/QuestionComponents/AddationMethodsMenu'
import BorderdQuestionController from '../../../../Components/QuestionComponents/BorderdQuestionController'
import HandleErrors from '../../../../hooks/handleErrors'
import showSuccessMsg from '../../../../hooks/showSuccessMsg'
import { showAlert } from '../../../../redux/actions/AppActions'
import { addNewGroup, removeAllSavedQuestions, removeSavedQuestionFromExam } from '../../../../redux/actions/ExamAction'

import { TextField } from '@mui/material'
import BorderdGroupQuestion from '../../../../Components/QuestionComponents/BorderdGroupQuestion'


const AddExamQuestions = () => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const [selctedGroupName, setselctedGroupName] = useState(null);

    const AddQuestionHandler = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const goCreateNewQuestion = () => {
        history.push('/questions/add', { fromExamCreation: true, isFromGroup: Boolean(selctedGroupName), groupName: selctedGroupName })
    }
    const selectQuestionFromQBank = () => {
        history.push('/questions', { canSelectQuestionsForExam: true, isFromGroup: Boolean(selctedGroupName), groupName: selctedGroupName })
    }
    const goCreateNewGroup = () => {
        setShowGroupCreationForm(true)
        setTimeout(() => {
            document.getElementById('scrollElementToGroupCreationForm').scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100);
    }

    const methods = [
        {
            displayName: 'Create a new question',
            function: goCreateNewQuestion
        }
        ,
        {
            displayName: 'Select from question bank',
            function: selectQuestionFromQBank
        }
        ,
        setselctedGroupName && {
            displayName: 'Create a new group',
            function: goCreateNewGroup
        }
    ]

    /** Stuff for editing mode */
    const isEditMode = Boolean(location.state?.exam)
    const examOldData = location.state?.exam
    const examOldQuestions = examOldData?.questions || []
    const [examId, setExamId] = useState(null)

    useEffect(() => {
        const match = matchPath(history.location.pathname, {
            path: '/exams/:examId/add-questions'
        })
        console.log(match.params.examId)
        setExamId(match.params.examId)
    }, [history.location.pathname])


    /** Get Questions of this exam */
    const [questions, setQuestions] = useState(null);
    const savedQuestions = useSelector(state => state?.exam?.examQuestions)
    const getQuestions = () => {
        setQuestions([...examOldQuestions, ...savedQuestions])
    }
    useEffect(() => {
        getQuestions();
        // eslint-disable-next-line
    }, []);


    const submitExamHandler = () => {
        let submittedQuestions = [...questions]
        submittedQuestions = submittedQuestions.map(item => { return { question_id: item.id } })
        let request = !isEditMode ? ExamServices.addQuestionsToExam(examId, submittedQuestions) : ExamServices.editQuestionsOfExam(examId, submittedQuestions)

        request
            .then(res => {
                history.push('/exams')
                dispatch(removeAllSavedQuestions())
                showSuccessMsg('Exam has been created successfully!')
            })
            .catch(err => HandleErrors(err))
    }

    const removeQuestionFromListHandler = (id) => {
        dispatch(removeSavedQuestionFromExam(id))
        setQuestions(prevState => {
            console.log(prevState, id)
            return prevState.filter(item => item.id !== id)
        })
    }


    // QUESTION GROUP STUFF
    const savedQroupQuestions = useSelector(state => state?.exam?.examGroups)
    useEffect(() => {
        console.log("GROUPS", savedQroupQuestions)
    }, [])

    const [showGroupCreationForm, setShowGroupCreationForm] = useState(false)
    const createGroupQuestion = (values) => {
        let group = {
            groupName: values?.groupName,
            questions: []
        }
        dispatch(addNewGroup(group))
        setShowGroupCreationForm(false)
    }
    const cancelGroupCreation = () => {
        setShowGroupCreationForm(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const showGroupQuestionMenu = (e, selectedName) => {
        AddQuestionHandler(e)
        setselctedGroupName(selectedName)
    }
    const hideGroupQuestionMenu = (ss) => {
        setAnchorEl(ss)
        setselctedGroupName(null)
    }
    // Main Component
    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={!isEditMode ? 'Create Exam: add questions' : 'Edit Exam: edit questions'}>
                    <div className='p-4'>
                        <div className='d-flex justify-content-end mb-4'>
                            <button onClick={AddQuestionHandler} className='btn btn-success'>
                                <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff' }} />
                            </button>
                            <AddationMethodsMenu methods={methods} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                        </div>

                        <div>
                            {
                                questions?.map(question =>
                                    <BorderdQuestionController
                                        deleteFunction={() => removeQuestionFromListHandler(question?.id)}
                                        id={question?.id} key={question?.id}
                                        questionTitle={question?.questionText}
                                    />
                                )
                            }
                        </div>

                        <AddationMethodsMenu methods={methods} anchorEl={anchorEl} setAnchorEl={hideGroupQuestionMenu} />
                        <div>
                            {
                                savedQroupQuestions?.map(question =>
                                    <div className='position-relative'>
                                        <button onClick={(e) => showGroupQuestionMenu(e, question?.groupName)} className='btn btn-success position-absolute p-0 rounded-circle' style={{ top: -20, zIndex: 20, right: -10, width: 44, height: 44 }}>
                                            <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff', transform: 'scale(0.8)' }} />
                                        </button>
                                        <BorderdGroupQuestion
                                            questionTitle={question?.groupName}
                                            questionsMarkup={
                                                question?.questions?.map(subQuestion => (
                                                    <BorderdQuestionController
                                                        key={subQuestion?.id}
                                                        id={subQuestion?.id}
                                                        questionTitle={subQuestion?.questionText}
                                                    />
                                                ))
                                            }
                                        />
                                    </div>
                                )
                            }
                        </div>

                        <div id="scrollElementToGroupCreationForm" />
                        {showGroupCreationForm ?
                            <div>
                                <BorderdGroupQuestion
                                    isCreationMode={true}
                                    cancelCreationFunction={cancelGroupCreation}
                                    getCreationData={createGroupQuestion}
                                />
                            </div>
                            :
                            null
                        }


                        <div>
                            <button onClick={submitExamHandler} className="btn btn-primary mx-auto mt-4">Submit</button>
                        </div>
                    </div>
                </CardComponent>
            </div >
        </div >
    )
}

export default AddExamQuestions
