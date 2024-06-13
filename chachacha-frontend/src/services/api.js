import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api' // Update the port to match your backend
});

export default api;
