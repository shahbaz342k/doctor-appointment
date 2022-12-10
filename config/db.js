const mongoose = require('mongoose');
const DB = process.env.DBURL;
// console.log('db: ', DB)
const dbConnection = async() => {

    mongoose.connect(DB, {})
    .then( (con) => {
        console.log(`Database connected with host: ${con.connection.host} on port: ${con.connection.port}`);
    })
    .catch((err) => {
        console.log(`Database connection error: ${err}`);
    })
}
module.exports = dbConnection;