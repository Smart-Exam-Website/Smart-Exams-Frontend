import React from 'react'
import './Header.css'
import Logo from '../../assets/images/logo.png'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/AuthActions';


const Header = () => {
    const isAuth = useSelector(state => state.auth.userToken)
    const userType = useSelector(state => state.auth.userType)
    const history = useHistory()

    const dispatch = useDispatch(null)
    const logoutHandler = () => {
        dispatch(logout())
        localStorage.clear()
        history.push('/login')
    }

    const isInstructor = userType === 'instructor'
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img height={66} src={Logo} alt="smart exam logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto mainNav">
                        {!isAuth ?
                            <>
                                <NavLink className="nav-link p-0" activeclassname={'active'} to="/" exact>
                                    <li className="nav-item px-5 mx-2">
                                        <span>Home</span>
                                    </li>
                                </NavLink>

                                <NavLink className="nav-link p-0" activeclassname={'active'} to="/" exact>
                                    <li className="nav-item px-5 mx-2">
                                        <span>Features</span>
                                    </li>
                                </NavLink>
                                <NavLink className="nav-link p-0" activeclassname={'active'} to="/" exact>
                                    <li className="nav-item px-5 mx-2">
                                        <span>Pricing</span>
                                    </li>
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink className="nav-link p-0" activeclassname={'active'} to="/classes">
                                    <li className="nav-item px-5 mx-2">
                                        <span>Home</span>
                                    </li>
                                </NavLink>
                                <NavLink className="nav-link p-0" activeclassname={'active'} to="/exams">
                                    <li className="nav-item px-5 mx-2">
                                        <span>Exams</span>
                                    </li>
                                </NavLink>
                                <NavLink className="nav-link p-0" activeclassname={'active'} to={isInstructor ? "/questions" : "/my-results"}>
                                    <li className="nav-item px-5 mx-2">
                                        <span>{isInstructor ? 'Questions' : 'My Results'}</span>
                                    </li>
                                </NavLink>
                            </>
                        }

                    </ul>

                    <ul className="navbar-nav d-flex justify-content-lg-center justify-content-between flex-row">
                        {!isAuth ?
                            <>
                                <li className="nav-item mx-2 d-flex align-items-center">
                                    <Link className="loginText" to={'/login'}>Login</Link>
                                </li>

                                <li className="nav-item mx-2">
                                    <Link className="btn btn-primary" to="/register">Register</Link>
                                </li>
                            </>
                            :
                            <>
                                {/* Logout */}
                                <li onClick={logoutHandler} className="nav-item mx-2">
                                    <LogoutOutlined className="primaryColoredIcon" />
                                </li>

                                {/* Profile */}
                                <li className="nav-item mx-2">
                                    <Link to={`/profile/${userType}`}>
                                        <UserOutlined className="primaryColoredIcon" />
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
