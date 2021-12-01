import React from 'react'
import './Header.css'
import Logo from '../../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/AuthActions';


const Header = () => {
    const isAuth = useSelector(state => state.auth.userToken)
    const dispatch = useDispatch(null)
    const logoutHandler = () => {
        dispatch(logout())
    }
    
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
                        <NavLink className="nav-link p-0" activeclassname={'active'} to="/" exact>
                            <li className="nav-item px-5 mx-2">
                                <span>Home </span>
                            </li>
                        </NavLink>
                        <li className="nav-item px-5 mx-2">
                            <NavLink className="nav-link" activeclassname={'active'} to="/" exact>Features</NavLink>
                        </li>
                        <li className="nav-item px-5 mx-2">
                            <NavLink className="nav-link" activeclassname={'active'} to="/" exact>Pricing</NavLink>
                        </li>

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
                                    <UserOutlined className="primaryColoredIcon" />
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
