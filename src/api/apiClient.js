// src/api/apiClient.js

import axios from 'axios';

// The base URL for your Flask backend.
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.access_token) {
        // We're sending form-data for profile updates, so content-type can vary.
        // Let Axios handle it for form-data, otherwise set to json.
        if (!(config.data instanceof FormData)) {
           config.headers['Content-Type'] = 'application/json';
        }
        config.headers['Authorization'] = `Bearer ${user.access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;