import { AUTHENDPOINTS } from "../Endpoints/AuthEndpoints";
import { Network } from "../Network";

export class AuthServices {
  // sign in
  static login(values) {
    return Network.fetch(AUTHENDPOINTS.login.url, {
      body: JSON.stringify(values),
      method: AUTHENDPOINTS.login.method,
    });
  }
  
  // verifying mobile phone by sending  code , phone
  static emailVerifySms(values) {
    return Network.fetch(AUTHENDPOINTS.verifyEmail.url, {
      body: JSON.stringify(values),
      method: AUTHENDPOINTS.verifyEmail.method,
    });
  }

  // change password
  static changePassword(values) {
    return Network.fetch(
      AUTHENDPOINTS.changePassword.url,
      {
        body: JSON.stringify(values),
        method: AUTHENDPOINTS.changePassword.method,
      },
      true
    );
  }
  
  // logout
  static logout() {
    return Network.fetch(
      AUTHENDPOINTS.logout.url,
      {
        method: AUTHENDPOINTS.logout.method,
      },
      true
    );
  }

  // reset forgotten  Password
  static resetForgottenPassword(values) {
    return Network.fetch(AUTHENDPOINTS.ResetPassword.url, {
      body: JSON.stringify(values),
      method: AUTHENDPOINTS.ResetPassword.method,
    });
  }
}
