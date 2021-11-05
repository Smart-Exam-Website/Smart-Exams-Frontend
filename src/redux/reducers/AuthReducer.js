
const initStates = {
   userToken: null,
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

      default:
         return state
   }
}

export { AuthReducer };