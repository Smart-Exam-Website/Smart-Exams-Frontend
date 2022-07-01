import React from 'react'
import './Home.css'
import studyImage from '../../assets/images/study.jpg'
import { Typography } from '@mui/material'
import { Colors } from '../../constants/Colors';
import { createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
const styles = {
    color: Colors.primary

};

const theme = createTheme({
    shape: {
        borderRadius: 20,
    },
})

const ColorButton = styled(Button)(({ theme }) => ({
    borderRadius: 20,

    backgroundColor: Colors.primary,
    '&:hover': {
        backgroundColor: Colors.primaryHover,
    },
}));

const Home = () => {
    const isAuth = useSelector(state => state.auth.userToken)
    const userType = useSelector(state => state.auth.userType)
    const history = useHistory()

    const getStartedHandler = () => {
        history.push('/login')
        return
    }
    const yourProfileHandler = () => {
        history.push('/profile/' + userType)
        return
    }

    return (

        <div className='main text-center' style={{ minHeight: "80vh" }}>
            <div className='p-3'></div>

            <Typography variant="h3" component="div" className='m-4 slide' style={styles} >
                Welcome to Smart Exam
            </Typography>
            <Typography variant="h5" component="div" className='m-4 slide' style={styles} >
                A free educational platform where you can create secure, reliable, cheating-free exams
            </Typography>

            {/* Background Image */}

            <div className='image slide'>

                <div className='p-5'></div>
                <div className='p-5'></div>

                {/* Shaded Area for text  */}
                <div className='textbox'>

                    <div className=' mb-3 p-3'>

                        <Typography variant="h5" component="div" className='slide' style={{ color: Colors.white }} >

                            {/* Make your exam in a more secure platform */}
                            We offer an easy, smart system that provides
                        </Typography>
                        <Typography variant="h5" component="div" className='slide' style={{ color: Colors.white }} >

                            Anti-Cheating techniques to ensure online exam as secure as offline exam.
                        </Typography>
                    </div>

                    <div className=' '>

                        <Typography variant="h6" component="div" className='slide' style={{ color: Colors.white }} >
                            You can monitor your student behaviours within a click.
                        </Typography>
                        <Typography variant="h6" component="div" className='slide ' style={{ color: Colors.white }} >
                            Online Exams Made Easy, Start Now
                        </Typography>


                    </div>

                    {!isAuth ?
                        <ColorButton className='m-3' variant="contained" onClick={getStartedHandler} size="large" theme={theme} color="success">
                            Get Started
                        </ColorButton> :
                        <ColorButton className='m-3' variant="contained" onClick={yourProfileHandler} size="large" theme={theme} color="success">
                            Your Profile
                        </ColorButton>

                    }




                </div>


            </div>

        </div>
    )
}

export default Home
