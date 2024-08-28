const User = require('../models/usermodel');
const Apifeatures = require('../utils/apifeatures');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendemail');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role, phoneNumber, city, pincode, specialty } = req.body;

  // Validate role to ensure specialty is required if the role is 'doctor'
  if (role === 'doctor' && !specialty) {
    return res.status(400).json({
      success: false,
      message: "Specialty is required for doctors.",
    });
  }

  // Create user based on provided details
  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
      phoneNumber,
      city,
      pincode,
      specialty: role === 'doctor' ? specialty : undefined, // Include specialty only if role is 'doctor'
    });

    sendToken(user, 201, res);
  } catch (error) {
    // Check if the error is a Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    } else {
      // Handle other types of errors
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
});


  exports.loginuser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

     
    if (!email || !password) {
        return next(new ErrorHander("Please enter email and password", 400));
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email", 401));
    }

    // Check if the password matches
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid password", 401));
    }
    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      
  };
  
    // Generate JWT token
    sendToken(user,200,res);
});
exports.checkAuthStatus = catchAsyncErrors(async (req, res, next) => {
  // Check if the session exists
  console.log(req.session.user);
  if (!req.session.user) {
      return ;
  }

  // Return the session data (user details)
  res.status(200).json({
      success: true,
      user: req.session.user,
  });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()), // Expire immediately
        httpOnly: true, // Ensuring the cookie is not accessible via JavaScript
    });
    req.session.destroy((err) => {
      if (err) {
          return next(new ErrorHander("Failed to log out", 500));
      }

      res.status(200).json({
          success: true,
          message: "Logged out successfully",
      });
  });
    
});
exports.forgetpassword = catchAsyncErrors(async (req, res, next) => {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
  
    // If the user does not exist, return an error
    if (!user) {
      return next(new ErrorHander("Don't have an ID with this email", 404));
    }
  
    // Generate a reset password token
    const resetToken = await user.getresetPasswordtoken(); // Call the method to generate a token
    await user.save({ validateBeforeSave: false }); // Save the user with the new token
  
    // Construct the reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  
    // Message to be sent in the email
    const message = `Your password reset link is: \n\n ${resetPasswordUrl} \n\n If you did not request this email, please ignore it.`;
  
    try {
      // Send the email with the reset link
      await sendEmail({
        email: user.email,
        subject: "E-commerce Password Recovery",
        message
      });
  
      // Respond with success
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`
      });
    } catch (error) {
      // If email sending fails, clear the reset token and expiration
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      // Save the user without validation
      await user.save({ validateBeforeSave: false });
  
      // Return an error response
      return next(new ErrorHander("Failed to send email. Please try again later.", 500));
    }
  });
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
 const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest(hex);
const user=await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{
        $gt:Date.now()
    }
   

});
if(!user){
       return next(new ErrorHander("reset password token is invalid",400)); 
}
if(req.body.password!=req.body.confirmpassword){
    return next(new ErrorHander("reset password and cofirm password do not match",400)); 
}
user.password=req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;
await user.save();
sendToken(user,200,res);

  });
  exports.getuserdetail =catchAsyncErrors(async(req,res,next)=>{

const user=req.user;
res.status(200).json({
  success:true,
  user,
});

  });
  exports.checkuser = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
  
    try {
      // Use an object with the email field to find the user
      const user = await User.findOne({ email: email });
  
      if (user) {
        res.status(200).json({
          success: true,
          user,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      // Handle any potential errors
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
  
  exports.updatepassword=catchAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldpassword);
    if(!isPasswordMatched){
      return next(new ErrorHander("old password is not correct",404));
    }
    if(req.body.newpassword!=req.body.confirmpassword){
      return next(new ErrorHander("reset password and cofirm password do not match",400)); 
  }
  user.password=req.body.newpassword;
  await user.save();
  res.status(200).json({
success:true,
user,

  });


  });

  exports.updateprofile=catchAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.params.id);
    
    
    
  user.name=req.body.name;
  user.email=req.body.email;
  await user.save({ validateBeforeSave: true });
  res.status(200).json({
success:true,
user,

  });


  });
  exports.getAllUser= catchAsyncErrors(async (req, res, next) => {
const users = await User.find();
res. status (200). json({
success: true, users,}
);
}) ;

exports.getsingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
  return next (new ErrorHander (`User does not exist with Id: ${req-params.id}`))
}
  res.status(200).json( {
    success :true,
     user,}
     );



});
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  // Find the user by their ID
  const user = await User.findById(req.params.id);

  // If the user doesn't exist, return an error
  if (!user) {
      return next(new ErrorHander("User not found", 404));
  }

  // Delete the user
  await user.remove();

  // Respond with success
  res.status(200).json({
      success: true,
      message: "User deleted successfully"
  });
});
