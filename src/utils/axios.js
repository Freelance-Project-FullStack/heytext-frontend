import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_URL || 'http://localhost:5000/api';
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 12000
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/xml',
  //     Accept: 'application/json'
  //   }
});

export default axiosInstance;
