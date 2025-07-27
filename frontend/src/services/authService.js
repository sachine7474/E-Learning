import axios from 'axios';

const API_URL = '/api/auth';

// Create axios instance with default config
const authAPI = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
authAPI.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await authAPI.post('/register', userData);
    return response;
  },

  // Login user
  login: async (email, password) => {
    const response = await authAPI.post('/login', { email, password });
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await authAPI.get('/me');
    return response;
  },

  // Update user details
  updateDetails: async (userData) => {
    const response = await authAPI.put('/updatedetails', userData);
    return response;
  },

  // Update password
  updatePassword: async (passwordData) => {
    const response = await authAPI.put('/updatepassword', passwordData);
    return response;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await authAPI.post('/forgotpassword', { email });
    return response;
  },
};

export default authService;
