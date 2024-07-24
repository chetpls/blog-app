import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';
axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
