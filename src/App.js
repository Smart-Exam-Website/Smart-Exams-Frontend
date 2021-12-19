import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import ForgotPassword from "./Views/Registration/ForgotPassword/forgotPassword";
import Login from "./Views/Registration/Login/Login";
import SignupInquiry from "./Views/Registration/Register/RegisterInquiry";
import SignupInstructor from "./Views/Registration/Register/RegisterInstructor/RegisterInstructor";
import SignupStudent from "./Views/Registration/Register/RegisterStudent/RegisterStudent";
import ResetPassword from "./Views/Registration/ResetPassword/ResetPassword";
import { setUserType, signin } from "./redux/actions/AuthActions";
import Home from './Views/Home/Home';
import InstructorProfile from "./Views/Profiles/Instructor-Profile/InstructorProfile";
import StudentProfile from "./Views/Profiles/Student-Profile/StudentProfile";
import VerifyEmail from "./Views/VerifyEmail/VerifyEmail";
import Toast from './Components/Toast'

function App() {

  const dispatch = useDispatch(null)

  const _bootstrapFunction = useCallback(() => {
    let isAuth = localStorage.getItem('token');
    let userType = localStorage.getItem('userType');

    if (!isAuth) return
    if (!userType) return

    dispatch(signin(isAuth))
    dispatch(setUserType(userType))
  }, [dispatch])

  // Bootstrap function
  useEffect(() => {
    _bootstrapFunction();
  }, [_bootstrapFunction])

  return (
    <BrowserRouter>
      <Header />

      <div style={{ minHeight: '100vh' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/register" component={SignupInquiry} />
          <Route exact path="/verifyEmail" component={VerifyEmail} />
          <Route exact path="/register-student" component={SignupStudent} />
          <Route exact path="/register-instructor" component={SignupInstructor} />
          <Route exact path="/profile/student" component={StudentProfile} />
          <Route exact path="/profile/instructor" component={InstructorProfile} />
        </Switch>
      </div>

      <Toast />
      <Footer />
    </BrowserRouter>
  );
}

export default App;




