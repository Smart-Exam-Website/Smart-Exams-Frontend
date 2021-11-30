import React, { useEffect, useState } from 'react'
import './InstructorProfile.css'
import UserPhoto from '../../../assets/images/Profile Photo.png'
import { InstructorServices } from '../../../apis/Services/InstructorService'

const InstructorProfile = () => {

    const [instructorData, setInstructorData] = useState(null)
    useEffect(() => {
        InstructorServices.getMyProfile()
            .then(res => {
                setInstructorData(res.instructor)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="Profile_I mt-5" style={{ minHeight: '100vh' }}>
            <div className="container d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center ProfileCard w-100 p-3">
                    {/* IMAGE AND NAME */}
                    <img src={UserPhoto} alt="User" />
                    <div className="d-flex flex-column flex-md-row align-items-center">
                        <h2>Hossam Sherif Hassan</h2>
                        <div className="mx-2">
                            <span className="badge badge-secondary">Instructor</span>
                        </div>
                    </div>

                    {/* INFO PART */}
                    <div style={{ marginTop: 95, width: '100%' }} className="px-lg-5">
                        {/* EMAIL */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100">
                            <span className="pr-2">Email: </span>
                            <h4 className="infoText m-0 px-2">hossam.sherif.hassan@gmail.com</h4>
                        </div>

                        {/* DEGREE */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100">
                            <span className="pr-2">Degree: </span>
                            <h4 className="infoText m-0 px-2">Proff. Dr.</h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorProfile
