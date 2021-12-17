import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

class Registerinquiry extends Component {

    RegisterAsStudentHandler = () => {
        // this.props.history.push('/signup')
        this.props.history.push('/register-student')

    }
    RegisterAsInstructorHandler = () => {
        
        this.props.history.push('/register-instructor')

     }


    render() {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="card border-success mb-3" style={{ MaxWidth: 18 }}>
                    <div className="card-header">Sign up</div>
                    <div className="card-body text-success">
                        <h5 className="card-title text-center">Register As...?</h5>
                        <div className="form-inline">
                            <button type="button" onClick={this.RegisterAsStudentHandler} className="btn btn-primary m-3">Student</button>
                            <button type="button" onClick={this.RegisterAsInstructorHandler} className="btn btn-danger m-3">Instructor</button>

                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default withRouter(Registerinquiry);
