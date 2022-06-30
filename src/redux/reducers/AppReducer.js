import { actionTypes } from "../actionTypes";

const initStates = {
    errorMsg: null,
    successMsg: null,
    alertObject: null
}

const AppReducer = (state = initStates, action) => {
    switch (action.type) {
        case actionTypes.SHOW_ERROR:
            return {
                ...state,
                errorMsg: action.payload,
            };
        case actionTypes.SHOW_SUCCESS:
            return {
                ...state,
                successMsg: action.payload
            };
        case actionTypes.SHOW_ALERT:
            return {
                ...state,
                alertObject: action.payload
            };
        case actionTypes.HIDE_ALERT:
            return {
                ...state,
                alertObject: null
            };
        default:
            return state
    }
}

export { AppReducer };