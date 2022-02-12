import React from 'react';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import MCQ from '../Questions/MCQ/MCQ';
const TakeExam = (props) => {
    const MCQ_Data = {
        'text': 'El Donya feha kam bleatsho...???',
        'correct': "Zamaaan",
        'wrong': [1 ,6 ,8]
    }
    return (
        <div>
            <div className="row justify-content-center text-center my-5">
                <div className="col-md-8 col-12">
                    <CardComponent title={'Exam 1'}>
                        <MCQ 
                        questionText={MCQ_Data['text']}
                        correctOption={MCQ_Data['correct']} 
                        wrongOptions={MCQ_Data['wrong']} 
                        >




                        </MCQ>
                    </CardComponent>
                </div>
            </div>
        </div>
    );
}

export default withRouter(TakeExam);
