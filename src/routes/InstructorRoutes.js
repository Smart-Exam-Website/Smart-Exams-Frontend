import AddExam from '../Views/Instructor/Exams/AddExam/AddExam'
import AddExamQuestions from '../Views/Instructor/Exams/AddExamQuestions/AddExamQuestions'
import Exams from '../Views/Instructor/Exams/Exams'
import Questions from '../Views/Instructor/Questions/Questions'
import SetExamOptions from '../Views/Instructor/Exams/SetExamOptions/SetExamOptions'
import AddQuestionScreen from '../Views/Instructor/Questions/AddQuestionScreen'
import QuestionViewScreen from '../Views/Instructor/Questions/QuestionViewScreen'
import ExamView from '../Views/Instructor/Exams/ExamView'
import StudentSolvedExam from '../Views/Instructor/Exams/ExamView/StudentSolvedExam'
import AddQuestionGroup from '../Views/Instructor/Exams/AddQuestionGroup/AddQuestionGroup'

const InstructorRoutes =
    [
        { path: '/exams', component: Exams, exact: true },
        
        { path: '/exams/add', component: AddExam, exact: true },
        { path: '/exams/edit', component: AddExam, exact: true },
        { path: '/exams/:examId/set-options', component: SetExamOptions, exact: true },
        { path: '/exams/:examId/add-questions', component: AddExamQuestions, exact: true },
        
        { path: '/questions', component: Questions, exact: true },
        { path: '/questions/add', component: AddQuestionScreen, exact: true },
        { path: '/questions/add-group', component: AddQuestionGroup, exact: true },
        { path: '/questions/edit', component: AddQuestionScreen, exact: true },
        { path: '/questions/:questionId', component: QuestionViewScreen, exact: true },

        { path: '/exams/:examId', component: ExamView, exact: true },
        { path: '/exams/:examId/:studentId', component: StudentSolvedExam, exact: true },
    ]
export default InstructorRoutes
