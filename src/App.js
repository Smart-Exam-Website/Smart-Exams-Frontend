import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { setUserType, signin } from "./redux/actions/AuthActions";
import Toast from './Components/Toast'
import Routes from "./routes";

function App() {

  const dispatch = useDispatch()

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
        <Routes />
      </div>

      <Toast />
      <Footer />
    </BrowserRouter>
  );
}

export default App;




