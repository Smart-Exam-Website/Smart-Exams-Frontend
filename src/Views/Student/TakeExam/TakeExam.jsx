import React, { useEffect } from 'react';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import MCQ from '../Questions/MCQ/MCQ';
import { ExamServices } from '../../../apis/Services/ExamService';
import { useState } from 'react';
import HandleErrors from '../../../hooks/handleErrors';
const TakeExam = (props) => {
    const exam = props.location.state.exam
    // console.log("Exam")
    // console.log(exam.name)
    const [questions, setQuestions] = useState(null);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);


    useEffect(() => {
        ExamServices.getExamQuestions(exam.id)
            .then((response) => {
                setQuestions(response.questions.map((question) => { return question }))

            }).catch((error) => {
                HandleErrors(error)
            })
    }, []);



    const clickedNextHandler = (chosenOptionID, chosenAnswer) => {
        // // this code pevents from going to another page
        // event.preventDefault()

        // Add this answer to backend
        const answerData = {
            "option_id": chosenOptionID,
            "studentAnswer": chosenAnswer,
            "question_id": questions[currentQuestionNumber].id,
            "exam_id": exam.id

        }

        ExamServices.addAnswer(answerData)
            .then(() => {
                // Answer Added to backend

            }).catch((error) => {
                HandleErrors(error)
            })



        // Go to next question by increasing currentQuestionNumber (if it's not in the last question) 
        const newQuestionNumber = currentQuestionNumber + 1

        
        // If we are in the last question, then we should refer to the Done Page
        if (newQuestionNumber === questions.length) {
            props.history.push({
                pathname: '/done',
                state: { examName: exam.name }
            })

            return
        }

        // advance to the next question
        setCurrentQuestionNumber(newQuestionNumber)

        // console.log(currentQuestionNumber)




    }
    const clickedPreviousHandler = () => {

        // Add this answer to backend


        // Go to next question by increasing currentQuestionNumber (if it's not in the last question) 

        setCurrentQuestionNumber(currentQuestionNumber - 1)
        // console.log(currentQuestionNumber)




    }

    const My_Questions_Markup = questions?.map((question, index) => {
        return (
            <MCQ
                question_index={index + 1}

                questionText={question.questionText}
                answers={question.answers}

                clickedNext={clickedNextHandler}
                clickedPrevious={clickedPreviousHandler}

                previousButtonDisabled={currentQuestionNumber === 0}
                changeNextNameIntoFinish={index === questions.length - 1}
            >

            </MCQ>
        )

    })




    return (
        <div>
            <div className="row justify-content-center text-center my-5">
                <div className="col-md-8 col-12">
                    <CardComponent title={exam.name}>

                        {My_Questions_Markup?.[currentQuestionNumber]}



                    </CardComponent>
                </div>
            </div>
        </div>
    );
}

export default withRouter(TakeExam);
