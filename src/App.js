import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Login from "./Components/Registration/Login/Login";
import SignupInquiry from "./Components/Registration/Register/RegisterInquiry";
import SignupInstructor from "./Components/Registration/Register/RegisterInstructor/RegisterInstructor";
import SignupStudent from "./Components/Registration/Register/RegisterStudent/RegisterStudent";
import Home from './Views/Home/Home';
import InstructorProfile from "./Views/Profiles/Instructor-Profile/InstructorProfile";
import StudentProfile from "./Views/Profiles/Student-Profile/StudentProfile";
import VerifyEmail from "./Views/VerifyEmail/VerifyEmail";

function App() {
  return (
    <BrowserRouter basename="/Smart-Exams-Frontend">
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignupInquiry} />
        <Route exact path="/verifyEmail" component={VerifyEmail} />
        <Route exact path="/register-student" component={SignupStudent} />
        <Route exact path="/register-instructor" component={SignupInstructor} />
        <Route exact path="/profile/student" component={StudentProfile} />
        <Route exact path="/profile/instructor" component={InstructorProfile} />
      </Switch>


      <Footer />
    </BrowserRouter>
  );
}

export default App;
