import { INSTRUCTOR_ENDPOINTS } from "../Endpoints/InstructorEndpoints";
import { Network } from "../Network";

export class StudentServices {
    // sign up
    static register(values) {
        return Network.fetch(INSTRUCTOR_ENDPOINTS.register.url, {
            body: JSON.stringify(values),
            method: INSTRUCTOR_ENDPOINTS.register.method,
        });
    }
}