const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        default:'https://gravatar.com/avatar/7b3789a68de2b058c9e746556fa8b61e?s=200&d=retro&r=pg'
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

// user password encription
UserSchema.pre('save', async function(next){

    // if password modified
    if( !this.isModified('password') ){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();

});

// compare user password with hash password on login 
UserSchema.methods.comparePassword = async function(userPassword){
    console.log("compare password", userPassword);
    return await bcrypt.compare(userPassword, this.password);
}

UserSchema.methods.jwtTokenGenerate = async function(){

    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email
    }
    const options = {expiresIn: process.env.JWTExpireTime}
    const key = process.env.JWT_SECRET_KEY;
    const token = await jwt.sign(payload, key, options);
    return token;
}



const User = mongoose.model('user',UserSchema);
module.exports = User;