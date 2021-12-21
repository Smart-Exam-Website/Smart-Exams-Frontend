import React from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom";

const Exams = () => {
    const history = useHistory();

    const goToAddQuestionPageHandler = () => {
        console.log(history)
        history.push('/exams/add')
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

export default Exams
