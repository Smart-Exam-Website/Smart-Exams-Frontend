import { useEffect, useState } from "react"

const useSwitchBrowserDetector = () => {
    const [isBrowserHidden, setIsBrowserHidden] = useState(null)
    useEffect(() => {
        window.addEventListener('blur', () => {
            setIsBrowserHidden(true)
        })
        window.addEventListener('focus', () => {
            setIsBrowserHidden(false)
        })
        return () => {
            console.log("hiiiiiiiiiiiiiiii")
            window.removeEventListener('blur', () => { })
            window.removeEventListener('focus', () => { })
        }
    }, [])

    return isBrowserHidden
}

export default useSwitchBrowserDetector
