import React, { Component } from 'react';
import axios from 'axios';
import CardComponent from '../../../CardComponent/CardComponent';
import { TextField } from '@mui/material';
import HandleErrors from '../../../../hooks/handleErrors';
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



    isValidEmail = (email) => {
        return Boolean(String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ));
    }

    isValidName = (name) => {
        if (name === '' | name == null) {
            return false
        }
        return true
    }
    isValidPhone = (number) => {
        var phoneno = /^\d{11}$/;
        if (number === '' | number == null) {
            return false
        }
        if ((number.match(phoneno))) {
            return true;
        }
        else {
            return false;
        }

    }

    isPasswordMatch = (password, confirmPassword) => {
        if (password === '' | password === null) {
            return false
        }
        return (password === confirmPassword)
    }


    validateData = () => {
        if (!this.isValidName(this.state.firstName)) {
            return "Invalid First Name"
            // return false
        }
        if (!this.isValidName(this.state.lastName)) {
            return "Invalid Last Name"

        }
        if (!this.isValidPhone(this.state.phone)) {
            return "Invalid Phone Number"

        }
        if (!this.isValidEmail(this.state.email)) {
            return "Invalid Email"

        }
        if (!this.isValidName(this.state.department)) {
            return "Invalid Department"

        }
        if (!this.isValidName(this.state.school)) {
            return "Invalid School"

        }
        if (!this.isValidName(this.state.studentcode)) {
            return "Invalid Student Code"

        }
        if (!this.isPasswordMatch(this.state.password, this.state.confirmPassword)) {
            return "Password Mismatch"

        }
        return "success"
    }

    registerHandler = (event) => {
        // send data into server 
        event.preventDefault()

        const validationMessage = this.validateData()
        if (validationMessage !== 'success') {
            alert(validationMessage)
            return
        }

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

        }).catch(err => HandleErrors(err))

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
