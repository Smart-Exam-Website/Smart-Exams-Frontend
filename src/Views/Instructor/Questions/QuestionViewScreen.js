import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuestionServices } from '../../../apis/Services/QuestionService';
import McqAnswer from '../../../Components/AnsweredQuestion/McqAnswer';
import HandleErrors from '../../../hooks/handleErrors';

const QuestionViewScreen = () => {
    const { questionId } = useParams()

    const [question, setQuestion] = useState(null)
    useEffect(() => {
        QuestionServices.getQuestionDetails(questionId)
            .then(res => {
                console.log(res?.question)
                setQuestion(res?.question)
            })
            .catch(err => HandleErrors(err))
    }, [questionId])

    return <div className="row justify-content-center my-5">
        <div className="col-md-8 col-12">
            {question?.mcq &&
                <McqAnswer questionText={question?.questionText} choices={question?.mcq?.mcq_answers} />
            }
        </div>
    </div>
};

export default QuestionViewScreen;
