const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

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




export { signin, logout }