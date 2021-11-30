import { STUDENT_ENDPOINTS } from "../Endpoints/StudentEndpoints";
import { Network } from "../Network";

export class StudentServices {
    // sign up
    static register(values) {
        return Network.fetch(STUDENT_ENDPOINTS.register.url, {
            body: JSON.stringify(values),
            method: STUDENT_ENDPOINTS.register.method,
        });
    }

    // get my profile
    static getMyProfile() {
        return Network.fetch(STUDENT_ENDPOINTS.getMyProfile.url, {
            method: STUDENT_ENDPOINTS.getMyProfile.method,
        }, true);
    }
}