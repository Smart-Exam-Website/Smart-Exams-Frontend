import { actionTypes } from "../actionTypes";

const initStates = {
    examQuestions: [],
    examGroups: []
}

const ExamReducer = (state = initStates, action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION:
            return {
                ...state,
                examQuestions: [...state.examQuestions, ...action.payload],
            };

        case actionTypes.ADD_GROUP:
            {
                let addedGroupQuestions = action.payload?.length ? [...action.payload] : [action.payload]
                let newGroup = [...state.examGroups, ...addedGroupQuestions]
                return {
                    ...state,
                    examGroups: newGroup,
                };
            }

        case actionTypes.ADD_GROUP_QUESTION:
            {
                let newGroupQuestions = [...state.examGroups]
                newGroupQuestions.forEach(group => {
                    if (group.id === action.groupId) {
                        group['questions'] = [...group['questions'], ...action.payload]
                    }
                })

                return {
                    ...state,
                    examGroups: newGroupQuestions,
                };
            }

        case actionTypes.REMOVE_QUESTION:
            {
                let newExamQuestions = state?.examQuestions
                newExamQuestions = newExamQuestions.filter(item => {
                    return item.id !== action.payload
                })

                let newExamGroupQuestions = state?.examGroups
                newExamGroupQuestions = newExamGroupQuestions.filter(item => {
                    return item.id !== action.payload
                })
                return {
                    ...state,
                    examQuestions: [...newExamQuestions],
                    examGroups: [...newExamGroupQuestions]
                };
            }

        case actionTypes.REMOVE_ALL:
            return {
                ...state,
                examQuestions: [],
                examGroups: []
            }

        default:
            return state
    }
}
export default ExamReducer;