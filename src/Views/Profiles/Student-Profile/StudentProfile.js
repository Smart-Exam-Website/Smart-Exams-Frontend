import React, { useEffect, useState } from 'react'
import './StudentProfile.css'
import { StudentServices } from '../../../apis/Services/StudentService'
import useImageResolver from '../../../hooks/useImageResolver'

const StudentProfile = () => {

    const [studentData, setStudentData] = useState(null)
    useEffect(() => {
        StudentServices.getMyProfile()
            .then(res => {
                setStudentData(res.student)
            })
            .catch(err => console.log(err))

    }, [])

    const imageResolver = useImageResolver()
    return (studentData &&
        <div className="Profile_S mt-5" style={{ minHeight: '100vh' }}>
            <div className="container d-flex justify-content-center">
                <div className="d-flex flex-column align-items-center ProfileCard w-100 p-3">
                    {/* IMAGE AND NAME */}
                    <img src={imageResolver(studentData?.user?.image)} alt="User" />
                    <div className="d-flex flex-column flex-md-row mt-2">
                        <h2>{`${studentData?.user?.firstName} ${studentData?.user?.lastName}`}</h2>
                        <div className="mx-2">
                            <span className="badge badge-secondary text-capitalize">{studentData?.user?.type}</span>
                        </div>
                    </div>

                    {/* INFO PART */}
                    <div style={{ marginTop: 95, width: '100%' }} className="px-lg-5">
                        {/* EMAIL */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100 my-3">
                            <span className="pr-2">Email: </span>
                            <h4 className="infoText m-0 px-2">{studentData?.user?.email}</h4>
                        </div>

                        {/* phone */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100 my-3">
                            <span className="pr-2">Phone: </span>
                            <h4 className="infoText m-0 px-2 text-capitalize">{studentData?.user?.phone}</h4>
                        </div>

                        {/* CODE */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100 my-3">
                            <span className="pr-2">Code: </span>
                            <h4 className="infoText m-0 px-2">{studentData?.studentCode}</h4>
                        </div>

                        {/* Gender */}
                        <div className="d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100 my-3">
                            <span className="pr-2">Gender: </span>
                            <h4 className="infoText m-0 px-2 text-capitalize">{studentData?.user?.gender}</h4>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile
