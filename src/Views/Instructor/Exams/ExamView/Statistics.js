import React, { useState } from 'react'
import Loader from '../../../../Components/Loader/Loader'

const Statistics = ({ examId }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const fullSizeStyle = { style: { height: '80vh' }, className: 'w-100' }
    return (
        <div>
            {!isLoaded ?
                <div {...fullSizeStyle}>
                    <div className='d-flex justify-content-center'>
                        <Loader />
                    </div>
                </div>
                :
                null
            }
            <iframe
                onLoad={() => setIsLoaded(true)}
                {...fullSizeStyle}
                src={`https://api.smart-exam.ml/statistics/${examId}`}
            />
        </div>

    )
}

export default Statistics