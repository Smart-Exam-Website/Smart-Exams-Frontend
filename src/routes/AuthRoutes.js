import forgotPassword from '../Views/Registration/ForgotPassword/forgotPassword'
import Login from '../Views/Registration/Login/Login'
import RegisterInquiry from '../Views/Registration/Register/RegisterInquiry'
import RegisterInstructor from '../Views/Registration/Register/RegisterInstructor/RegisterInstructor'
import RegisterStudent from '../Views/Registration/Register/RegisterStudent/RegisterStudent'
import ResetPassword from '../Views/Registration/ResetPassword/ResetPassword'
import VerifyEmail from '../Views/VerifyEmail/VerifyEmail'

const AuthRoutes =
    [
        { path: "/login", component: Login, exact: true },
        { path: "/forgot-password", component: forgotPassword, exact: true },
        { path: "/reset-password/:token", component: ResetPassword, exact: true },
        { path: "/register", component: RegisterInquiry, exact: true },
        { path: "/verifyEmail", component: VerifyEmail, exact: true },
        { path: "/register-student", component: RegisterStudent, exact: true },
        { path: "/register-instructor", component: RegisterInstructor, exact: true },
       
    ]

export default AuthRoutes
