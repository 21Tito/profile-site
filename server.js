const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Test database connection
async function testConnection() {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

testConnection();

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('Received form submission:', req.body); // Debug log

    try {
        await client.connect();
        const collection = client.db('portfolio').collection('contacts');
        
        const submission = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            date: new Date()
        };
        
        console.log('Saving submission:', submission); // Debug log
        
        await collection.insertOne(submission);
        
        console.log('Successfully saved to database!'); // Debug log
        
        res.status(200).json({ 
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

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 