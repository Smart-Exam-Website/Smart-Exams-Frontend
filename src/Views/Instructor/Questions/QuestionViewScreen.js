import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuestionServices } from '../../../apis/Services/QuestionService';
import McqAnswer from '../../../Components/AnsweredQuestion/McqAnswer';
import EssayAnswer from '../../../Components/AnsweredQuestion/EssayAnswer';
import HandleErrors from '../../../hooks/handleErrors';
import { QuestionTypes } from '../../../constants/QuestionTypes';
import FormulaAnswer from '../../../Components/AnsweredQuestion/FormulaAnswer';

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
        if (question?.type === QuestionTypes.ESSAY) {
            return (
                <EssayAnswer questionText={question?.questionText} correctAnswer={question?.options[0]} />
            )
        }
        else if (question?.type === QuestionTypes.MCQ) {
            return (
                <McqAnswer questionText={question?.questionText} choices={question?.options} />
            )
        }
        else if (question?.type === QuestionTypes.FORMULA) {
            return (
                <FormulaAnswer formula_questions={question?.formula_questions} />
            )
        }

    }
    return <div className="row justify-content-center my-5">
        <div className="col-md-8 col-12">
            {QuestionMarkup()}
        </div>
    </div>
};

export default QuestionViewScreen;
