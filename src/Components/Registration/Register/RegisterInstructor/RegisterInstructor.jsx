import React, { Component } from 'react';

class RegisterInstructor extends Component {


    state = {
        name: null,
        email: null,
        phone: null,
        department: null,
        degree: null,
        school: null,
        password: null,
        confirmPassword: null
    }

    nameFormHandler = (event) => {
        this.setState({ name: event.target.value })
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
    degreeFormHandler = (event) => {
        this.setState({ degree: event.target.value })
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
    
    
    
    
    registerHandler= (event) => {
        // send data into server 
        event.preventDefault()
        
        console.log(this.state)
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
                            <label >Name</label>
                            <input type="text" className="form-control" onChange={this.nameFormHandler} id="inputEmail4" placeholder="Full Name" />
                        </div>
                        <div className="form-group col">
                            <label for="inputEmail4">Email</label>
                            <input type="email" className="form-control" onChange={this.emailFormHandler} id="inputEmail4" placeholder="Email" />
                        </div>
                    </div>

                    <div className="row m-1">
                        <div className="form-group  col">
                            <label for="inputAddress">Phone Number</label>
                            <input type="text" className="form-control" onChange={this.phoneFormHandler} placeholder="Enter Your Phone" />
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
                            <label for="inputEmail4">Degree</label>
                            <input type="text" className="form-control" onChange={this.degreeFormHandler} placeholder="Degree" />
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

export default RegisterInstructor;
