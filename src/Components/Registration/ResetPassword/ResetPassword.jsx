import React, { useState } from 'react';
import axios from 'axios';
import DomainUrl from '../../../apis/Domain';
const Resetpassword = (props) => {
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);


    const ResetHandler = (event) => {
        // this code pevents from going to another page
        event.preventDefault()

        if (password !== confirmPassword) {
            alert("Password Mismatch")
            return
        }
        
        var data = {
            password: password,
            email:"hazemali100@outlook.com",
            token:"nyF6TIDqT2w4deFNqprdZY9MjxttZIlzS1affhBTXNFSat9Axk4yCfLzQGP4cTJB"

        }
        axios.put(DomainUrl + "/auth/forgotPassword", data).then((response) => {
            console.log(response)

        }).catch((error) => {
            console.log(error)


        })


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

export default Resetpassword;
