// src/lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-api-base-url.com',
  withCredentials: true,
});

export default instance;
