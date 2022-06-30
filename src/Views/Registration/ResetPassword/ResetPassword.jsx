import React, { useState } from 'react';
import _axios from '../../../apis/axios-instance';
import { connect } from 'react-redux';
import showSuccessMsg from '../../../hooks/showSuccessMsg';
import HandleErrors from '../../../hooks/handleErrors';

const Resetpassword = (props) => {
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);


    const ResetHandler = (event) => {
        // this code pevents from going to another page
        event.preventDefault()

        if (password !== confirmPassword) {
            HandleErrors("Password Mismatch")
            return
        }

        var data = {
            password: password,
            email: localStorage.getItem("email"),
            token: props.match.params.token

        }
        _axios.put("/auth/forgotPassword", data).then((response) => {
            localStorage.removeItem("email")
            showSuccessMsg("Password Reset Successfully")
            props.history.push('/login')
        }).catch(err => HandleErrors(err))

    }
    return (
        <div className="card m-5 ">

            <div className="card-header">
                Reset Password
            </div>

            <div className="card-body">
                <form className=" m-3">

                    <div className="form-group">
                        <label >New Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
                    </div>
                    <div className="form-group">
                        <label >Confirm New Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" />
                    </div>

                    <hr />

                    <div className="mx-auto" style={{ width: 200 }} >
                        <button className="btn btn-primary mx-auto" onClick={ResetHandler} style={{ width: 200 }}>Reset Password</button>

                    </div>


                </form>
            </div>
        </div>
    );
}

// Import connect
const mapStateToProps = (state) => {
    return {
        email_address: state.rst.email,
    };

}

const mapDispatchToProps = dispatch => {
    return 0

}
export default connect(mapStateToProps, mapDispatchToProps)(Resetpassword);

