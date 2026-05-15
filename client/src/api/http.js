import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://binary-automates-api.onrender.com'
  timeout: 15000
});

export default http;
