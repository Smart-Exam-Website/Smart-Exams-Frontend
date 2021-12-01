const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
const SET_USER_TYPE = "SET_USER_TYPE"
const signin = (setUserToken) => {
   return {
      type: SIGN_IN,
      payload: setUserToken
   }
}

const logout = () => {
   return {
      type: SIGN_OUT,
      payload: null
   }
}

const setUserType = (type)=>{
   return {
      type: SET_USER_TYPE,
      payload: type
   }
}




export { signin, logout, setUserType }