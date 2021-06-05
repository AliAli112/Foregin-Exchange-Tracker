const con = require('../../database/config')
const express = require("express");
const { encrypt , decrypt } = require('../../crypto/crypto')
const userrouter = express.Router()

userrouter
    .route('/')
    .get(getAllUsers) 

userrouter
    .route('/register')
    .post(registerUser) 

userrouter
    .route("/login")
    .post(loginUser)

userrouter
    .route('/authenticate')
    .post(authenticateUser)


async function getAllUsers(req, res){
    con.query('SELECT * FROM users', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(true)
            return res.json(result);
        else res.json({});
    })
}

async function registerUser(req, res){
    try{
        const { userFirstName, userLastName, dailysNum, 
            userEmail, userPassword } = req.body
        const hash = JSON.stringify(encrypt(userPassword))
        console.log(hash)
        const sql = `INSERT INTO users (userFirstName, userLastName, dailysNum, userEmail, userPassword)
        VALUES ('${userFirstName}', '${userLastName}', '${dailysNum}',
            '${userEmail}', '${hash}')`
        con.query(sql);
        console.log(req.body)
        console.log("Successfully added");
    }catch(err){
        console.log(err) 
    }
}

async function loginUser(req, res){
    try{
        console.log(req.body)
        const { userEmail } = req.body
        console.log(userEmail)
        con.query('SELECT * FROM users WHERE userEmail = ?',
         [userEmail], (err, result) => {
             if(err){
                 console.log('not in database')
                 res.send({err})
             }
             if(result.length > 0){
                console.log("user found");
                 return res.json(result)
             }else{
                 return res.json({})
             }
         } );
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}

async function authenticateUser(req, res){
    try{
        console.log(req.body)
        const { userEmail, userPassword } = req.body
        console.log(userEmail, userPassword)
        const hash = JSON.stringify(encrypt(userPassword))
        console.log(hash)
        con.query('SELECT * FROM users WHERE userEmail = ? AND userPassword = ?',
         [userEmail , hash], (err, result) => {
             if(err){
                 console.log('not in database')
                 res.send({err})
             }
             if(result.length > 0){
                console.log("user found auth");
                 return res.json(result)
             }else{
                 return res.json({})
             }
         } );
    }catch(e){
        console.log(e)
    }
}


module.exports = userrouter;