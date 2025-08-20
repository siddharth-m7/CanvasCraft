// src/utils/api.js
import axios from 'axios';

// Use env var or fallback
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ always send cookies
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for handling 401s and refreshing session
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Ask backend to refresh cookies
        await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        // Retry original request
        return api.request(error.config);
      } catch (_e) {
        // Refresh failed → force logout
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
