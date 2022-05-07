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
import { QuestionServices } from '../../../../apis/Services/QuestionService'
import { QuestionTypes } from '../../../../constants/QuestionTypes'


const AddExamQuestions = () => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const [groupQuestionAnchorEl, setGroupQuestionAnchorEl] = useState(null);
    const [selctedGroupId, setselctedGroupId] = useState(null);

    const AddQuestionHandler = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const goCreateNewQuestion = () => {
        history.push('/questions/add', { fromExamCreation: true, isFromGroup: Boolean(selctedGroupId), groupId: selctedGroupId })
    }
    const selectQuestionFromQBank = () => {
        history.push('/questions', { canSelectQuestionsForExam: true, isFromGroup: Boolean(selctedGroupId), groupId: selctedGroupId })
    }
    const goCreateNewGroup = () => {
        setShowGroupCreationForm(true)

        // Delay to give chance to be a static content to not distribute the scrolling
        setTimeout(() => {
            document.getElementById('scrollElementToGroupCreationForm').scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100);
    }
    const groupMethods = [
        {
            displayName: 'Create a new question',
            function: goCreateNewQuestion
        }
        ,
        {
            displayName: 'Select from question bank',
            function: selectQuestionFromQBank
        }
    ]
    const methods = [
        ...groupMethods,
        ,
        {
            displayName: 'Create a new group',
            function: goCreateNewGroup
        }
    ]


    /** Stuff for editing mode */
    const isEditMode = Boolean(location.state?.exam)
    const examOldData = location.state?.exam
    const [examOldQuestions, setExamOldQuestions] = useState(null)
    const [examId, setExamId] = useState(null)

    useEffect(() => {
        const match = matchPath(history.location.pathname, {
            path: '/exams/:examId/add-questions'
        })
        console.log(match.params.examId)
        setExamId(match.params.examId)
    }, [history.location.pathname])

    /** Get Old Exam Questions */
    useEffect(() => {
        if (!examId) return;

        ExamServices.getExamQuestions(examId)
            .then(res => {
                setExamOldQuestions(res?.questions)
            })
            .catch(err => HandleErrors(err))
    }, [examId])



    /** Get Questions of this exam */
    const [questions, setQuestions] = useState(null);
    const savedQuestions = useSelector(state => state?.exam?.examQuestions)
    const getQuestions = () => {
        console.log(examOldQuestions)
        let oldQuestionsOtherThanGroupQuestions = examOldQuestions?.filter(item => (item.type !== QuestionTypes.GROUP))
        setQuestions([...oldQuestionsOtherThanGroupQuestions, ...savedQuestions])
    }
    useEffect(() => {
        if (!examOldQuestions) return
        getQuestions();
        // eslint-disable-next-line
    }, [examOldQuestions]);


    const submitExamHandler = () => {
        let submittedQuestions = [...questions]
        submittedQuestions = submittedQuestions?.map(item => { return { question_id: item.id } })
        let qroupQuestionsId = groupQuestions?.map(item => { return { question_id: item.id } })
        submittedQuestions = [...(submittedQuestions || []), ...(qroupQuestionsId || [])]
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
            return prevState?.filter(item => item.id !== id)
        })
        setGroupQuestions(prevState => {
            return prevState?.filter(item => item.id !== id)
        })
    }


    // QUESTION GROUP STUFF
    const [groupQuestions, setGroupQuestions] = useState(null);
    const savedQroupQuestions = useSelector(state => state?.exam?.examGroups)
    useEffect(() => {
        let oldGroupQuestionsOnly = examOldQuestions?.filter(item => (item?.type === QuestionTypes.GROUP)) || []
        setGroupQuestions([...oldGroupQuestionsOnly, ...savedQroupQuestions])
    }, [examOldQuestions, savedQroupQuestions])

    const [showGroupCreationForm, setShowGroupCreationForm] = useState(false)
    const createGroupQuestion = (values) => {
        QuestionServices.createGroupQuestion({ questionText: values?.groupName })
            .then(res => {
                console.log("QUESTION RES", res)
                let group = {
                    id: res.id,
                    questionText: values?.groupName,
                    type: QuestionTypes.GROUP,
                    questions: []
                }
                dispatch(addNewGroup(group))
                setShowGroupCreationForm(false)
            })
            .catch(err => HandleErrors(err))
    }
    const cancelGroupCreation = () => {
        setShowGroupCreationForm(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const showGroupQuestionMenu = (e, selectedgroupId) => {
        setGroupQuestionAnchorEl(e.currentTarget)
        setselctedGroupId(selectedgroupId)
    }
    const hideGroupQuestionMenu = () => {
        setGroupQuestionAnchorEl(null)
        setselctedGroupId(null)
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

                        <AddationMethodsMenu methods={groupMethods} anchorEl={groupQuestionAnchorEl} setAnchorEl={hideGroupQuestionMenu} />
                        <div>
                            {
                                groupQuestions?.map(question =>
                                    <div key={question.id} className='position-relative'>
                                        <button onClick={(e) => showGroupQuestionMenu(e, question?.id)} className='btn btn-success position-absolute p-0 rounded-circle' style={{ top: -20, zIndex: 20, right: -10, width: 44, height: 44 }}>
                                            <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff', transform: 'scale(0.8)' }} />
                                        </button>
                                        <BorderdGroupQuestion
                                            questionTitle={question?.questionText}
                                            deleteFunction={() => removeQuestionFromListHandler(question?.id)}
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
