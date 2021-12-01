import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthServices } from '../../../apis/Services/AuthService';
import { setUserType, signin } from '../../../redux/actions/AuthActions';

const Login = (props) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const forgotPasswordHandler = () => {
        // props.history.push('/forgotPassword');
        return
    }

    const SignUpHandler = () => {
        props.history.push('/signup')
    }

    const dispatch = useDispatch(null)
    const LoginHandler = (event) => {
        // this code pevents from going to another page
        event.preventDefault()

        console.log(email)
        console.log(password)
        AuthServices.login({ email, password })
            .then(res => {
                console.log("result =>", res)
                localStorage.setItem('token', res?.token)
                localStorage.setItem('userType', res?.user?.type)
                dispatch(signin(res?.token))
                dispatch(setUserType(res?.user?.type))
                props.history.push('/profile/student')
            })
            .catch(err => {
                console.log("ss",err)
            })
    }

    return (
        <div className="card m-5 ">

            <div className="card-header">
                Login to Smart Exam
            </div>

            <div className="card-body">
                <form className=" m-3">
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                    </div>


                    {/* <div className="form-check mx-auto">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                        </div> */}

                    <hr />

                    <div className="mx-auto" style={{ width: 200 }} >
                        <button className="btn btn-primary mx-auto" onClick={LoginHandler} style={{ width: 200 }}>Login</button>

                        <div className="text-center">
                            <button type="button" className="btn btn-link">Forgot password?</button>
                            <button type="button" className="btn btn-link ">Sign up</button>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
}


export default Login;
