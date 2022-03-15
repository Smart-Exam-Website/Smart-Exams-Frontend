import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuestionServices } from '../../../apis/Services/QuestionService';
import McqAnswer from '../../../Components/AnsweredQuestion/McqAnswer';
import EssayAnswer from '../../../Components/AnsweredQuestion/EssayAnswer';
import HandleErrors from '../../../hooks/handleErrors';

const QuestionViewScreen = () => {
    const { questionId } = useParams()

    const [question, setQuestion] = useState(null)
    useEffect(() => {
        QuestionServices.getQuestionDetails(questionId)
            .then(res => {
                console.log(res?.question)
                // console.log(res?.question)
                setQuestion(res?.question)
            })
            .catch(err => HandleErrors(err))
    }, [questionId])

    let QuestionMarkup = () => {
        if (question?.type === "essay") {

            return (
                <EssayAnswer questionText={question?.questionText} correctAnswer={question?.question_option[0].option} />
            )
        }
        else if (question?.type === "mcq") {
            console.log("ana 3mad y3m")
            return (question?.mcq &&
                <McqAnswer questionText={question?.questionText} choices={question?.mcq.mcq_answers} />
            )
        }

    }
    return <div className="row justify-content-center my-5">
        <div className="col-md-8 col-12">

            {QuestionMarkup()}

            {/* {question?.mcq &&
                <McqAnswer questionText={question?.questionText} choices={question?.mcq.mcq_answers} />
            } */}
        </div>
    </div>
};

export default QuestionViewScreen;
