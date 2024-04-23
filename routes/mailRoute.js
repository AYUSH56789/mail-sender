const express=require('express');
const { handleEmailSending } = require('../controller/mailSenderController');
const mailRouter=express.Router();
mailRouter.post('/send-mail',handleEmailSending)
// mailRouter.post()


module.exports={
    mailRouter
}