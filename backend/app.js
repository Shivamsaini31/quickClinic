const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Errormiddleware = require("./middleware/error");
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(bodyParser.json()); // To parse JSON data

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true,
}));
app.use(cookieParser());

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

// Define your routes
const user = require("./routes/userroute");
const patient = require("./routes/patientroute");
const doctor = require("./routes/doctorroute");

app.use("/api/v1", patient);
app.use("/api/v1", user);
app.use("/api/v1", doctor);

// Error handling middleware
app.use(Errormiddleware);

module.exports = app;
