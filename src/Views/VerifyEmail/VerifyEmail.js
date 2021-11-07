import React, { useState } from 'react'
import CardComponent from '../../Components/CardComponent/CardComponent'
import ReactCodeInput from 'react-verification-code-input';
import './VerifyEmail.css'
import useWindowWidth from '../../hooks/useWindowWidth';

const VerifyEmail = () => {
    const onsubmit = (e)=>{
        verifyEmail(e);
    }

    const verifyEmail = (codeValue)=>{
        //sent to server
        console.log(codeValue)
    }

    const screenWidth = useWindowWidth();
    const isMobile = screenWidth<768
    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={'Verify Email'}>
                    <div className="d-flex flex-column justify-content-center align-items-center py-2">
                        <ReactCodeInput onComplete={onsubmit} className="my-5" autoFocus={true} fieldHeight={85} fieldWidth={isMobile? screenWidth/7:66} fields={6} />
                        <div>
                            <button className="btn btn-primary">Verify</button>
                        </div>
                        <small>Haven’t receive the code yet? <b className="resent-text-purple text-decoration-underline">Resent again</b></small>
                    </div>
                </CardComponent>
            </div>
        </div>
    )
}

export default VerifyEmail
