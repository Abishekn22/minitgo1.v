const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios=require("axios")

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
app.get('/validate-phone', async (req, res) => {
    const { phone } = req.query;
    console.log(req.query);
    // const phone =6371255610
    const apiKey = 'mk4lOodP2Byatm9gbqYnqFubzMQU6ImE';
    const apiUrl = `https://www.ipqualityscore.com/api/json/phone/${apiKey}/+91${phone}`;
  
    try {
    //   console.log(`Requesting phone validation for: ${apiUrl}`);
      const response = await axios.get(apiUrl);
      console.log("response",response);
      
      res.json(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error validating  number:', error.message);
      console.error('Error response data:', error.response ? error.response.data : 'No response data');
      res.status(500).json({ error: 'Failed to validate phone number', details: error.message });
    }
  });
  
  

  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
