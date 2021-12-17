import React, { Component } from 'react';
import axios from 'axios';
import CardComponent from '../../../CardComponent/CardComponent';
import { TextField } from '@mui/material';
class RegisterStudent extends Component {


    state = {
        firstName: null,
        lastName: null,
        gender: 'male',
        email: null,
        phone: null,
        department: null,
        studentcode: null,
        school: null,
        password: null,
        confirmPassword: null
    }

    firstNameFormHandler = (event) => {
        this.setState({ firstName: event.target.value })
    }
    lastNameFormHandler = (event) => {

        this.setState({ lastName: event.target.value })
    }
    genderHandler = (event) => {
        console.log(event.target.value)
        this.setState({ gender: event.target.value })
    }
    emailFormHandler = (event) => {
        this.setState({ email: event.target.value })
    }
    phoneFormHandler = (event) => {
        this.setState({ phone: event.target.value })
    }
    departmentFormHandler = (event) => {
        this.setState({ department: event.target.value })
    }
    studentCodeFormHandler = (event) => {
        this.setState({ studentcode: event.target.value })
    }
    schoolFormHandler = (event) => {
        this.setState({ school: event.target.value })
    }
    passwordFormHandler = (event) => {
        this.setState({ password: event.target.value })
    }
    confirmPasswordFormHandler = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }




    registerHandler = (event) => {
        // send data into server 
        event.preventDefault()


        var data = {

            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "description": "This is new instructor's description",
            "email": this.state.email,
            "password": this.state.password,
            "gender": this.state.gender,
            "image": "https://google.com/pepepepaaa",
            "phone": this.state.phone,
            "studentCode": this.state.studentcode,
            "type": "student",
            "departments": [
                {
                    "department_id": 1
                }
            ]
        }
        axios.post('http://3.143.249.185/api/students/register', data).then((response) => {
            console.log(response)
            console.log("lol")

        }).catch((error) => {
            console.log(error);

        })

        this.props.history.push({
            pathname: '/verifyEmail',
            state: { email: this.state.email }
        })
        // this.props.history.push('/verifyEmail');
    }



    render() {
        return (
            <div className="row justify-content-center text-center my-5">
                <div className="col-md-8 col-12">
                    <CardComponent title={'Signup'}>
                        <form className="m-3">
                            <div className="row m-1 my-4">
                                <div className="form-group col">
                                    <TextField fullWidth id="outlined-basic" onChange={this.firstNameFormHandler} label="First Name" variant="outlined" />
                                </div>
                                <div className="form-group col">
                                    <TextField fullWidth id="outlined-basic" onChange={this.lastNameFormHandler} label="Last Name" variant="outlined" />
                                </div>
                            </div>
                            <div className="row m-1 my-4">
                                <div className="form-group col">
                                    <label >Gender</label>
                                    <div class="form-group m-2">
                                        <div class="form-check form-check-inline ">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="male"
                                                checked={this.state.gender === 'male'}
                                                onChange={this.genderHandler}
                                            />
                                            <label class="form-check-label" for="flexRadioDefault1"> Male </label>
                                        </div>

                                        <div class="form-check form-check-inline">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="female"
                                                checked={this.state.gender === 'female'}
                                                onChange={this.genderHandler}
                                            />
                                            <label class="form-check-label" for="flexRadioDefault2"> Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row m-1 my-4">
                                <div className="form-group  col">
                                    <TextField fullWidth id="outlined-basic" onChange={this.phoneFormHandler} label="Phone Number" variant="outlined" />
                                </div>
                                <div className="form-group col">
                                    <TextField fullWidth id="outlined-basic" onChange={this.emailFormHandler} label="Email" variant="outlined" />
                                </div>
                            </div>

                            <div className="row m-1 my-4">
                                <div className="form-group  col">
                                    <TextField fullWidth id="outlined-basic" onChange={this.departmentFormHandler} label="Department" variant="outlined" />
                                </div>
                            </div>


                            <div className="row m-1 my-4">
                                <div className="form-group col">
                                    <TextField fullWidth id="outlined-basic" onChange={this.schoolFormHandler} label="School / University" variant="outlined" />
                                </div>
                                <div className="form-group col">
                                    <TextField fullWidth id="outlined-basic" onChange={this.studentCodeFormHandler} label="Student Code" variant="outlined" />
                                </div>
                            </div>

                            <div className="row m-1 my-4">
                                <div className="form-group col">
                                    <TextField type={'password'} fullWidth id="outlined-basic" onChange={this.passwordFormHandler} label="Password" variant="outlined" />
                                </div>
                                <div className="form-group col">
                                    <TextField type={'password'} fullWidth id="outlined-basic" onChange={this.confirmPasswordFormHandler} label="Confirm Passwor" variant="outlined" />
                                </div>
                            </div>

                            <div className="mx-auto mt-4">
                                <button type="submit" className="btn btn-primary mx-auto" onClick={this.registerHandler}>Submit</button>
                            </div>
                        </form>
                    </CardComponent>
                </div>
            </div>
        );
    }
}

export default RegisterStudent;
