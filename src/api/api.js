import axios from 'axios';

const api = axios.create({
  baseURL: 'https://expense-tracker-9z0l.onrender.com/api',
});

export default api;
