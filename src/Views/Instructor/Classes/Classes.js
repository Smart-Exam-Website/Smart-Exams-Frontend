import React, { useEffect } from 'react'
import useListShuffler from '../../../hooks/useListShuffler'
import useSwitchBrowserDetector from '../../../hooks/useSwitchBrowserDetector'

const Classes = () => {
    const shuffler = useListShuffler()
    useEffect(() => {
        let list = [1, 2, 3, 4, 5, 6, 7]
        let rr = shuffler(list)
        console.log(rr)
    }, [])

    const isBrowserHidden = useSwitchBrowserDetector()
    useEffect(() => {
      isBrowserHidden && console.log("CHEATER!!!!")
    
    }, [isBrowserHidden])
    
    return (
        <div>
            <h1>Classes</h1>
        </div>
    )
}

export default Classes
