const initStates = {
    errorMsg: null,
    successMsg: null,
    alertObject: null
}

const AppReducer = (state = initStates, action) => {
    switch (action.type) {
        case 'SHOW_ERROR':
            console.log(action.payload)
            return {
                ...state,
                errorMsg: action.payload,
            };
        case 'SHOW_SUCCESS':
            return {
                ...state,
                successMsg: action.payload
            };
        case 'SHOW_ALERT':
            return {
                ...state,
                alertObject: action.payload
            };
        case 'HIDE_ALERT':
            return {
                ...state,
                alertObject: null
            };
        default:
            return state
    }
}

export { AppReducer };