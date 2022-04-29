import { actionTypes } from "../actionTypes"

/**
 * 
 * @param {Array.<{questionText:string, id:string}>} questionData 
 * @returns 
 */
export const saveAQuestion = (questionData, groupName='') => {

    console.log("Question data from Action: ", questionData)
    if (groupName) {
        // then the questtion belongs to a group
        return {

            type: actionTypes.ADD_GROUP_QUESTION,
            payload: questionData,
            groupName: groupName

        }
    }
    else
        return {
            type: actionTypes.ADD_QUESTION,
            payload: questionData
        }
}

/**
 * 
 * @param {{id:string}} param0 
 * @returns 
 */
export const addNewGroup = (group) => {
    return {
        type: actionTypes.ADD_GROUP,
        payload: group
    }
}
export const removeSavedQuestionFromExam = (id) => {
    return {
        type: actionTypes.REMOVE_QUESTION,
        payload: id
    }
}

export const removeAllSavedQuestions = () => {
    return {
        type: actionTypes.REMOVE_ALL,
        payload: null
    }
}






// export { saveAQuestion, removeSavedQuestionFromExam, removeAllSavedQuestions }