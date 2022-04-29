import {actionTypes} from "../actionTypes"

const initialState = {
    email: 'LOL'

}
const ResetReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_EMAIL:
            // console.log("this from reducer")
            // console.log(action.email)
            return {
                ...state,
                email: action.email
            }
        default:
            break;
    }

    return state;
}
export default ResetReducer;