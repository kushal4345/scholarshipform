const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection URI (Replace with your MongoDB URI)
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}
connectToMongoDB();

// API Endpoint to Handle Form Submission
app.post('/submit', async (req, res) => {
    try {
        const { fullName, email, phone, referralCode, essay } = req.body;

        // Insert data into MongoDB
        const database = client.db('scholarshipDB'); // Replace with your database name
        const collection = database.collection('applications'); // Replace with your collection name

        const result = await collection.insertOne({
            fullName,
            email,
            phone,
            referralCode,
            essay,
            timestamp: new Date(),
        });

        res.status(201).json({ message: 'Application submitted successfully!', id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while submitting the application.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});