const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Allow all origins (for development only)
app.use(cors({ origin: '*' }));

// Middleware
app.use(bodyParser.json());
app.use(express.static('.'));

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('Received form submission:', req.body);

    try {
        await client.connect();
        const collection = client.db('portfolio').collection('contacts');
        
        const submission = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            date: new Date()
        };
        
        await collection.insertOne(submission);
        console.log('Successfully saved to database!');
        
        res.json({ 
            success: true,
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error sending message' 
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 