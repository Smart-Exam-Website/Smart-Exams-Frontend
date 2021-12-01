
const initStates = {
   userToken: null,
   userType: null
}

const AuthReducer = (state = initStates, action) => {
   switch (action.type) {
      case 'SIGN_IN':
         return {
            ...state,
            userToken: action.payload,
         };
      case 'SIGN_OUT':
         return {
            ...state,
            userToken: null,
            data: {}
         };

      case 'SET_USER_TYPE':
         return {
            ...state,
            userType: action.payload,
         };
      default:
         return state
   }
}

export { AuthReducer };