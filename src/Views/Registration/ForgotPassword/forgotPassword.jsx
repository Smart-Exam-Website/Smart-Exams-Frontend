import React, { useState } from 'react';
import _axios from '../../../apis/axios-instance';
import { connect } from 'react-redux';
import { actionTypes } from '../../../redux/actionTypes';
const Forgotpassword = (props) => {
    const [email, setEmail] = useState(null)

    const sendLinkHandler = (event) => {
        event.preventDefault()
        const data = {
            email: email
        }

        props.saveEmail(email)
        localStorage.setItem("email",email)
        console.log(data)
        _axios.post("/auth/forgotPassword", data).then((response) => {
            console.log(response)
            


        }).catch((error) => {
            console.log(error)

        })
    }
    return (

        <div className="card m-5 ">

            <div className="card-header">
                Forgot Password
            </div>

            <div className="card-body">
                <form className=" m-3">
                    <div>
                        <div className='text-center'>
                            <label >We'll send you a link via email to reset password</label>

                        </div>
                        <div className='text-center'>
                            <label >Please type your email address</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                    </div>
                    <br />
                    <div className="mx-auto" style={{ width: 200 }} >
                        <button className="btn btn-primary mx-auto" onClick={sendLinkHandler} style={{ width: 200 }}>Send Link</button>

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
    return {
        saveEmail: (email) => { return dispatch({ type: actionTypes.ADD_EMAIL, email: email  }) }

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);

