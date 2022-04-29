import { actionTypes } from "../actionTypes"
const showError = (msg) => {
    return {
        type: actionTypes.SHOW_ERROR,
        payload: msg
    }
}

const showSuccess = (msg) => {
    return {
        type: actionTypes.SHOW_SUCCESS,
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
        type: actionTypes.SHOW_ALERT,
        payload: alertObject
    }
}

const hideAlert = () => {
    return {
        type: actionTypes.HIDE_ALERT,
    }
}


export { showError, showSuccess, showAlert, hideAlert }