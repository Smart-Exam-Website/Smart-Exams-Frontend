import _axios from "../axios-instance";
import { QuestionTypes } from '../../constants/QuestionTypes'
import { string } from "yup";
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
        return _axios.post('/questions/create', { type: QuestionTypes.MCQ, ...question });
    }

    static createEssayQuestion(question) {
        return _axios.post('/questions/create', { type: QuestionTypes.ESSAY, ...question });
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
     * @param {Object} params
     * @param {string} params.tag
     * @param {Boolean} params.myQuestions
     * @param {string} params.search
     * @param {string} params.type
     * 
     * @returns {Promise<Array>}
     */
    static getMyQuestions(params) {
        return _axios.get('/questions', { params: params });
    }

    // Formula Question Endpoints
    /**
     * Create Formula Question
     * @param {Object} question Information about the question.
     * @param {string} question.questionText Question header
     * @param {string} question.formula
     * @param {Array<Array<any>>} question.variables [[var name, min val, max val]] ex: [ ['x',30,40] ]
     * @param {Array<Array<any>>} question.formulas [[questionHeader, finalAnswer]] ex: [ ['1+23=??', 8] ]
     * @returns {Promise<any>}
     */
    static createFormulaQuestion(question) {
        return _axios.post('/questions/formula/create', { type: QuestionTypes.FORMULA, ...question });
    }

    /**
     * Edit Formula Question
     * @param {*} id Question id
     * @param {Object} question Information about the question.
     * @param {string} question.questionText Question header
     * @param {string} question.formula
     * @param {Array<Array<any>>} question.variables [[var name, min val, max val]] ex: [ ['x',30,40] ]
     * @param {Array<Array<any>>} question.formulas [[questionHeader, finalAnswer]] ex: [ ['1+23=??', 8] ]
     * @returns {Promise<any>}
     */
    static editFormulaQuestion(id, question) {
        return _axios.put(`/questions/formula/${id}`, { type: QuestionTypes.FORMULA, ...question });

    }


    // Grouping Question Endpoints
    /**
     * Create Group Question
     * @param {Object} question Information about the question.
     * @param {string} question.questionText Question header
     * @param {Array<number>} question.questions Array of question ids
     * @returns {Promise<any>}
     */
    static createGroupQuestion(question) {
        return _axios.post('/questions/question-group/create', { type: QuestionTypes.GROUP, ...question });
    }

    /**
     * Edit Group Question
     * @param {*} id Question id
     * @param {Object} question Information about the question.
     * @param {string} question.questionText Question header
     * @param {Array<number>} question.questions Array of question ids
     * @returns {Promise<any>}
     */
    static editGroupQuestion(id, question) {
        return _axios.post(`/questions/question-group/${id}`, { type: QuestionTypes.GROUP, ...question });
    }


}
