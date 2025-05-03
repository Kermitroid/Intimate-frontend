import axios from '../axios';

export const uploadVideo = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post('/videos', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};export const getAllVideos = async () => {
  const res = await axios.get('/videos');
  return res.data;
};export const getVideoById = async (id: string) => {
  const res = await axios.get(`/videos/${id}`);
  return res.data;
};