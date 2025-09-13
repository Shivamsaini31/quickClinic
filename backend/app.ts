import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Errormiddleware from './middleware/error';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express(); // Create Express app

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS setup
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Parse cookies
app.use(cookieParser());

// Cross-Origin-Opener-Policy to prevent issues with security
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

// Use session middleware
app.use(
  session({
    secret: '2ub2bf9242hcbnubcwcwshbccianci', // Use a secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    },
  })
);

// Define your routes
import user from './routes/user.routes';
import patient from './routes/patient.routes';
import doctor from './routes/doctor.routes';
import message from './routes/message.routes';
import notification from './routes/notification.routes';
import payment from './routes/payment.routes';

app.use('/api/v1', patient);
app.use('/api/v1', user);
app.use('/api/v1', doctor);
app.use('/api/v1', message);
app.use('/api/v1', notification);
app.use('/api/v1', payment);

// Error handling middleware
app.use(Errormiddleware);

export default app;
