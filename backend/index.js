const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

connectToMongo(); // Connect to MongoDB database

require('dotenv').config();
const app = express();
const port = 5000;
app.use(bodyParser.json());


app.use(cors()); // Enable CORS

app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
