
const initStates = {
    errorMsg: null,
    successMsg: null
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
        default:
            return state
    }
}

export { AppReducer };