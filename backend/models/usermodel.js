const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: { // replacaed by pic afterwards
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  phoneNumber: {
    type: String,
    required: true, 
  },
  city: {
    type: String,
    required: true, 
  },
  pincode: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: function() { return this.role === 'doctor'; }, // Required if role is doctor
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


userSchema.pre("save",async function(next){

  if(!this.isModified("password")){
next();
  }
this.password=await bcrypt.hash(this.password,15);
})

userSchema.methods.getJWTToken =function (){
  return jwt.sign({id : this._id,},process.env.JWT_SECRET,{
expiresIn:process.env.JWT_EXPIRE,
  });
};

//compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getresetPasswordtoken = async function() {
  // Generate a random token
  const resetToken = crypto.randomBytes(20).toString("hex");
  
  // Hash the token and set it to the resetPasswordToken field
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
  // Set the token expiry time to 15 minutes from now
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
  // Return the plain token for sending to the user
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
