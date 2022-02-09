import _axios from "../axios-instance";

export class ExamServices {
    /**
     * Create new exam with main info
     * @param {Object} examMainInfo Information about the exam.
     * @param {string} examMainInfo.name Name of the exam
     * @param {number} examMainInfo.numberOfTrials The number allowed to retake the exam
     * @param {string} examMainInfo.description
     * @param {number} examMainInfo.totalMark
     * @param {string} examMainInfo.duration hh:mm:ss
     * @param {string} examMainInfo.startAt yyyy-mm-dd hh:mm:ss
     * @param {string} examMainInfo.endAt yyyy-mm-dd hh:mm:ss
     * @param {string} examMainInfo.examSubject
     * @returns {Promise<{message, examId}>}
     */
    static createNewExam(examMainInfo) {
        return _axios.post('/exams/step1', examMainInfo);
    }


    /**
     * Set exam Options by exam id
     * @param {number} examId
     * @param {Object} options Exam options.
     * @param {boolean} options.faceRecognition
     * @param {boolean} options.questionsRandomOrder
     * @param {boolean} options.plagiarismCheck
     * @param {boolean} options.disableSwitchBrowser
     * @param {('manual'|'auto')} options.gradingMethod 
     * @returns {Promise<{message}>}
     */
    static setExamOptions(examId, options) {
        return _axios.post('/exams/step2', { examId, ...options });

    }

    /**
     * Add questions to the exam by id
     * @param {number} examId 
     * @param {Array.<{id:number}>} questions Array of objects contain question ids
     * @returns {Promise<{message}>}
     */
    static addQuestionsToExam(examId, questions) {
        return _axios.post('/exams/step2', { examId, questions });
    }

    /**
     * Add questions to the exam by id
     * @param {number} examId 
     * @param {Array.<{id:number, mark:number, duration:string}>} questions Array of objects contain question ids
     * @returns {Promise<{message}>}
     */
     static setQuestionsMarksAndDuration(examId, questions) {
        return _axios.post('/exams/step2', { examId, questions });
    }
}
