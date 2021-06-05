const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testemail@gmail.com',
        pass: '4433225566'
    }
})

module.exports = function sendEmail(msg){
    transporter.sendMail(msg, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    })}