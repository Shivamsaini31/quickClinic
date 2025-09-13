import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css';

// src/index.tsx
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { AuthProvider } from './component/auth/AuthContext';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the app using the new root API
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
