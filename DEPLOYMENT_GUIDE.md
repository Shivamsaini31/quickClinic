# QuickClinic Deployment Guide

## Vercel Deployment Setup

### ⚠️ IMPORTANT: If you're getting 404 errors, follow these steps:

1. **Delete your current Vercel deployment** and redeploy with the new configuration
2. **Make sure all environment variables are set** in Vercel dashboard
3. **Check the build logs** in Vercel dashboard for any errors

### 1. Environment Variables
You need to set the following environment variables in your Vercel dashboard:

#### Required Environment Variables:
```
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
SMPT_SERVICE=gmail
SMPT_MAIL=your_email@gmail.com
SMPT_PASSWORD=your_app_password
SESSION_SECRET=your_session_secret_key
NODE_ENV=production
```

#### Optional Environment Variables (if using these services):
```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 2. How to Set Environment Variables in Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the appropriate value
5. Make sure to set them for Production environment

### 3. Database Connection
- Make sure your MongoDB connection string is accessible from Vercel
- If using MongoDB Atlas, ensure your IP is whitelisted or use 0.0.0.0/0 for all IPs
- The connection string should look like: `mongodb+srv://username:password@cluster.mongodb.net/database_name`

### 4. CORS Configuration
The app is configured to work with Vercel domains. Update the CORS origins in `backend/app.ts` if you have a custom domain:
```typescript
origin: process.env.NODE_ENV === 'production' 
  ? ['https://your-domain.vercel.app', 'https://quickclinic.vercel.app'] 
  : '*',
```

### 5. Deployment Steps:
1. **Delete your current Vercel deployment** (if it exists)
2. Push your code to GitHub
3. Connect your repository to Vercel
4. Set the environment variables in Vercel dashboard
5. Deploy

### 6. Testing Your Deployment:
After deployment, test these endpoints:
- `https://your-app.vercel.app/api/health` - Should return "API is working!"
- `https://your-app.vercel.app/api/v1/users` - Should return your API response
- `https://your-app.vercel.app/` - Should show your React frontend

### 7. Important Notes:
- Socket.io functionality is disabled on Vercel (serverless functions don't support persistent connections)
- Database connections are handled per-request in serverless environment
- File uploads should be handled through cloud storage (AWS S3, Cloudinary, etc.)

### 7. Troubleshooting:
- Check Vercel function logs for any errors
- Ensure all environment variables are set correctly
- Verify database connectivity
- Check CORS settings if frontend can't connect to API

### 8. Build Configuration:
The project is configured to:
- Build the frontend React app to `frontend/build`
- Compile TypeScript backend to `backend/dist`
- Use the API handler at `api/index.ts` for serverless functions
