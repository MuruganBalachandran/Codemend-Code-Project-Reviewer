import axios from 'axios';

const baseURL =
  typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:5000';

const api = axios.create({ baseURL });

export default api;
