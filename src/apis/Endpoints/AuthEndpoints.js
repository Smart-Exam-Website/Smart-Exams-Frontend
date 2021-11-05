import DomainUrl from "../Domain";

export const AUTHENDPOINTS = {
   login: {
      url: `${DomainUrl}/auth/login/`,
      method: 'POST',
   },
   verifyEmail:{
      url:`${DomainUrl}/auth/verifyEmail`,
      method : 'POST'
   },
   changePassword:{
      url:`${DomainUrl}/auth/changePassword`,
      method : 'PUT'
   },
   logout:{
      url:`${DomainUrl}/auth/logout`,
      method : 'POST'
   },
   ResetPassword:{  
      url:`${DomainUrl}/auth/forgotPassword`,
      method:'PUT'
   }
};

