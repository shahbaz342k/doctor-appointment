require('dotenv').config();
const express = require('express');
const dbConnection = require('./config/db');
const customError = require('./middleware/customError');
const authRoutes = require('./routes/authRoutes');
const ErrorHandler = require('./utils/errorHandler');
const app = express()
const port = process.env.PORT || 6000;
const apiVersion = process.env.APIVersion;
// database connection
dbConnection();

// app.get('/', (req, res) => res.send('Hello World!'))
// json data parsing
app.use(express.json());
app.use(`/api/${apiVersion}/user`, authRoutes);


// handle unhandle routes 
app.all("*", (req, res, next) => {
    // console.log('hello unhandle routes');
    next( new ErrorHandler(`${req.originalUrl} route not found`, 404) );
});
// set middleware error handler
app.use(customError);


app.listen(port, () => console.log(`app is running on port: ${port}`))