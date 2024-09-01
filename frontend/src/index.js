// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
// src/index.js
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { AuthProvider } from './component/auth/AuthContext'; // Adjust the import path if needed

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using the new root API
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);

