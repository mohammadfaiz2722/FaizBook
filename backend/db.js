require('dotenv').config();
const mongoose = require('mongoose');

// console.log('Loaded MONGO_URI:', process.env.REACT_APP_API_URL); // Add this line for debugging

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};

module.exports = connectToMongo;
