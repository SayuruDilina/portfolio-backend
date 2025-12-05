
const express = require('express');
require("dotenv").config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.post('/send-email', async (req, res) => {
    const { from, subject, text } = req.body;


   let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,        
    secure: false,       
    auth: {
        user: process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
});

    let mailOptions = {
        from: from,
        to: process.env.SMTP_USER,
        subject: `from email:${from}`,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
