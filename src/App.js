import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Login from "./Components/Registration/Login/Login";
import SignupInquiry from "./Components/Registration/Register/RegisterInquiry";
import SignupInstructor from "./Components/Registration/Register/RegisterInstructor/RegisterInstructor";
import SignupStudent from "./Components/Registration/Register/RegisterStudent/RegisterStudent";
import { setUserType, signin } from "./redux/actions/AuthActions";
import Home from './Views/Home/Home';
import InstructorProfile from "./Views/Profiles/Instructor-Profile/InstructorProfile";
import StudentProfile from "./Views/Profiles/Student-Profile/StudentProfile";
import VerifyEmail from "./Views/VerifyEmail/VerifyEmail";

function App() {

  const dispatch = useDispatch(null)

  // Bootstrap function
  useEffect(() => {
    _bootstrapFunction();
  }, [])

  const _bootstrapFunction = () => {
    let isAuth = localStorage.getItem('token');
    let userType = localStorage.getItem('userType');

    if (!isAuth) return
    if (!userType) return

    dispatch(signin(isAuth))
    dispatch(setUserType(userType))
  }

  return (
    <BrowserRouter>
      <Header />

      <div style={{minHeight:'100vh'}}>
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
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
