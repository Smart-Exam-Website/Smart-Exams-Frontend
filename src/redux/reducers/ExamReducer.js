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
                console.log("Exam Groups: ", state.examGroups)
                console.log("New Group: ", action.payload)
                 
                let newGroup = [...state.examGroups]
                newGroup.push(action.payload)
                console.log(newGroup)
                return {
                    ...state,
                    examGroups: newGroup,
                };
            }
        case actionTypes.ADD_GROUP_QUESTION:
            {   
                console.log("action: ", action)
                console.log("Exam Groups: ", state?.examGroups)
                console.log("Question data from Reducer: ", action.payload)

                let newGroupQuestions = [...state.examGroups]
                console.log("Before: ", newGroupQuestions)

                // let currentGroup = newGroupQuestions.find(group => group.name === action.groupName)
                // currentGroup['questions'] = [...currentGroup['questions'], ...action.payload]

                newGroupQuestions.forEach(group => {
                    if (group.id === action.groupId) {
                        group['questions'] = [...group['questions'], ...action.payload]
                    }
                })

                console.log("After: ", newGroupQuestions)

                return {
                    ...state,
                    examGroups: newGroupQuestions,
                };
            }

        case actionTypes.REMOVE_QUESTION:
            {
                let newExamQuestions = state?.examQuestions
                let newExamQuestion = newExamQuestions.filter(item => {
                    return item.id !== action.payload
                })
                return {
                    ...state,
                    examQuestions: [...newExamQuestion],
                };
            }


        case actionTypes.REMOVE_ALL:
            return {
                ...state,
                examQuestions: []
            }



        default:
            return state
    }
}
console.log("initStates.examGroups", initStates.examGroups)
export default ExamReducer;