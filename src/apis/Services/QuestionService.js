import _axios from "../axios-instance";

export class QuestionServices {
    /**
     * Create new question
     * @param {Object} question Information about the question.
     * @param {string} question.questionText Question header
     * @param {string} question.mark
     * @param {Array<string>} question.answers All the possible answers
     * @param {string} question.correctAnswer Correct answer
     * @returns {Promise<any>}
     */
    static createMcqQuestion(question) {
        return _axios.post('/questions/create', { type: 'mcq', ...question });
    }

    static createEssayQuestion(question) {
        return _axios.post('/questions/create', { type: 'essay', ...question });
    }

    /**
     * 
     * @param {*} id Question id
     * @returns 
     */
    static getQuestionDetails(id) {
        return _axios.get(`/questions/${id}`);
    }

    /**
     * Edit any type of question
     * @param {*} id question id
     * @param {*} question Question as it returned from server
     * @returns 
     */
    static editQuestion(id, question) {
        return _axios.put(`/questions/${id}`, { ...question });
    }

    /**
     * Delete any type of question
     * @param {*} id question id
     * @returns 
     */
    static deleteQuestion(id) {
        return _axios.delete(`/questions/${id}`);
    }

    /**
     * Get All My Exams
     * @returns {Promise<Array>}
     */
    static getMyQuestions() {
        return _axios.get('/questions');
    }

}
