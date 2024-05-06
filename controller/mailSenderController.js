const { sendMail } = require("../service/mailSenderService");
const fs = require('fs');

// Function to write log data to a custom JSON file
function writeToCustomLogFile(data) {
    const logFilePath = 'email-log.json';

    // Initialize log data as an empty array
    let logData = [];

    // Check if the log file exists
    fs.access(logFilePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // Read existing log data if the file exists
            try {
                const existingLogData = fs.readFileSync(logFilePath, 'utf8');
                if (existingLogData) {
                    logData = JSON.parse(existingLogData);
                }
            } catch (readErr) {
                console.error('Error reading custom email log file:', readErr);
            }
        }

        // Append new data to the log array
        logData.push({
            senderMail: data.senderMail,
            receiverMails: data.mailTemplate.to,
            subject: data.mailTemplate.subject,
            timestamp: new Date().toISOString() // Add a timestamp for reference
        });

        // Write the updated log array back to the file
        fs.writeFile(logFilePath, JSON.stringify(logData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to custom email log file:', writeErr);
            }
        });
    });
}

handleEmailSending = (req, res) => {
    // global data
    let data = req.body;
    // Append options to include custom log file path
    data = {
        ...data,
        "options": {
            "logPath": "custom-email-log.json",
            "retryAttempts": 3,
            "retryDelay": 5000,
            "timeout": 30000
        }
    };

    // Add cc recipients to the mailTemplate object
    data.mailTemplate.to = data.receiverMails;
    
    console.log(data);

    // Log the email sending details to the custom log file
    writeToCustomLogFile(data);

    // Send email using mailSenderService
    sendMail(data)
        .then((resp) => res.status(200).json({success:true,message:"mail send successfully",acceptedMail:resp.accepted}))
        .catch((err) => res.status(500).json({success:false,message:"mail not send successfully",error:err.message}))
}

module.exports = {
    handleEmailSending,
};
