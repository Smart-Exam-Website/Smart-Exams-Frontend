import React from 'react'
import './Footer.css'
import Logo from '../../assets/images/logo.png'
import { InstagramOutlined, FacebookOutlined, PhoneOutlined } from '@ant-design/icons';

const iconStyle = {
    fontSize: 36,
    color: '#313131',
    margin: '0px 12px',
    cursor: 'pointer'
}

const isMobile = window.innerWidth < 992;
const Footer = () => {
    return (
        <footer style={{marginTop:200}} className="Footer container">
            <div className="row justify-content-lg-center pl-3 p-lg-0">
                <div className="col-lg-4 col-12 text-lg-center">
                    <img height={66} src={Logo} alt="smart exam logo" />
                    <h5 className="text-grey my-3">Test your student smartly.</h5>

                    {!isMobile &&
                        <div className="d-flex flex-row justify-content-center">
                            <FacebookOutlined style={iconStyle} />
                            <InstagramOutlined style={iconStyle} />
                            <PhoneOutlined style={iconStyle} />
                        </div>
                    }

                </div>
                <div className="col-lg-4 col-12 text-lg-center">
                    <h4>Menu</h4>
                    <ul className="d-flex d-lg-block flex-row">
                        <li className="mx-2">Home</li>
                        <li className="mx-2">Tours</li>
                        <li className="mx-2">Category</li>
                        <li className="mx-2">About Us</li>
                    </ul>
                </div>
                <div className="col-lg-4 col-12 text-lg-center">
                    <h4>Support</h4>
                    <ul className="d-flex d-lg-block flex-row">
                        <li className="mx-2">FAQ</li>
                        <li className="mx-2">Terms & Conditions</li>
                        <li className="mx-2">Privacy Policy</li>
                    </ul>
                </div>
            </div>
            <div className="text-center">
                {isMobile &&
                    <div className="d-flex flex-row justify-content-center">
                        <FacebookOutlined style={iconStyle} />
                        <InstagramOutlined style={iconStyle} />
                        <PhoneOutlined style={iconStyle} />
                    </div>
                }
                <small className="text-grey">{new Date().getFullYear()} (c) — SmartExam. All Rights Reserved</small>
            </div>
        </footer>
    )
}

export default Footer
