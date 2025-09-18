// API configuration utility
const getApiBaseUrl = () => {
  // Check if we're running on Vercel
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    // On Vercel, use the current domain for API calls
    return `${window.location.origin}/api/v1`;
  }
  
  // For local development, use localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

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
