const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const transporter = require('./transporter')
const schedule = require('node-schedule');
var LocalStorage = require('node-localstorage').LocalStorage;
const { messageBuilderDaily, messageBuilderConditional } = require('./messageBuilder')
const axios = require('axios');
const server = axios.create()
const fixerAPI = require('../../fixerAPI/fixer')

var dailysublist
var rateslist
schedule.scheduleJob('0 0 * * *', async function(){
    //Function that will send daily emails at midnight
    //The 0 0 * * * stands for midnight

    var data2 
    try{
        //get all daily subscriptions from database and store in data2
        console.log("Controller get all dailys")
        let data = await server.get("http://localhost:5000/daily/try");
        console.log(data.data)
        if(data.status === 200){
            data2 = data.data
        }
    }catch(e){
        console.log(e)
    }
    dailysublist = data2//need to test

    rateslist = JSON.parse(localStorage.getItem('nodefixrates'))
    for(var i=0; i<dailysublist.length; i++){
        var email = JSON.parse(dailysublist[i].user).userEmail
        var name = JSON.parse(dailysublist[i].user).userFirstName +' '+JSON.parse(dailysublist[i].user).userLastName
        var base = dailysublist[i].base
        var sub = dailysublist[i].sub
        var exchangerate = rateslist.rates[dailysublist[i].sub]/rateslist.rates[dailysublist[i].base]
        const msg = messageBuilderDaily(email, name, base, exchangerate.toFixed(6) , sub)
        console.log(msg)
        sendEmail(msg)
    }

  });  


schedule.scheduleJob('0 */1 * * *', async function(){
    //function that updates the API data hourly on the hour
    //base on these updates the conditional emails are sent

    //storing old versions will make sure data is always their for the frontend to fetch
    let oldversion = localStorage.getItem('nodefixrates')
    console.log('secreat')

    var data3
    //if(!localStorage.getItem('nodefixrates')){
        try{
            //Update exchange rates from API
            console.log("Updating Exchange rates hourly...")
            let data = await server.get(fixerAPI.base + fixerAPI.key);
            //console.log(data.data)
            if(data.status === 200){
                data3 = data.data
            }
        }catch(e){
            console.log(e)
            localStorage.setItem('nodefixrates', oldversion);
        }
        console.log(data3.success, data3)
        if(data3.success){
            //store the new version
            console.log('storing...')
            localStorage.removeItem('nodefixrates')
            localStorage.setItem('nodefixrates', JSON.stringify(data3));
        }else{
            //use the old version
            localStorage.setItem('nodefixrates', oldversion);
        }
        
        
    //}

    //Sending conditional emails
    var data4
    var conditionalsubslist
        try{
            //get all conditional subscriptions from database and store in data4
            console.log("Controller get all cons2")
            let data = await server.get("http://localhost:5000/threshold/try");
            console.log(data.data)
            if(data.status === 200){
                data4 = data.data
            }
        }catch(e){
            console.log(e)
        }
        conditionalsubslist = data4

        rateslist = JSON.parse(localStorage.getItem('nodefixrates'))
        for(var i=0; i < conditionalsubslist.length; i++){
            var userEmail = JSON.parse(conditionalsubslist[i].user).userEmail
            var name = JSON.parse(conditionalsubslist[i].user).userFirstName +' '+ JSON.parse(conditionalsubslist[i].user).userLastName
            var base = JSON.parse(conditionalsubslist[i].base)
            var sub = JSON.parse(conditionalsubslist[i].sub)
            var condition = conditionalsubslist[i].conditions
            var exchangerate = rateslist.rates[sub.from]/rateslist.rates[base.from]
            console.log(exchangerate)
            
            if (condition === 'equal'){
                if(exchangerate === sub.con){
                    var msg1 = messageBuilderConditional(userEmail,name, base.from,
                    condition, sub.from, exchangerate.toFixed(6), sub.con)
                    console.log(msg1)
                    sendEmail(msg1);
                }
            }

            else if(condition === 'less than'){
                console.log(exchangerate < sub.con)
                if(exchangerate < sub.con){
                    var msg2 = messageBuilderConditional(userEmail, name, base.from,
                    condition, sub.from, exchangerate.toFixed(6), sub.con)
                    console.log(msg2)
                    sendEmail(msg2);
                }
            }

            else if(condition === 'greater than'){
                if(exchangerate > sub.con){
                    var msg3 = messageBuilderConditional(userEmail, name, base.from,
                    condition, sub.from, exchangerate.toFixed(6), sub.con)
                    console.log(msg3)
                    sendEmail(msg3);
                }
            }

        }


    

})

//this function uses the transporter to send emails
function sendEmail(msg){
    transporter.sendMail(msg, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

