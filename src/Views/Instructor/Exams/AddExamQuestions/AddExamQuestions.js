import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CardComponent from '../../../../Components/CardComponent/CardComponent'
import AddationMethodsMenu from '../../../../Components/QuestionComponents/AddationMethodsMenu'
import BorderdQuestionController from '../../../../Components/QuestionComponents/BorderdQuestionController'

const AddExamQuestions = () => {
    const history = useHistory()

    const [anchorEl, setAnchorEl] = useState(null);
    const AddQuestionHandler = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const goCreateNewQuestion = () => {
        history.push('/questions/add', { fromExamCreation: true })
    }
    const selectQuestionFromQBank = () => {
        history.push('/questions', { canSelectQuestionsForExam: true })
    }
    const methods = [
        {
            displayName: 'Create new question',
            function: goCreateNewQuestion
        },
        {
            displayName: 'Select from quesiton bank',
            function: selectQuestionFromQBank
        }
    ]

    /** Get Questions of this exam */
    const [questions, setQuestions] = useState(null);
    const savedQuestions = useSelector(state => state.exam.examQuestions)
    const getQuestions = () => {
        const questionss = [
            { questionText: 'Question 1', id: '1' },
            { questionText: 'Question 2', id: '2' },
            { questionText: 'Question 3', id: '3' },
        ]
        setQuestions([...questionss, ...savedQuestions])
    }
    // eslint-disable-next-line
    useEffect(() => {
        getQuestions();
        console.log("hii")
    }, [savedQuestions]);


    const submitExamHandler = () => {
        history.push('/exams')
    }

    const removeQuestionFromListHandler = (id) => {

    }
    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={'Add Question'}>
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
                                        deleteFunction={() => removeQuestionFromListHandler(question.id)}
                                        id={question.id} key={question.id}
                                        questionTitle={question.questionText}
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
