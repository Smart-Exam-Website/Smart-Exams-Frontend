import React, { useEffect, useState } from 'react'
import styles from './ExamCounter.module.css'

const _withLeadingZero = (number) => {
    return number < 10 ? `0${number}` : number
}
const ExamCounter = ({ numberOfMins = 1, onFinish = () => { } }) => {
    const [remainingSeconds, setremainingSeconds] = useState(numberOfMins * 60)
    const hours = Math.floor(remainingSeconds / (60 * 60))
    const mins = Math.floor(remainingSeconds / (60))

    useEffect(() => {
        if(!numberOfMins) return
        let numberOfSeconds = remainingSeconds
        let timer = setInterval(() => {
            if (numberOfSeconds <= 0) {
                clearInterval(timer)
                onFinish()
                return
            }
            setremainingSeconds(prevState => prevState - 1)
            numberOfSeconds--
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, [numberOfMins])

    return (
        <div className='m-4'>
            <h1 className={styles.primaryText}>{`${_withLeadingZero(hours)}:${_withLeadingZero(mins%60)}:${_withLeadingZero(remainingSeconds % 60)}`}</h1>
        </div>
    )
}

export default ExamCounter