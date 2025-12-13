const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'theoyeh@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD // Gmail App Password (not regular password)
    }
});

// CORS configuration - very permissive for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(express.static('.'));

// MongoDB connection
const uri = process.env.MONGODB_URI;
let client;
if (uri) {
    client = new MongoClient(uri);
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const submission = {
            name,
            email,
            message,
            date: new Date()
        };

        // Save to MongoDB if configured
        if (client) {
            try {
                await client.connect();
                const collection = client.db('portfolio').collection('contacts');
                await collection.insertOne(submission);
            } catch (dbError) {
                console.error('Database error (non-fatal):', dbError);
            }
        }

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER || 'theoyeh@gmail.com',
            to: 'theoyeh@gmail.com',
            subject: `Portfolio Contact: ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <hr>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><em>Reply to: ${email}</em></p>
            `,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending message. Please try emailing directly at theoyeh@gmail.com'
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 