import ExamInstructions from "../Views/Student/ExamInstructions/ExamInstructions"
import MyResults from "../Views/Student/MyResults"
import ShowExams from "../Views/Student/ShowExams/ShowExams"
import TakeExam from "../Views/Student/TakeExam/TakeExam"
import WellDone from "../Views/Student/WellDone/WellDone"

const StudentRoutes =
    [
        { path: '/exams', component: ShowExams, exact: true },
        { path: "/exams/:examId", component: ExamInstructions, exact: true },
        { path: "/exams/:examId/start", component: TakeExam, exact: true },
        { path: "/done", component: WellDone, exact: true },
        { path: "/my-results", component: MyResults, exact: true }
    ]
export default StudentRoutes
