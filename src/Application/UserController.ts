import React from 'react'
import axios from 'axios'
import { Authentification as Authenticate } from '../Security/Auth'

export class UserController{

    private server;
    constructor(){
        this.server = axios.create()
    }

    public registerUser = async (fname: string, lname: string, email: string, pass: string) => {
        try{
            var user = {userFirstname: fname, userLastname: lname, userEmail: email, userPassword: pass}
            let res = await this.server.post('http://localhost:5000/register', {
            userFirstName: user.userFirstname,
            userLastName: user.userLastname,
            dailysNum: '0',
            userEmail: user.userEmail,
            userPassword: user.userPassword,
            }).then((res) =>{
                alert('You are now registered!')
                console.log(res)
            })
            }catch(err){
                console.log(err);
            }
    }

    public loginUser = async (email: string, pass: string) => {
        let res = await this.server.post('http://localhost:5000/login', {
            userEmail: email,
        }).then((res) => {
            console.log(res)
            if(res.data.length > 0){
                if(Authenticate(res.data[0].userEmail, pass)){
                    console.log('customer is authenticiation, session formed')
                }
            }else{
                console.log('authenticiation failed or customer email not correct')
                alert('Authenticiation failed, No such customer found')
                return false;
            }
        });
        console.log(sessionStorage.getItem('user'))
        return JSON.parse(sessionStorage.getItem('user') || '{}').isloggedIn
    }



    //User Session Oriented Functions
    //User Sessions are of the form {isloggedIn: true, user: user}
    public isLoggedin = () => {
        let user = JSON.parse(sessionStorage.getItem('user') || '{}')
        if(user.isloggedIn){
            return true
        }else{
            return false
        }
    }

    public getSessionUser = () => {
        return JSON.parse(sessionStorage.getItem('user') || '{}')
    }

    //New method add the class diagram
    public LogoutSession = () => {
        sessionStorage.removeItem('user')
    }

}
