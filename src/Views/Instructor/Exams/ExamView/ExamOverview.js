import React from 'react'
import McqAnswer from '../../../../Components/AnsweredQuestion/McqAnswer'

export const ExamOverview = ({ questions }) => {
    return (
        <>
            {questions?.map(item =>
                (item.type === 'mcq') &&
                <div className='my-2'>
                    <McqAnswer questionText={item?.questionText} choices={item?.answers} />
                </div>

            )}
        </>
    )
}