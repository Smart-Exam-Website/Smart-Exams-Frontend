import { CheatTypes } from "../../constants/CheatTypes";
import _axios from "../axios-instance";

export class CheatServices {

    static sentSwitchBrowserCheatAttempt(examId) {
        return _axios.post(`/cheater`, {
            examId,
            type: CheatTypes.SWITCH_BROWSER
        })
    }
    static sentFaceDetectionCheatAttempt(examId, image) {
        return _axios.post(`/cheater`, {
            examId,
            image,
            type: CheatTypes.FACE_DETECTION
        })
    }
    static sentFaceRecognationCheatAttempt(examId, image) {
        return _axios.post(`/cheater`, {
            examId,
            image,
            type: CheatTypes.FACE_RECOGNITION
        })
    }



    static getCheaters(examId) {
        return _axios.get(`/exams/${examId}/cheaters`)
    }

    static performStudentDecrement(ActionData) {
        return _axios.post(`/cheater/action`, ActionData)
    }
}