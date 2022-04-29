import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
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
import { removeAllSavedQuestions, removeSavedQuestionFromExam } from '../../../../redux/actions/ExamAction'

import { TextField } from '@mui/material'


const AddExamQuestions = () => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const [groupName, setGroupName] = useState('');
    



    const AddQuestionHandler = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const goCreateNewQuestion = () => {
        history.push('/questions/add', { fromExamCreation: true })
    }
    const selectQuestionFromQBank = () => {
        history.push('/questions', { canSelectQuestionsForExam: true })
    }
    const goCreateNewGroup = () => {


        history.push('/questions/add-group', { canSelectQuestionsForExam: true })
    }

    
    // const confirmCreateNewGroup = () => {
    //     return (
    //         <MaterialModal title={"Please add group name"} close={closeModal}>
    //             <TextField fullWidth onChange={(e) => { setGroupName(e.target.value) }} id="outlined-basic" label="Group Name" variant="outlined" />

    //             <button 
    //             disabled={groupName === ''} 
    //             onClick={setCloseModal(true)} 
    //             className="btn btn-primary mx-auto mt-4">Create</button>


    //         </MaterialModal>
    //     );
    // }

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
        {
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
        ExamServices.addQuestionsToExam(examId, submittedQuestions)
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




    // Main Component
    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={!isEditMode ? 'Add Questions' : 'View Questions'}>
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

                        
                        <div>
                            <button onClick={submitExamHandler} className="btn btn-primary mx-auto mt-4">Submit</button>
                        </div>
                    </div>
                </CardComponent>
            </div>
        </div>
    )
}

export default AddExamQuestions
