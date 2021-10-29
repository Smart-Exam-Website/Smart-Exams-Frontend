import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Views/Home/Home';
import InstructorProfile from "./Views/Profiles/Instructor-Profile/InstructorProfile";
import StudentProfile from "./Views/Profiles/Student-Profile/StudentProfile";

function App() {
  return (
    <BrowserRouter >
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile/student" component={StudentProfile} />
        <Route exact path="/profile/Instructor" component={InstructorProfile} />
      </Switch>

      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
