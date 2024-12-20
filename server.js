const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5500', // or whatever port your live server is using
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true
}));

// Middleware
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

// Contact form endpoint with CORS headers
app.post('/api/contact', async (req, res) => {
    // Add CORS headers
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');

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
        
        console.log('Saving submission:', submission);
        
        await collection.insertOne(submission);
        
        console.log('Successfully saved to database!');
        
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

// Handle OPTIONS requests
app.options('/api/contact', cors());

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 