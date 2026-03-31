import axios from 'axios';
import { clearTokens, getAccessToken } from '../utils/auth';

const getApiUrl = (): string => import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: getApiUrl(),
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    // ✅ Token
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Content-Type handling
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      delete config.headers['content-type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 403) {
      console.warn('Token expired');
      clearTokens();
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default api;
