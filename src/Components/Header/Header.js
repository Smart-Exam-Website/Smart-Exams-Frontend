import React from 'react'
import './Header.css'
import Logo from '../../assets/images/logo.png'

const Header = () => {
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <img height={66} src={Logo} alt="smart exam logo" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto mainNav">
                        <li className="nav-item active px-5 mx-2">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item px-5 mx-2">
                            <a className="nav-link" href="/">Features</a>
                        </li>
                        <li className="nav-item px-5 mx-2">
                            <a className="nav-link" href="/">Pricing</a>
                        </li>

                    </ul>

                    <ul className="navbar-nav d-flex justify-content-lg-center justify-content-between flex-row">
                        <li className="nav-item mx-2 d-flex align-items-center">
                            <a className="loginText" href="/">login</a>
                        </li>

                        <li className="nav-item mx-2">
                            <button className="btn btn-primary">Sign up</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
