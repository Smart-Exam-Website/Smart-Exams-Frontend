import * as actionTypes from './actionTypes'


/**
 * 
 * @param {{ questionIndex:int, value: {chosenOptionID:string, chosenAnswer:string}}} questionData 
 * @returns 
 */
export const saveAnswer = (index, answer) => {
    return {
        type: actionTypes.SAVE_ANSWER,
        index: index,
        payload: answer
    }
}