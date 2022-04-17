import React, { useEffect, useState } from 'react'
import './InstructorProfile.css'
import { InstructorServices } from '../../../apis/Services/InstructorService'
import useImageResolver from '../../../hooks/useImageResolver'
import HandleErrors from '../../../hooks/handleErrors'

const InstructorProfile = () => {

    const [instructorData, setInstructorData] = useState(null)
    useEffect(() => {
        InstructorServices.getMyProfile()
            .then(res => {
                setInstructorData(res.instructor)
            })
            .catch(err => HandleErrors(err))
    }, [])

    const imageResolver = useImageResolver()
    return (instructorData &&
        <div className="Profile_I mt-5" style={{ minHeight: '100vh' }}>
            <div className="container d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center ProfileCard w-100 p-3">
                    {/* IMAGE AND NAME */}
                    <img style={{objectFit:'contain'}} src={imageResolver(instructorData?.user?.image)} alt="User" />
                    <div className="d-flex flex-column flex-md-row align-items-center mt-2">
                        <h2>{`${instructorData?.user?.firstName} ${instructorData?.user?.lastName}`}</h2>
                        <div className="mx-2">
                            <span className="badge badge-secondary">{instructorData?.user?.type}</span>
                        </div>
                    </div>

                    {/* INFO PART */}
                    <div style={{ marginTop: 95, width: '100%' }} className="px-lg-5">
                        {/* EMAIL */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100 my-3">
                            <span className="pr-2">Email: </span>
                            <h4 className="infoText m-0 px-2">{instructorData?.user?.email}</h4>
                        </div>

                        {/* phone */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100 my-3">
                            <span className="pr-2">Phone: </span>
                            <h4 className="infoText m-0 px-2 text-capitalize">{instructorData?.user?.phone}</h4>
                        </div>

                        {/* DEGREE */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100 my-3">
                            <span className="pr-2">Degree: </span>
                            <h4 className="infoText m-0 px-2">{instructorData?.degree}</h4>
                        </div>

                        {/* Gender */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100 my-3">
                            <span className="pr-2">Gender: </span>
                            <h4 className="infoText m-0 px-2 text-capitalize">{instructorData?.user?.gender}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorProfile
