import { PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

const Questions = () => {
    const history = useHistory();
    const goToAddQuestionPageHandler = () => {
        history.push(`${history.location.pathname}/add`)
    }
    return (
        <div className='container'>
            <div className='d-flex mt-4 justify-content-end'>
                <button onClick={goToAddQuestionPageHandler} className='btn btn-success'>
                    <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff' }} />
                </button>
            </div>
        </div>
    )
}

export default Questions
