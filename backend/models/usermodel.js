const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["patient", "doctor"], // Specify valid roles
    default: "patient",
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"],
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Example for a 10-digit number
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  city: {
    type: String,
    required: [true, "Please enter your city"],
  },
  state: {
    type: String,
    required: [true, "Please enter your state"],
  },
  pincode: {
    type: String,
    required: [true, "Please enter your pincode"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10); // Adjusted salt rounds to 10 for security
});

// Generate JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate reset password token
userSchema.methods.getResetPasswordToken = function () {
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
