import React from 'react'
import './StudentProfile.css'
import UserPhoto from '../../../assets/images/Profile Photo.png'

const StudentProfile = () => {
    return (
        <div className="Profile_S mt-5" style={{ minHeight: '100vh' }}>
            <div className="container d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center ProfileCard w-100 p-3">
                    {/* IMAGE AND NAME */}
                    <img src={UserPhoto} alt="User" />
                    <div className="d-flex flex-column flex-md-row">
                        <h2>Hossam Sherif Hassan</h2>
                        <div className="mx-2">
                            <span className="badge badge-secondary">Student</span>
                        </div>
                    </div>

                    {/* INFO PART */}
                    <div style={{ marginTop: 95, width: '100%' }} className="px-lg-5">
                        {/* EMAIL */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100">
                            <span className="pr-2">Email: </span>
                            <h4 className="infoText m-0 px-2">hossam.sherif.hassan@gmail.com</h4>
                        </div>

                        {/* CODE */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100">
                            <span className="pr-2">Code: </span>
                            <h4 className="infoText m-0 px-2">1700440</h4>
                        </div>

                        {/* CODE */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100">
                            <span className="pr-2">Academic Year: </span>
                            <h4 className="infoText m-0 px-2">4th Computer</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile
