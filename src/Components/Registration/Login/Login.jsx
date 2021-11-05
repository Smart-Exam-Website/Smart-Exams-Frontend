import React, { Component } from 'react';
import { AuthServices } from '../../../apis/Services/AuthService';

class Login extends Component {
    
    state = {
        email: null,
        password: null
    }




    forgotPasswordHandler = () => {
        // this.props.history.push('/forgotPassword');
        return
    }

    SignUpHandler = () => {
        this.props.history.push('/signup')
    }
    
    emailFormHandler = (event) => {
        this.setState({email:event.target.value})
    }
    PasswordFormHandler = (event) => {
        this.setState({password:event.target.value})
    }
    
    LoginHandler = (event) => {
        // this code pevents from going to another page
        event.preventDefault()
        
        let email = this.state.email
        let password = this.state.password
        console.log(email)
        console.log(password)
        AuthServices.login({email,password})
        .then(res=>{
            console.log(res)
            this.props.history.push('/profile/student')
        })
        .catch(err=>{
            console.log(err)
            this.props.history.push('/profile/student')
        })
        return
    }



    render() {
        console.log("lol")
        return (



            <div className="card m-5 ">

                <div className="card-header">
                    Login to Smart Exam
                </div>

                <div className="card-body">
                    <form className=" m-3">
                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={this.emailFormHandler} placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.PasswordFormHandler} placeholder="Password" />
                        </div>


                        {/* <div className="form-check mx-auto">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                        </div> */}

                        <hr />

                        <div className="mx-auto" style={{ width: 200 }} >
                            <button type="submit" className="btn btn-primary mx-auto" onClick={this.LoginHandler} style={{ width: 200 }}>Login</button>

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
}

export default Login;
