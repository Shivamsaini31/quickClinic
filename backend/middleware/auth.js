const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User=require("../models/usermodel");
const error = require("./error");
 exports.isauthenticateuser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return next(new ErrorHander( "Authentication token is missing" ));
    }
    console.log(token);
    // You can add logic here to verify the token, e.g., using JWT
    // If verification passes, call next() to proceed to the next middleware
    // If verification fails, return an error response
const decodedata=jwt.verify(token,process.env.JWT_SECRET);
req.user=await User.findById(decodedata.id);
   next();
});
exports.authorizeroles=(...roles)=>{
return (res,req,next)=>{
if(!roles.includes(req.user.role)){
    new ErrorHander(`Role: ${req.user.role} is not allowed to use this resource `);
}
next();
}
;

}

