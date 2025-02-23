import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Cập nhật headers với token mới nhất trong mỗi yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token mới nhất từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Cập nhật header Authorization với token mới
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
