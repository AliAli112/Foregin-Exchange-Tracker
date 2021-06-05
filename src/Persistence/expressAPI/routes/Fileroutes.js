const con = require('../../database/config')
const express = require("express");
const nodemailer = require("nodemailer");
var fs = require('fs');

const filerouter = express.Router()

filerouter
    .route('/get')
    .get(getFile)

async function getFile(req, res){
    
        const path2 = '../../../public/nodefixrates'
        try {  
            var data = fs.readFileSync(path2, 'utf8'); 
            res.send(data.toString())   
        } catch(e) {
            console.log('Error:', e.stack);
        }
        
}

module.exports = filerouter