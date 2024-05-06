const nodemailer = require("nodemailer");

// mail send function
async function sendMail(data){
    // 1. create email transporter [smtp]
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:data.senderMail,
            pass:data.senderMailPassword,
        }
    })

    // 2. configure email content
    // const mailOptions =data.mailTemplate;
    const mailOptions = {
        from: data.mailTemplate.from,
        to: data.mailTemplate.to,
        subject: data.mailTemplate.subject,
        html: data.mailTemplate.html,
        attachments: data.mailTemplate.attachments // Add attachments here
    };
    
    // 3. send mail
    try {
       const result= await transporter.sendMail(mailOptions);
       console.log(result)
       return result;
    } catch (error) {
        console.log(user, pass);
        console.log("Email send failed with error.");
    }
}
module.exports={
    sendMail,
}