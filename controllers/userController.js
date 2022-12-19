const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const generateAndStoreTokenInCookie = require("../utils/generateAndStoreTokenInCookie");

const create = async (req, res, next) => {

    const body = req.body;
    console.log(body);
    const user = new User(body);
    try {
        let userdata  = await user.save();
        return res.status(201).json({
            success:true,
            data:userdata,
        })
    } catch (err) {
        return res.status(400).json({
            success:false,
            error:err
        })
    }
}

// login 
const login = async (req, res, next) => {

    const {email, password} = req.body;

    if (!email & !password) {
        return next(new ErrorHandler("Email and Password cannot be empty", 400))
    } else if (!email) {
        return next(new ErrorHandler("Email cannot be empty", 400))
    } else if (!password) {
        return next(new ErrorHandler("Password cannot be empty", 400))
    }
    
    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 401))
        }
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Password", 401));
        }else{
            // generate token and store in cookie
            generateAndStoreTokenInCookie(user,200,res);

            // const token = await user.jwtTokenGenerate();
            // // send response
            // res.status(200).json({
            //     success:true,
            //     token:token,
            //     msg: 'login successful!'
            // });
        }
        
    } catch (err) {
        return res.status(400).json({
            success:false,
            error:err
        })
    }
}

const testing = async (req, res, next) => {


    try {
        
        return res.status(400).json({
            success:true,
            data:'hello testing',
        })
    } catch (err) {
        return res.status(400).json({
            success:false,
            error:err
        })
    }
}
module.exports = {
    create,
    testing,
    login,
}