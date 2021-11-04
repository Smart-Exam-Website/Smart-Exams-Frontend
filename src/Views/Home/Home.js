import React from 'react'
import './Home.css'
import Signupinquiry from '../../Components/Registration/Register/RegisterInquiry'
const Home = () => {
    return (
        
        <div className='main' style={{minHeight:"80vh"}}>
            <h1>Hiii</h1>
            <Signupinquiry></Signupinquiry>
            {/* <Signup></Signup> */}
            {/* <Login></Login> */}
        </div>
    )
}

export default Home
