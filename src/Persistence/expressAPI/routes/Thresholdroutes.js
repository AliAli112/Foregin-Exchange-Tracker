const con = require('../../database/config')
const express = require("express");

const thresholdrouter = express.Router()

thresholdrouter
    .route('/')
    .get(getAllConditions)
    .post(addCondition)

thresholdrouter
    .route('/try')
    .get(getAllConditions)

//format = {user: '{user}', condition: $, base: $, sub: $}
async function getAllConditions(req, res){
    con.query('SELECT * FROM threshold', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(result.length > 0) // sus
            return res.json(result);
        else res.json({});
    })
}

async function addCondition(req, res){
    try{
        console.log(req.body)
        const {cus_id, user, condition, base, sub } = req.body
        con.query(`INSERT INTO threshold (cus_id, user, conditions, base, sub) VALUES ('${cus_id}', '${user}', '${condition}', '${base}', '${sub}')`)
        console.log("Successfully added");
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
        console.log(err)
    }
}

module.exports = thresholdrouter;