import { CheatTypes } from "../../constants/CheatTypes";
import _axios from "../axios-instance";

export class CheatServices {

    static sentSwitchBrowserCheatAttempt(examId) {
        return _axios.post(`/exams/${examId}/report`, {
            examId,
            type: CheatTypes.SWITCH_BROWSER
        })
    }
    static sentFaceDetectionCheatAttempt(examId, image) {
        return _axios.post(`/exams/${examId}/report`, {
            examId,
            image,
            type: CheatTypes.FACE_DETECTION
        })
    }
    static sentFaceRecognationCheatAttempt(examId, image) {
        return _axios.post(`/exams/${examId}/report`, {
            examId,
            image,
            type: CheatTypes.FACE_RECOGNATION
        })
    }
}