import React from 'react'
import { useHistory } from "react-router-dom";
import { UserController } from '../Application/UserController'

export const Register = () => {
    let history = useHistory();
    const controller = new UserController()
    controller.LogoutSession()

    function handleSubmit(event){
        event.preventDefault()
        const fname = event.target.fname.value;
        const lname = event.target.lname.value;
        const email = event.target.email.value;
        const pass = event.target.pass.value;
        controller.registerUser(fname,lname,email,pass)
        history.push('/login')
    }

    return (
        <div className='main'>
            <div className='top-ctn'>
                <div className='title'>
                    <h1>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='input-field'>
                        <div className="field-label"><label>First Name</label></div>
                        <div><input className="login-field" type='text' name='fname' required/></div>
                    </div>
                    <div className='input-field'>
                        <div className="field-label"><label>Last Name</label></div>
                        <div><input className="login-field" type='text' name='lname' required/></div>
                    </div>
                    <div className='input-field'>
                        <div className="field-label"><label>Email</label></div>
                        <div><input className="login-field" type='text' name='email' required/></div>
                    </div>
                    <div className='input-field'>
                        <div className="field-label"><label>Password</label></div>
                        <div><input className="login-field" type='text' name='pass' required/></div>
                    </div>
                    <div className="btn-container">
                        <input className="btn in" type='submit' value='Sign Up'/>
                        <button className="btn" onClick={() => history.push('/login')} >Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;