const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// SMTP configuration
const smtpHost = 'smtpout.secureserver.net';
const smtpPort = 465;
const smtpUser = 'minitgo@minitgo.com';
const smtpPass = 'minitgo#24';

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: true, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take messages');
  }
});

// API endpoint to send email
app.post('/send-email', (req, res) => {
  const {from, to, subject, text } = req.body;

  const mailOptions = {
    from,
    to,
    subject,
    text,
  };
  console.log("mailOption",mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
