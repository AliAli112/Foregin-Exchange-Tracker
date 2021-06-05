import React from 'react'
import axios from 'axios'

export async function Authentification(email, password){
    var server = axios.create()
    var user = {userFirstname: '', userLastname: '', userEmail: '', userPassword: ''}
    //This function assigns user session if credentials are correct
    let res = await server.post('http://localhost:5000/authenticate', {
        userEmail: email,
        userPassword: password
    }).then((res) => {
        if(res.data.length > 0){
            var user = res.data[0]
            const sessionuser = JSON.stringify({isloggedIn: true, user: user})
            sessionStorage.setItem('user', sessionuser)
            console.log(sessionStorage.getItem('user'))
            return true
        }else{
            var user = {}
            console.log(res)
            console.log("user password not correct")
            //they arent authenticated
            const sessionuser = JSON.stringify({isloggedIn: false , user: user})
            sessionStorage.setItem('user', sessionuser)
            console.log(sessionStorage.getItem('user'))
            alert('Authenticiation failed, Customer credentials are incorrect')
            return false
        }
    });
}

export default Authentification