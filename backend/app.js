const express=require("express");
const app=express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Errormiddleware=require("./middleware/error");
const session = require('express-session');
const bodyParser = require('body-parser');
app.use(express.json())


const user=require("./routes/userroute");
const patient=require("./routes/patientroute");
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(bodyParser.json()); // To parse JSON data
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
}));
app.use(cookieParser());
// Example for Express.js server
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });
  
// Use session middleware
app.use(session({
    secret: '2ub2bf9242hcbnubcwcwshbccianci',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
}));

app.use("/api/v1",patient);
app.use("/api/v1",user);
app.use(Errormiddleware);
module.exports=app;