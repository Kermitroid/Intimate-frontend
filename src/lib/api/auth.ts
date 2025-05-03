import axios from '../axios';

export const register = async (user: { username: string; email: string; password: string }) => {
  const res = await axios.post('/auth/register', user);
  return res.data;
};

export const login = async (credentials: { email: string; password: string }) => {
  const res = await axios.post('/auth/login', credentials);
  return res.data;
};
