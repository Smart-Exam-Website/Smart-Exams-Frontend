import * as actionTypes from "../actions/actionTypes"

const addEmail = (email) => {
    return {
        type: actionTypes.ADD_EMAIL,
        email: email
    }

}

export {addEmail}