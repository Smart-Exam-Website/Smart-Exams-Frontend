import Home from "../Views/Home/Home"
import InstructorProfile from "../Views/Profiles/Instructor-Profile/InstructorProfile"
import StudentProfile from "../Views/Profiles/Student-Profile/StudentProfile"
const UserRoutes =
    [
        { path: '/home', component: Home, exact: true },
        { path: "/profile/student", component: StudentProfile, exact: true },
        { path: "/profile/instructor", component: InstructorProfile, exact: true }
    ]
export default UserRoutes
