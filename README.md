# Main Sender API

## Introduction
The Main Sender API is designed to simplify the process of sending emails by integrating it into your project. It is a Node.js-based project that utilizes Node Mailer for email sending functionality.

### Features
- Easily integrate email sending functionality into your project.
- Customizable email templates.
- Support for sending emails to multiple recipients.
- Option to include attachments in emails.

## How to Use
To use the Main Sender API in your project, follow these steps:

1. Send a POST request to the API endpoint with the required data in the request body.

### API Endpoint
https://mail-sender-teo8.onrender.com/mail/send-mail

### Request Body Attributes
- `senderMail`: The email address of the sender.
- `senderMailPassword`: The password for the sender's email account.
- `receiverMails`: An array of email addresses of the recipients.
- `mailTemplate`: An object containing the email template information.
  - `from`: An object with the name and address of the sender.
  - `subject`: The subject of the email.
  - `html`: The HTML content of the email.
  - `attachments` (optional): An array of objects representing email attachments.
    - `filename`: The filename of the attachment.
    - `content`: The content of the attachment file in base64 encoding.

const res = await fetch("https://mail-sender-teo8.onrender.com/mail/send-mail", {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify(formdata)
});
