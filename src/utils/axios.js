import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 12000
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/xml',
  //     Accept: 'application/json'
  //   }
});

export default axiosInstance;
