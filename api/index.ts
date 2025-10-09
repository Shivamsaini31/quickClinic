import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import user from '../backend/routes/user.routes';
import patient from '../backend/routes/patient.routes';
import doctor from '../backend/routes/doctor.routes';
import message from '../backend/routes/message.routes';
import notification from '../backend/routes/notification.routes';
import payment from '../backend/routes/payment.routes';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// CORS setup
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.vercel.app', 'https://quickclinic.vercel.app'] 
      : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(cookieParser());

// Routes
app.use('/api/v1', patient);
app.use('/api/v1', user);
app.use('/api/v1', doctor);
app.use('/api/v1', message);
app.use('/api/v1', notification);
app.use('/api/v1', payment);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle the request with the Express app
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}
