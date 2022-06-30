import React, { Component } from 'react';
import { IconButton, TextField, Typography } from '@mui/material';
import HandleErrors from '../../../../hooks/handleErrors';
import CardComponent from '../../../../Components/CardComponent/CardComponent';
import _axios from '../../../../apis/axios-instance';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { UploadServices } from '../../../../apis/Services/UploadService';

const Input = styled('input')({
    display: 'none',
});
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
        if (!this.state.selectedFile) {
            return "Image is required"
        }
        return "success"
    }

    registerHandler = (event) => {
        const validationMessage = this.validateData()
        if (validationMessage !== 'success') {
            HandleErrors(validationMessage)
            return
        }

        UploadServices.uploadImage(this.state.selectedFile)
            .then(res => {
                var data = {
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "description": "This is new instructor's description",
                    "email": this.state.email,
                    "password": this.state.password,
                    "gender": this.state.gender,
                    "image": res.image,
                    "phone": this.state.phone,
                    "studentCode": this.state.studentcode,
                    "type": "student",
                    "departments": [
                        {
                            "department_id": 1
                        }
                    ]
                }
                return _axios.post('/students/register', data)
            })
            .then((response) => {
                this.props.history.push({
                    pathname: '/verifyEmail',
                    state: { email: this.state.email }
                })
            })
            .catch(err => HandleErrors(err))
    }

    handleUploadClick = event => {
        var file = event.target.files[0];
        const reader = new FileReader();
        let url = reader.readAsDataURL(file)
        reader.onloadend = function (e) {
            this.setState({
                photoName: file.name,
                selectedFile: file,
                personalImageUrl: e.target.result
            });
        }.bind(this);
    };

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
                                    <div className="form-group m-2">
                                        <div className="form-check form-check-inline ">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="male"
                                                checked={this.state.gender === 'male'}
                                                onChange={this.genderHandler}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1"> Male </label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="female"
                                                checked={this.state.gender === 'female'}
                                                onChange={this.genderHandler}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2"> Female</label>
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
                                    <TextField type={'password'} fullWidth id="outlined-basic" onChange={this.confirmPasswordFormHandler} label="Confirm Password" variant="outlined" />
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-12 justify-content-center align-items-center d-flex flex-row">
                                    <Typography className='fw-bolder' color={'primary'}>{this.state?.photoName || 'Upload your personal photo'}</Typography>
                                    <label htmlFor="icon-button-file">
                                        <Input onChange={this.handleUploadClick} accept="image/*" id="icon-button-file" type="file" />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </div>
                                {this.state?.personalImageUrl ?
                                    <div className="col-8 justify-content-center align-items-center">
                                        <img
                                            style={{ width: 200 }}
                                            src={`${this.state?.personalImageUrl}`}
                                            alt={'Personal image'}
                                            loading="lazy"
                                        />
                                    </div>
                                    :
                                    null
                                }
                            </div>

                            <div className="mx-auto mt-4">
                                <button type='button' className="btn btn-primary mx-auto" onClick={this.registerHandler}>Submit</button>
                            </div>
                        </form>
                    </CardComponent>
                </div>
            </div>
        );
    }
}

export default RegisterStudent;
