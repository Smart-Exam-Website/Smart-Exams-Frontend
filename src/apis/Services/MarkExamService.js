import _axios from "../axios-instance";

export class MarkExamServices {
    static getAllStudentsAnswers(examId) {
        return _axios.get(`exams/${examId}/all-answers`)
    }

    static getSpecificStudentAnswers(examId, studentId) {
        return _axios.get(`exams/${examId}/all-answers/answer`, {
            params: {
                student_id: studentId
            }
        })
    }

    static manualMark({ studentId, examId, questionId, questionMark }) {
        return _axios.post(`exams/manual`, { studentId, examId, questionId, questionMark })
    }

    static markAllAutomatic(examId) {
        return _axios.post(`exams/mark/${examId}`)
    }

    static markSpecificStudentAutomatic(examId, studentId) {
        return _axios.post(`exams/mark/${examId}/${studentId}`)
    }

    static getPlagiarismResults(examId) {
        return _axios.post(`/plagiarism`, { examId })
    }
}
