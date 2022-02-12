const SHOW_ERROR = 'SHOW_ERROR'
const SHOW_SUCCESS = 'SHOW_SUCCESS'
const SHOW_ALERT = "SHOW_ALERT"
const HIDE_ALERT = "HIDE_ALERT"

const showError = (msg) => {
    return {
        type: SHOW_ERROR,
        payload: msg
    }
}

const showSuccess = (msg) => {
    return {
        type: SHOW_SUCCESS,
        payload: msg
    }
}
/**
 * 
 * @param {{header:string, details:string, alertFunction:Function}} alertObject 
 * @returns 
 */
const showAlert = (alertObject) => {
    return {
        type: SHOW_ALERT,
        payload: alertObject
    }
}

const hideAlert = () => {
    return {
        type: HIDE_ALERT,
    }
}


export { showError, showSuccess, showAlert, hideAlert }