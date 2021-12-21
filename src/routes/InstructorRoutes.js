import Classes from '../Views/Instructor/Classes/Classes'
import Exams from '../Views/Instructor/Exams/Exams'
import Questions from '../Views/Instructor/Questions/Questions'

const InstructorRoutes =
    [
        { path: '/classes', component: Classes },
        { path: '/exams', component: Exams },
        { path: '/classes', component: Questions }
    ]
export default InstructorRoutes
