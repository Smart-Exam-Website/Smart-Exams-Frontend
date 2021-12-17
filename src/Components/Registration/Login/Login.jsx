import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthServices } from '../../../apis/Services/AuthService';
import { setUserType, signin } from '../../../redux/actions/AuthActions';
import CardComponent from '../../CardComponent/CardComponent';

const Login = (props) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const forgotPasswordHandler = (event) => {
        // this code pevents from going to another page
        event.preventDefault()

        this.props.history.push({
            pathname: '/forgot-password',
            state: { email: email }
        })

        props.history.push('/forgot-password')
        // props.history.push('/reset-password')

    }

    const SignUpHandler = () => {
        props.history.push('/register')
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
                props.history.push(`/profile/${res?.user?.type}`)
            })
            .catch(err => {
                console.log("ss", err)
            })
    }

    return (
        <div className="row justify-content-center text-center my-5">
            <div className="col-md-8 col-12">
                <CardComponent title={'Login'}>
                    <form className="m-3 text-start">
                        <div className="form-group">
                            <label >Email Address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>

                        <div className="mx-auto mt-4 text-center">
                            <button className="btn btn-primary mx-auto" onClick={LoginHandler}>Login</button>
                            <div>
                                <button type="button" className="btn btn-link" onClick={forgotPasswordHandler}>Forgot password?</button>
                                <button type="button" className="btn btn-link" onClick={SignUpHandler}>Signup</button>
                            </div>
                        </div>
                    </form>
                </CardComponent>
            </div>
        </div>
    );
}


export default Login;
