const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5501;

sgMail.setApiKey('YOUR APIKEY');

app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    const { targetEmail, subject, text } = req.body;

    const msg = {
        to: targetEmail,
        from: 'YOUR GMAIL ADDRESS',
        subject: subject,
        html: text,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
