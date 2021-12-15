import React, { Component } from 'react';
import axios from 'axios';
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
            <div className="card m-5">
                <div className="card-header">
                    Sign up in Smart Exam
                </div>



                <form className="m-3">
                <div className="row m-1">
                        <div className="form-group col">
                            <label >First Name</label>
                            <input type="text" className="form-control" onChange={this.firstNameFormHandler} placeholder="First Name" />
                        </div>
                        <div className="form-group col">
                            <label >Last Name</label>
                            <input type="text" className="form-control" onChange={this.lastNameFormHandler} placeholder="Last Name" />
                        </div>
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

                    <div className="row m-1">
                        <div className="form-group  col">
                            <label for="inputAddress">Phone Number</label>
                            <input type="text" className="form-control" onChange={this.phoneFormHandler} placeholder="Phone Number" />
                        </div>
                        <div className="form-group col">
                            <label >Email</label>
                            <input type="email" className="form-control" onChange={this.emailFormHandler} placeholder="Email Address" />
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="form-group  col">
                            <label >Department</label>
                            <input type="text" className="form-control" onChange={this.departmentFormHandler} placeholder="Enter Your Department" />
                        </div>

                    </div>


                    <div className="row m-1">
                        <div className="form-group col">
                            <label >School / University</label>
                            <input type="text" className="form-control" onChange={this.schoolFormHandler} placeholder="School / University" />
                        </div>
                        <div className="form-group col">
                            <label for="inputEmail4">Student Code</label>
                            <input type="text" className="form-control" onChange={this.studentCodeFormHandler} placeholder="Student Code" />
                        </div>
                    </div>



                    <div className="row m-1">
                        <div className="form-group col">
                            <label for="inputPassword4">Password</label>
                            <input type="password" className="form-control" onChange={this.passwordFormHandler} id="inputPassword4" placeholder="Password" />
                        </div>
                        <div className="form-group col">
                            <label for="inputConfirmPassword4">Confirm Password</label>
                            <input type="password" className="form-control" onChange={this.confirmPasswordFormHandler} id="inputConfirmPassword4" placeholder="Confirm Password" />
                        </div>
                    </div>


                    <hr />

                    <div className="mx-auto" style={{ width: 200 }} >
                        <button type="submit" className="btn btn-primary mx-auto" onClick={this.registerHandler} style={{ width: 200 }}>Register</button>
                    </div>




                </form>

            </div>

        );
    }
}

export default RegisterStudent;
