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
import { CheatServices } from '../../../apis/Services/CheatService';
import moment from 'moment';
import Formula from '../Questions/Formula/Formula';
import Group from '../Questions/Group/Group';

const MIN_INTERVAL_TIME_TO_DO_CHEAT_CHECK = 10
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

    const [endExamTime, setEndExamTime] = useState(null)
    useEffect(() => {
        console.log(questions?.[currentQuestionNumber])
    }, [currentQuestionNumber])


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
        if (!examOptions) return

        let responseQuestions;
        ExamServices.getExamQuestions(exam.id)
            .then((response) => {
                responseQuestions = response.questions
                return ExamServices.getStudentExamAnswers(exam.id)
            })
            .then(res => {
                setEndExamTime(res?.endTime)

                // Formatting answer array stage
                let formatedAnswers = {}
                res?.answers.forEach((answer) => {
                    formatedAnswers[answer.question_id] = { chosenOptionID: answer.option_id, chosenAnswer: answer.studentAnswer }
                })
                //formated question stage
                let formatedQuestions = responseQuestions.map((question) => {
                    if (question?.type === QuestionTypes.GROUP) {
                        let newQuestionsForThisGroupQuestion = [];
                        question?.questions?.forEach(element => {
                            let thisQuestionAnswer = formatedAnswers?.[element.id]
                            let formatedQuestion;

                            if (!thisQuestionAnswer)
                                formatedQuestion = element
                            else
                                formatedQuestion = { ...element, studentAnswer: thisQuestionAnswer }

                            newQuestionsForThisGroupQuestion.push(formatedQuestion)
                        });

                        return { ...question, questions: newQuestionsForThisGroupQuestion }
                    }

                    let thisQuestionAnswer = formatedAnswers?.[question.id]
                    if (!thisQuestionAnswer) return question

                    let formatedQuestion = { ...question, studentAnswer: thisQuestionAnswer }
                    return formatedQuestion
                })
                console.log(formatedQuestions)
                /** Randomize choices */
                formatedQuestions = formatedQuestions?.map(item => {
                    if (item?.type === QuestionTypes.MCQ)
                        return { ...item, answers: randomChoices(item?.options) }
                    else
                        return item
                })

                /** Randomize Question */
                if (examOptions?.questionsRandomOrder)
                    formatedQuestions = randomQuestions(formatedQuestions)

                setQuestions([...formatedQuestions])
            })
            .catch((error) => {
                HandleErrors(error)
            })
    }, [exam.id, examOptions]);

    /** Timer to sent cheat reports */
    let timer;
    let examDurationInSecs = Number(moment(endExamTime).diff(moment(), 'seconds'))
    let examDurationInMins = Math.ceil(examDurationInSecs / 60);
    const [totalCountedMins, setTotalCountedMins] = useState(0)
    const [lastRandomMin, setLastRandomMin] = useState(1)
    const activateJobWithRandomTriggerTimer = (RandomMins, callback = () => { }) => {
        timer = setTimeout(() => {
            setTotalCountedMins(prevState => prevState + RandomMins)
            setLastRandomMin(RandomMins)
            callback()
        }, RandomMins * 60 * 1000);
    }
    useEffect(() => {
        if (!examDurationInMins) return
        if (totalCountedMins >= examDurationInMins) return
        let randomMins = _getRandomNumber(1, Math.min(MIN_INTERVAL_TIME_TO_DO_CHEAT_CHECK, (examDurationInMins - lastRandomMin + 1)))
        activateJobWithRandomTriggerTimer(randomMins, () => {
            examOptions?.faceDetection && reportFaceDetectionCheater()
            examOptions?.faceRecognition && reportFaceRecognationCheater()
        })

        return () => {
            clearTimeout(timer)
        }
    }, [totalCountedMins, examDurationInMins])


    const [cheatReasons, setCheatReasons] = useState([])
    const [cheaterImage, setCheaterImage] = useState(null)
    const [isCheaterPopVisible, setIsCheaterPopVisible] = useState(null)

    /** Switch Browser detector */
    const isBrowserSwitched = useSwitchBrowserDetector()
    const reportSwitchBrowserCheater = () => {
        CheatServices.sentSwitchBrowserCheatAttempt(exam.id)
            .then(res => {
                setIsCheaterPopVisible(true)
                setCheatReasons(prevState => Array.from(new Set([...prevState, 'Switching the browser'])))
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (!isBrowserSwitched) return
        examOptions?.disableSwitchBrowser && reportSwitchBrowserCheater()
    }, [isBrowserSwitched])

    /** Face detection detector */
    const reportFaceDetectionCheater = async () => {
        let capturePhotoFromWebcam = webcamRef?.current?.getScreenshot()
        let faceDetectionData = {
            "image": capturePhotoFromWebcam,
            "examId": exam.id
        }
        try {
            let response = await ExamServices.applyFaceDetection(faceDetectionData)
            if (Number(response.numberOfFaces) === 1) return
            await CheatServices.sentFaceDetectionCheatAttempt(exam.id, response?.image)
            setCheaterImage(capturePhotoFromWebcam)
            setIsCheaterPopVisible(true)
            setCheatReasons(prevState => Array.from(new Set([...prevState, 'Multi face detection'])))

        } catch (error) {
            console.log(error)
        }
    }

    /** Face recognation detector */
    const reportFaceRecognationCheater = async () => {
        let capturePhotoFromWebcam = webcamRef?.current?.getScreenshot()
        let faceVerificationData = {
            "image1": capturePhotoFromWebcam,
            "examId": exam.id
        }
        try {
            let response = await ExamServices.applyFaceVerification(faceVerificationData)
            if (response.verified) return
            await CheatServices.sentFaceRecognationCheatAttempt(exam.id, response?.image)
            setCheaterImage(capturePhotoFromWebcam)
            setIsCheaterPopVisible(true)
            setCheatReasons(prevState => Array.from(new Set([...prevState, 'Face unvalidity'])))
        } catch (error) {
            console.log(error)
        }
    }

    /** Sending Answers and go to next question */
    const _successSentAnswerResonse = () => {
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
        showSuccessMsg("Answer Saved Successfully")

        // advance to the next question
        setCurrentQuestionNumber(newQuestionNumber)
    }
    const _saveAnswer = (chosenOptionID, chosenAnswer) => {
        let newQuestions = [...questions]
        let currentQuestion = newQuestions[currentQuestionNumber]
        // Normal Question
        if (!Array.isArray(chosenAnswer)) {
            currentQuestion = { ...currentQuestion, studentAnswer: { chosenOptionID, chosenAnswer } }
            newQuestions[currentQuestionNumber] = { ...currentQuestion }
        }
        // Group Question
        else {
            let newQuestionsForThisGroupQuestion = [];
            currentQuestion?.questions.forEach(element => {
                let thisQuestionAnswer = chosenAnswer.find(item => item.questionId === element.id)
                let formatedQuestion;

                if (!thisQuestionAnswer)
                    formatedQuestion = element
                else
                    formatedQuestion = { ...element, studentAnswer: thisQuestionAnswer.answer }

                newQuestionsForThisGroupQuestion.push(formatedQuestion)
            });
            newQuestions[currentQuestionNumber]['questions'] = newQuestionsForThisGroupQuestion
        }
        setQuestions(newQuestions)
    }
    const clickedNextHandler = (chosenOptionID, chosenAnswer, questionType) => {
        if(!chosenAnswer) {
            _successSentAnswerResonse()
            return
        } //has no answer
        
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
        else if (questionType === QuestionTypes.FORMULA) {
            answerData = {
                "studentAnswer": chosenAnswer,
                "question_id": questions[currentQuestionNumber].id,
                "exam_id": exam.id
            }
        }
        else if (questionType == QuestionTypes.GROUP) {
            let questionPromises = chosenAnswer?.map(item => {
                if (!item?.answer?.chosenAnswer) return // has no answer

                let answerData = {
                    "studentAnswer": item?.answer?.chosenAnswer,
                    "question_id": item?.questionId,
                    "exam_id": exam.id
                }
                if (item?.answer?.chosenOptionID)
                    answerData["option_id"] = item?.answer?.chosenOptionID

                return ExamServices.addAnswer(answerData)
            })
            
            questionPromises = questionPromises.filter(item => Boolean(item))
            Promise.all(questionPromises)
                .then(res => {
                    _saveAnswer(null, chosenAnswer)
                    _successSentAnswerResonse()
                })
                .catch(err => HandleErrors(err))

            return
        }
        ExamServices.addAnswer(answerData)
            .then(() => {
                _saveAnswer(chosenOptionID, chosenAnswer)
                _successSentAnswerResonse()
            }).catch((err) => HandleErrors(err))
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

    const onTimerFinishHanlder = () => {
        ExamServices.submitExam(exam.id)
            .then(res => {
                showSuccessMsg("Exam has been submitted successfully")
                props.history.push({
                    pathname: '/done',
                    state: { examName: exam.name }
                })
            })
            .catch(err => HandleErrors(err))
    }

    const My_Questions_Markup = questions?.map((question, index) => {
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
                    key={question?.id}

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
        else if (question?.type === QuestionTypes.FORMULA) {
            return (
                <Formula
                    questionIndex={index + 1}
                    question={question}

                    clickedNext={clickedNextHandler}
                    clickedPrevious={clickedPreviousHandler}
                    previousButtonDisabled={currentQuestionNumber === 0}
                    changeNextNameIntoFinish={index === questions.length - 1}

                    key={question?.id}
                />
            )
        }

        else if (question?.type === QuestionTypes.GROUP) {
            return (
                <Group
                    questionIndex={index + 1}
                    question={question}

                    clickedNext={clickedNextHandler}
                    clickedPrevious={clickedPreviousHandler}
                    previousButtonDisabled={currentQuestionNumber === 0}
                    changeNextNameIntoFinish={index === questions.length - 1}

                    key={question?.id}
                />
            )
        }
        return null
    })

    const videoRecorderIsShown = examOptions?.faceDetection || examOptions?.faceRecognition
    const webcamRef = useRef(null)
    return (
        <div>
            {examDurationInSecs ?
                <div className='bg-light p-2 rounded shadow' style={{ position: 'fixed', top: 0, left: '50%', zIndex: 10, transform: 'translateX(-50%)' }}>
                    <ExamCounter onFinish={onTimerFinishHanlder} numberOfSecs={examDurationInSecs} />
                </div>
                :
                null
            }
            <div className="d-flex justify-content-center">
                {videoRecorderIsShown ?
                    <Webcam
                        audio={false}
                        height={360}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                    />
                    :
                    null
                }
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
