import React from 'react';
import { useParams } from 'react-router-dom';

const QuestionViewScreen = () => {
    const { questionId } = useParams()
    return <div>
        <h1>question # {questionId}</h1>
    </div>;
};

export default QuestionViewScreen;
