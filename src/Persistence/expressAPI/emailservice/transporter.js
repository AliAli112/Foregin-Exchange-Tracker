const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testemail@gmail.com',
        pass: ''
    }
})

module.exports = transporter