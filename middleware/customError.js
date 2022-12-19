const ErrorHandler = require("../utils/errorHandler")

module.exports = (err,req, res, next) => {

    // set the error handler
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error';
    console.log(err.message)

    // const message = Object.values(err.errors).map( (val) => val.message );
    let error = new ErrorHandler(err.message , 400);

    return res.status(err.statusCode).json({
        sucess: false,
        error: error,
        errMessage: error.message,
        stack: err.stack
    })
}