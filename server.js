const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('.')); 

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Test the connection
async function testConnection() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB!');
        
        // List all databases (just to test)
        const databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

testConnection();

// Add this route handler after your existing code but before app.listen
app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received form submission:', req.body); // Debug log
        
        await client.connect();
        const collection = client.db('portfolio').collection('contacts');
        
        const submission = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            date: new Date()
        };
        
        console.log('Trying to save:', submission); // Debug log
        
        await collection.insertOne(submission);
        console.log('Successfully saved to database!'); // Debug log
        
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error in /api/contact:', error); // Better error logging
        res.status(500).json({ message: 'Error sending message' });
    }
});

// Start server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
}); 