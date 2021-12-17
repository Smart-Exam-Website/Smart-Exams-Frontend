const SHOW_ERROR = 'SHOW_ERROR'
const SHOW_SUCCESS = 'SHOW_SUCCESS'

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


export { showError, showSuccess }