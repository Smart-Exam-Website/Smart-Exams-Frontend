import React from 'react'
import CardComponent from '../../Components/CardComponent/CardComponent'
import ReactCodeInput from 'react-verification-code-input';
import './VerifyEmail.css'
import useWindowWidth from '../../hooks/useWindowWidth';
import axios from 'axios';
import DomainUrl from '../../apis/Domain';
const VerifyEmail = (props) => {
    const onsubmit = (e) => {
        verifyEmail(e);
    }
    const resend = () => {
        const data = props.location.state.userInfo
        const type = data['type'];
        if (type === 'instructor') {
            axios.post(DomainUrl + '/instructors/register', data).then((response) => {
                console.log(response)
                console.log("lol")

            }).catch((error) => {
                console.log(error);

            })
        } else if (type === 'student') {
            axios.post(DomainUrl + '/students/register', data).then((response) => {
                console.log(response)
                console.log("lol")

            }).catch((error) => {
                console.log(error);

            })

        }
    }


    const verifyEmail = (codeValue) => {
        //sent to server
        console.log(codeValue)
        console.log(props.location.state.email)
        var data = {
            email: props.location.state.email,
            code: codeValue
        }
        axios.post(DomainUrl + "/verifyEmail", data).then((response) => {
            console.log(response)
            console.log("Success ya wlaaa")

        }).catch((error) => {
            console.log(error)

        })

    }

    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 768
    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={'Verify Email'}>
                    <div className="d-flex flex-column justify-content-center align-items-center py-2">
                        <ReactCodeInput
                            onComplete={onsubmit}
                            className="my-5"
                            type='text'
                            autoFocus={true}
                            fieldHeight={85}
                            fieldWidth={isMobile ? screenWidth / 7 : 66}
                            fields={6} />
                        <div>
                            <button className="btn btn-primary">Verify</button>
                        </div>
                        <small>Haven’t receive the code yet? <b className="resent-text-purple text-decoration-underline" onClick={resend}>Resend again</b></small>
                    </div>
                </CardComponent>
            </div>
        </div>
    )
}

export default VerifyEmail
