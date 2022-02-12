import Home from '../Views/Home/Home'
import ShowExams from '../Views/Student/ShowExams/ShowExams'
import ExamInstructions from '../Views/Student/ExamInstructions/ExamInstructions'
import TakeExam from '../Views/Student/TakeExam/TakeExam'
const MainRoutes =
    [
        // adding a testing url
        { path: "/take-exam", component: TakeExam, exact: true },
        { path: "/exam-instructions", component: ExamInstructions, exact: true },
        { path: "/test", component: ShowExams, exact: true },
        { path: "/", component: Home, exact: true },
    ]



export default MainRoutes
