const ADD_QUESTION = 'ADD_QUESTION'
const REMOVE_QUESTION = 'REMOVE_QUESTION'
const REMOVE_ALL = 'REMOVE_ALL'

/**
 * 
 * @param {Array.<{questionText:string, id:string}>} questionData 
 * @returns 
 */
const saveAQuestion = (questionData) => {
    return {
        type: ADD_QUESTION,
        payload: questionData
    }
}
/**
 * 
 * @param {{id:string}} param0 
 * @returns 
 */
const removeSavedQuestionFromExam = (id) => {
    return {
        type: REMOVE_QUESTION,
        payload: id
    }
}

const removeAllSavedQuestions = () => {
    return {
        type: REMOVE_ALL,
        payload: null
    }
}






export { saveAQuestion, removeSavedQuestionFromExam, removeAllSavedQuestions }