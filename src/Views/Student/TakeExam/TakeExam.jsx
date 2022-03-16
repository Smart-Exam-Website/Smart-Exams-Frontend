import React, { useEffect } from 'react';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import MCQ from '../Questions/MCQ/MCQ';
import { ExamServices } from '../../../apis/Services/ExamService';
import { useState } from 'react';
import HandleErrors from '../../../hooks/handleErrors';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import { useParams } from 'react-router-dom';
import Essay from '../Questions/Essay/Essay';

import {QuestionTypes} from '../../../constants/QuestionTypes';





const TakeExam = (props) => {
    const params = useParams()
    const exam = props.location.state?.exam || { id: params.examId, name: 'Continoue The Exam' }
    const [questions, setQuestions] = useState(null);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

    useEffect(() => {
        let responseQuestions;
        console.log("Exam here")
        console.log(exam)
        ExamServices.getExamQuestions(exam.id)
            .then((response) => {
                responseQuestions = response.questions
                return ExamServices.getStudentExamAnswers(exam.id)
            })
            .then(res => {
                // Formatting answer array stage
                let formatedAnswers = {}
                res?.answers.forEach((answer) => {
                    formatedAnswers[answer.question_id] = { chosenOptionID: answer.option_id, chosenAnswer: answer.studentAnswer }
                })
                console.log("ANSWERS", formatedAnswers)
                //formated question stage
                let formatedQuestions = responseQuestions.map((question) => {
                    let thisQuestionAnswer = formatedAnswers?.[question.id]
                    if (!thisQuestionAnswer) return question

                    let formatedQuestion = { ...question, studentAnswer: thisQuestionAnswer }
                    return formatedQuestion
                })
                setQuestions([...formatedQuestions])
            })
            .catch((error) => {
                HandleErrors(error)
            })
    }, [exam.id]);

    const clickedNextHandler = (chosenOptionID, chosenAnswer, questionType) => {
        // Add this answer to backend
        console.log("Testing essay answers")
        console.log(chosenAnswer)
        console.log(chosenOptionID)

        let answerData = {}

        if (questionType === QuestionTypes.MCQ) {
            answerData = {
                "option_id": chosenOptionID,
                "studentAnswer": chosenAnswer,
                "question_id": questions[currentQuestionNumber].id,
                "exam_id": exam.id

            }

        }
        else if (questionType === QuestionTypes.ESSAY) {
            answerData = {
                "studentAnswer": chosenAnswer,
                "question_id": questions[currentQuestionNumber].id,
                "exam_id": exam.id

            }

        }

        ExamServices.addAnswer(answerData)
            .then(() => {
                // Go to next question by increasing currentQuestionNumber (if it's not in the last question) 
                const newQuestionNumber = currentQuestionNumber + 1
                // If we are in the last question, then we should refer to the Done Page
                if (newQuestionNumber === questions.length) {
                    ExamServices.submitExam(exam.id)
                        .then(res => {
                            showSuccessMsg("Exam has been submitted successfully")
                            props.history.push({
                                pathname: '/done',
                                state: { examName: exam.name }
                            })
                        })
                        .catch(err => HandleErrors(err))
                    return
                }
                // advance to the next question
                setCurrentQuestionNumber(newQuestionNumber)

            }).catch((error) => {
                HandleErrors(error)
            })

    }

    const clickedPreviousHandler = () => {
        // Go to previous question by decreasing currentQuestionNumber 
        setCurrentQuestionNumber(currentQuestionNumber - 1)
    }

    const getAnswer = (questionIndex, chosenOptionID, chosenAnswer) => {
        setQuestions((prevState) => {
            let newQuestions = [...prevState]
            newQuestions[questionIndex - 1] = {
                ...newQuestions[questionIndex - 1],
                studentAnswer: {
                    chosenOptionID,
                    chosenAnswer
                }
            }
            return newQuestions
        })
    }

    let My_Questions_Markup = questions?.map((question, index) => {
        // console.log("question.type")
        // console.log(question.type)
        console.log("question")
        console.log(question)
        if (question?.type === QuestionTypes.ESSAY) {
            return (


                <Essay
                    questionIndex={index + 1}
                    question={question}

                    clickedNext={clickedNextHandler}
                    clickedPrevious={clickedPreviousHandler}
                    previousButtonDisabled={currentQuestionNumber === 0}
                    changeNextNameIntoFinish={index === questions.length - 1}


                    key={props.questionIndex}

                />



            );
        }
        else if (question?.type === QuestionTypes.MCQ) {
            return (
                <MCQ
                    questionIndex={index + 1}

                    currentQuestionNumber={currentQuestionNumber}
                    key={props.questionIndex}

                    questionText={question.questionText}
                    answers={question.answers}

                    clickedNext={clickedNextHandler}
                    clickedPrevious={clickedPreviousHandler}

                    previousButtonDisabled={currentQuestionNumber === 0}
                    changeNextNameIntoFinish={index === questions.length - 1}

                    studentAnswerFunction={getAnswer}

                    savedStudentAnswer={question?.studentAnswer}
                />
            )

        }

        return null;

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
