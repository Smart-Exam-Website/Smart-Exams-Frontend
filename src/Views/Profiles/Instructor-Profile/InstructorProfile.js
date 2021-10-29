import React from 'react'
import './InstructorProfile.css'
import UserPhoto from '../../../assets/images/Profile Photo.png'

const InstructorProfile = () => {
    return (
        <div className="Profile_I mt-5" style={{ minHeight: '100vh' }}>
            <div className="container d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center ProfileCard w-100">
                    {/* IMAGE AND NAME */}
                    <img src={UserPhoto} alt="User" />
                    <div className="d-flex flex-row">
                        <h2>Hossam Sherif Hassan</h2>
                        <div className="mx-2">
                            <span className="badge badge-secondary">Instructor</span>
                        </div>
                    </div>

                    {/* INFO PART */}
                    <div style={{ marginTop: 95, width: '100%' }} className="px-lg-5">
                        {/* EMAIL */}
                        <div className="d-flex flex-lg-row justify-content-lg-between flex-column align-items-center w-100">
                            <span className="pr-2">Email: </span>
                            <h4 className="infoText">hossam.sherif.hassan@gmail.com</h4>
                        </div>

                        {/* DEGREE */}
                        <div className="d-flex flex-lg-row justify-content-lg-between flex-column align-items-center w-100">
                            <span className="pr-2">Degree: </span>
                            <h4 className="infoText">Proff. Dr.</h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorProfile
