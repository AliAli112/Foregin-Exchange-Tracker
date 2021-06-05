const express = require("express");
const app = express();
const cors = require("cors");
const userrouter = require('./routes/Userroutes')
const dailysrouter = require('./routes/Dailyroutes')
const thresholdrouter = require('./routes/Thresholdroutes')
const filerouter = require('./routes/Fileroutes')
const axios = require('axios');
const server = axios.create()
const fixerAPI = require('../fixerAPI/fixer')
const emailservice = require('./emailservice/emailservice')
const schedule = require('node-schedule');




app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}));


app.use(userrouter)
app.use('/daily', dailysrouter)
app.use('/threshold', thresholdrouter)
app.use('/file', filerouter)

//custom methods
app.on('listening', async function getAllDailySubs(){
        console.log("Checking if exchange rates are in local storage")
        
        //This function runs as soon as the server starts
        //It gets the rates and store them in localstorage in the public directory
        //If it already exist in the local storage it is by passed
        
        
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('../../../public');
 
            
            var data3 
            if(!localStorage.getItem('nodefixrates')){
                console.log('Getting initial exchange rates')
                try{
                    console.log("Controller get all fixer")
                    let data = await server.get(fixerAPI.base + fixerAPI.key);
                    //console.log(data.data)
                    if(data.status === 200){
                        data3 = data.data
                    }
                }catch(e){
                    console.log(e)
                }
                if(data3.success){
                    localStorage.setItem('nodefixrates', JSON.stringify(data3));
                    console.log(localStorage.getItem('nodefixrates'));
                }
                console.log(localStorage.getItem('nodefixrates'))
                console.log(data3)
            }
            
            
        }
           
        
})
        


module.exports = app