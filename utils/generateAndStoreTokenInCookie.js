const generateAndStoreTokenInCookie = async (user, statusCode, res, msg="login successfully") => {

    const token = await user.jwtTokenGenerate();
     // options for cookie 
     let oneDay = 24*60*60*1000
     const options = {
        expires: new Date( Date.now() + process.env.COOKIE_EXPIRES_TIME * oneDay ),
        httpOnly: true
    }
    if( process.env.NODE_ENV === 'production' ){
        options.secure = true
    }
    return res.status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token: token,
        result:user,
        msg:msg
    });
}
module.exports = generateAndStoreTokenInCookie;