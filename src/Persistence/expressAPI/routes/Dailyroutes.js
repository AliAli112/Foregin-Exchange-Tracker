const con = require('../../database/config')
const express = require("express");

const dailysrouter = express.Router()

dailysrouter
    .route('/try')
    .get(getAllSubs) //get all the daily subscriptions made

dailysrouter
    .route('/')
    .post(addSub)


async function getAllSubs(req, res){
    console.log('here1')
    //format: {user: '{user}', base: $, sub: $}
    con.query('SELECT * FROM daily', (err, result) =>{
        console.log('here1')
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(true) // sus
            console.log('here2')
            return res.json(result);
        //else res.json({});
    })
}


async function addSub(req, res){
    try{
        console.log(req.body)
        const { cus_id, user, base, sub } = req.body
        con.query(`INSERT INTO daily (cus_id, user, base, sub) VALUES ('${cus_id}', '${user}', '${base}', '${sub}')`);
        console.log("Successfully daily added");
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
        console.log(err)
    }
    
}

module.exports = dailysrouter;