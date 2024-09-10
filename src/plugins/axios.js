// src/plugins/axios.js
import axios from 'axios';
import router from '../router';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust if your backend is hosted elsewhere
});

// Add a request interceptor to include the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle unauthorized responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Token might be invalid or expired
      localStorage.removeItem('authToken');
      router.push('/admin/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
