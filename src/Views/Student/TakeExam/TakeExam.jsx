import React, { useEffect, useRef } from 'react';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import MCQ from '../Questions/MCQ/MCQ';
import { ExamServices } from '../../../apis/Services/ExamService';
import { useState } from 'react';
import HandleErrors from '../../../hooks/handleErrors';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import { useParams } from 'react-router-dom';
import Essay from '../Questions/Essay/Essay';

import { QuestionTypes } from '../../../constants/QuestionTypes';
import useListShuffler from '../../../hooks/useListShuffler';
import useSwitchBrowserDetector from '../../../hooks/useSwitchBrowserDetector';
import CheaterPopup from '../../../Components/CheaterPopup/CheaterPopup';
import Webcam from 'react-webcam';
import ExamCounter from '../../../Components/ExamCounter/ExamCounter';

const _getMinsFromDuration = (duration) => {
    if (!duration) return null
    let durationList = duration?.split(':')
    let mins = Number(durationList[0]) * 60 + Number(durationList[1])
    return mins
}
const _getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const TakeExam = (props) => {
    const params = useParams()
    const exam = props.location.state?.exam || { id: params.examId, name: 'Continoue The Exam' }
    const [questions, setQuestions] = useState(null);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

    const shuffler = useListShuffler()
    const randomChoices = (choices) => {
        return shuffler(choices)
    }
    const randomQuestions = (questions) => {
        return shuffler(questions)
    }

    const [examInfo, setExamInfo] = useState(null)
    const [examOptions, setExamOptions] = useState(null)
    /** getting exam config */
    useEffect(() => {
        ExamServices.getExamConfig(exam.id)
            .then(res => {
                setExamOptions(res.configuration)
            })
            .catch(err => HandleErrors(err))
    }, [])

    /** getting exam info*/
    useEffect(() => {
        ExamServices.getExamInfo(exam.id)
            .then(res => {
                setExamInfo(res.exam)
            })
            .catch(err => HandleErrors(err))
    }, [])

    /** getting questions */
    useEffect(() => {
        let responseQuestions;
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
                //formated question stage
                let formatedQuestions = responseQuestions.map((question) => {
                    let thisQuestionAnswer = formatedAnswers?.[question.id]
                    if (!thisQuestionAnswer) return question

                    let formatedQuestion = { ...question, studentAnswer: thisQuestionAnswer }
                    return formatedQuestion
                })
                /** Randomize choices */
                formatedQuestions = formatedQuestions?.map(item => { return { ...item, answers: randomChoices(item?.answers) } })

                /** Randomize Question */
                formatedQuestions = randomQuestions(formatedQuestions)

                setQuestions([...formatedQuestions])
            })
            .catch((error) => {
                HandleErrors(error)
            })
    }, [exam.id]);

    /** Timer to sent cheat reports */
    let timer;
    let examDurationInMins = _getMinsFromDuration('00:05:00'/*examInfo?.duration*/);
    const [totalCountedMins, setTotalCountedMins] = useState(0)
    const [lastRandomMin, setLastRandomMin] = useState(1)
    const activateJobWithRandomTriggerTimer = (RandomMins, callback = () => { }) => {
        timer = setTimeout(() => {
            setTotalCountedMins(prevState => prevState + RandomMins)
            setLastRandomMin(RandomMins)
            callback()
        }, RandomMins * 60 * 100/*1000*/);
    }
    useEffect(() => {
        if (totalCountedMins >= examDurationInMins) return
        let randomMins = _getRandomNumber(1, examDurationInMins - lastRandomMin + 1)
        activateJobWithRandomTriggerTimer(randomMins, () => {
            reportFaceDetectionCheater()
            reportFaceRecognationCheater()
        })

        return () => {
            clearTimeout(timer)
        }
    }, [totalCountedMins])


    const [cheatReasons, setCheatReasons] = useState([])
    const [cheaterImage, setCheaterImage] = useState(null)
    const [isCheaterPopVisible, setIsCheaterPopVisible] = useState(null)

    /** Switch Browser detector */
    const isBrowserSwitched = useSwitchBrowserDetector()
    const reportSwitchBrowserCheater = () => {
        setIsCheaterPopVisible(true)
        setCheatReasons(prevState => Array.from(new Set([...prevState, 'Switching the browser'])))
    }
    useEffect(() => {
        if (!isBrowserSwitched) return
        reportSwitchBrowserCheater()
    }, [isBrowserSwitched])

    /** Face detection detector */
    const reportFaceDetectionCheater = () => {
        setIsCheaterPopVisible(true)
        setCheatReasons(prevState => Array.from(new Set([...prevState, 'Multi face detection'])))
        let capturePhotoFromWebcam = webcamRef?.current?.getScreenshot()
        setCheaterImage(capturePhotoFromWebcam)
    }

    /** Face recognation detector */
    const reportFaceRecognationCheater = () => {
        setIsCheaterPopVisible(true)
        setCheatReasons(prevState => Array.from(new Set([...prevState, 'Face unvalidity'])))
        let capturePhotoFromWebcam = webcamRef?.current?.getScreenshot()
        setCheaterImage(capturePhotoFromWebcam)
    }

    const clickedNextHandler = (chosenOptionID, chosenAnswer, questionType) => {
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

    const webcamRef = useRef(null)
    return (
        <div>
            <div className="d-flex justify-content-between">
                <Webcam
                    audio={false}
                    height={360}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                <ExamCounter />
            </div>

            <div className="row justify-content-center text-center my-5">
                <div className="col-md-8 col-12">
                    <CardComponent title={exam.name}>
                        {My_Questions_Markup?.[currentQuestionNumber]}
                    </CardComponent>
                </div>
            </div>

            <CheaterPopup
                isVisible={isCheaterPopVisible}
                setVisibility={(value) => {
                    setIsCheaterPopVisible(value)
                    setCheatReasons([])
                    setCheaterImage(null)
                }}
                cheatReasons={cheatReasons}
                cheaterImage={cheaterImage}
            />
        </div>
    );
}

export default withRouter(TakeExam);
