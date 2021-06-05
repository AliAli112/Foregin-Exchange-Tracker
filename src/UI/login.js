import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import { UserController } from '../Application/UserController'
import { Spinner } from './conponents/spinner'

export const Login = () => {
    const [loading , setLoading] = useState(false)
    let history = useHistory()
    const controller = new UserController()
    controller.LogoutSession()
    

    async function handleSubmit(event){
        event.preventDefault()
        setLoading(true)
        const email = event.target.email.value
        const pass = event.target.pass.value
        var log
        //Authentification is done in UserController which assigns UserSession
        console.log(await controller.loginUser(email, pass))
        console.log(sessionStorage.getItem('user'))
        log = await controller.loginUser(email, pass)
        if(await controller.loginUser(email, pass)){
            setLoading(false)
            history.push('/') //route to 'compare'
        }else{
            console.log(await controller.loginUser(email, pass))
            setLoading(false)
        }
    }


    return( 
        <div>
            { loading ? <Spinner /> :
            <div className='main'>
                <div className='top-ctn'>
                    <div className='title'>
                        <h1>Sign In</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='input-field'>
                            <div className="field-label"><label>Email Name</label></div>
                            <div><input className="field" type='email' name='email' required/></div>
                        </div>
                        <div className='input-field'>
                            <div className="field-label"><label>Password Name</label></div>
                            <div><input className="field" type='text' name='pass' required/></div>
                        </div>
                        <div className="btn-container">
                            <input className="oth-btn" type='submit' value='Sign In'/>
                            <button className="oth-btn" onClick={() => history.push('/register')} >Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            }
        </div>
    )

}
export default Login