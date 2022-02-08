import AddExam from '../Views/Instructor/Exams/AddExam/AddExam'
import AddExamQuestions from '../Views/Instructor/Exams/AddExamQuestions/AddExamQuestions'
import Classes from '../Views/Instructor/Classes/Classes'
import Exams from '../Views/Instructor/Exams/Exams'
import Questions from '../Views/Instructor/Questions/Questions'
import SetExamOptions from '../Views/Instructor/Exams/SetExamOptions/SetExamOptions'

const InstructorRoutes =
    [
        { path: '/classes', component: Classes, exact: true },
        { path: '/exams', component: Exams, exact: true },
        { path: '/exams/add', component: AddExam, exact: true },
        { path: '/exams/:examId/set-options', component: SetExamOptions, exact: true },
        { path: '/exams/:examId/add-questions', component: AddExamQuestions, exact: true },

        { path: '/classes', component: Questions, exact: true},
    ]
export default InstructorRoutes
