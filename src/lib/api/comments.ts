import axios from '../axios';

export const getCommentsByVideoId = async (videoId: string) => {
  const res = await axios.get(`/comments/video/${videoId}`);
  return res.data;
};

export const postComment = async (videoId: string, content: string) => {
  const res = await axios.post(`/comments/video/${videoId}`, { content });
  return res.data;
};export const likeComment = async (commentId: string) => {
  const res = await axios.post(`/comments/${commentId}/like`);
  return res.data;
};

export const unlikeComment = async (commentId: string) => {
  const res = await axios.post(`/comments/${commentId}/unlike`);
  return res.data;
};export const replyToComment = async (parentCommentId: string, content: string) => {
  const res = await axios.post(`/comments/${parentCommentId}/reply`, { content });
  return res.data;
};