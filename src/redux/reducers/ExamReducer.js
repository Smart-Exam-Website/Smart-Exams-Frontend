const initStates = {
    examQuestions: []
}

const ExamReducer = (state = initStates, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            return {
                ...state,
                examQuestions: [...state.examQuestions, ...action.payload],
            };
        case 'REMOVE_QUESTION': {
            let newExamQuestions = state?.examQuestions
            let newExamQuestion = newExamQuestions.filter(item => {
                return item.id !== action.payload
            })
            return {
                ...state,
                examQuestions: [...newExamQuestion],
            };
        }
        case 'REMOVE_ALL':
            return {
                ...state,
                examQuestions: []
            }
        default:
            return state
    }
}
export default ExamReducer;