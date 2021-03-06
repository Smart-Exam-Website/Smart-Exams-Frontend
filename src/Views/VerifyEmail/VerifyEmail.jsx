import React from 'react'
import CardComponent from '../../Components/CardComponent/CardComponent'
import ReactCodeInput from 'react-verification-code-input';
import './VerifyEmail.css'
import useWindowWidth from '../../hooks/useWindowWidth';
import HandleErrors from '../../hooks/handleErrors';
import _axios from '../../apis/axios-instance';
import showSuccessMsg from '../../hooks/showSuccessMsg';

const VerifyEmail = (props) => {
    const onsubmit = (e) => {
        verifyEmail(e);
    }

    const verifyEmail = (codeValue) => {
        //sent to server
        var data = {
            email: props.location.state.email,
            code: codeValue
        }
        _axios.post("/verifyEmail", data).then((response) => {
            showSuccessMsg("Verified Successfully!")
            props.history.push({
                pathname: '/login',
            })
        }).catch((err) => HandleErrors(err))

    }

    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 768
    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={'Verify Email'}>
                    <div className="d-flex flex-column justify-content-center align-items-center py-2">
                        <small className='text-green'>We have sent for you a verify code.</small>
                        <small className='text-green'>Please enter the code here</small>
                        <ReactCodeInput
                            onComplete={onsubmit}
                            className="my-4 text-primary"
                            type='text'
                            autoFocus={true}
                            fieldHeight={85}
                            fieldWidth={isMobile ? screenWidth / 7 : 66}
                            fields={6} />
                    </div>
                </CardComponent>
            </div>
        </div>
    )
}

export default VerifyEmail
