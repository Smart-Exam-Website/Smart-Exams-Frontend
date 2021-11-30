import { INSTRUCTOR_ENDPOINTS } from "../Endpoints/InstructorEndpoints";
import { Network } from "../Network";

export class InstructorServices {
    // sign up
    static register(values) {
        return Network.fetch(INSTRUCTOR_ENDPOINTS.register.url, {
            body: JSON.stringify(values),
            method: INSTRUCTOR_ENDPOINTS.register.method,
        });
    }

    // get my profile
    static getMyProfile() {
        return Network.fetch(INSTRUCTOR_ENDPOINTS.getMyProfile.url, {
            method: INSTRUCTOR_ENDPOINTS.getMyProfile.method,
        }, true);
    }
}