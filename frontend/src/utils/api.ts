// API configuration utility
console.log('Environment variables:', process.env);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
console.log('Final API_BASE_URL:', API_BASE_URL);

export const api = {
  baseURL: API_BASE_URL,
  
  // Helper function to get full API URL
  getUrl: (endpoint: string) => {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
};

export default api;
