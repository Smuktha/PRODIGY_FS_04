// utils/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Your API base URL
});

export default api;
