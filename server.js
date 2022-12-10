require('dotenv').config();
const express = require('express');
const dbConnection = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const app = express()
const port = process.env.PORT || 6000;
const apiVersion = process.env.APIVersion;
// database connection
dbConnection();

// app.get('/', (req, res) => res.send('Hello World!'))
// json data parsing
app.use(express.json());

app.use(`/api/${apiVersion}/user`, authRoutes);

app.listen(port, () => console.log(`app is running on port: ${port}`))