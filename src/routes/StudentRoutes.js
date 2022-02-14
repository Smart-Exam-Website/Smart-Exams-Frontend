import ExamInstructions from "../Views/Student/ExamInstructions/ExamInstructions"
import ShowExams from "../Views/Student/ShowExams/ShowExams"
import TakeExam from "../Views/Student/TakeExam/TakeExam"

const StudentRoutes =
    [
        { path: '/exams', component: ShowExams, exact: true },
        { path: "/exams/instructions/:examId", component: ExamInstructions, exact: true },
        { path: "/exams/:examId", component: TakeExam, exact: true },

    ]
export default StudentRoutes
