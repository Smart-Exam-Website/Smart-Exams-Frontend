import AddExam from '../Views/Instructor/AddExam/AddExam'
import Classes from '../Views/Instructor/Classes/Classes'
import Exams from '../Views/Instructor/Exams/Exams'
import Questions from '../Views/Instructor/Questions/Questions'

const InstructorRoutes =
    [
        { path: '/classes', component: Classes, exact: true },
        { path: '/exams', component: Exams, exact: true },
        { path: '/exams/add', component: AddExam, exact: true },
        { path: '/classes', component: Questions, exact: true},
    ]
export default InstructorRoutes
