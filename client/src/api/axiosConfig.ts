// src/api/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Thay đổi URL này cho phù hợp với API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
