import api from './api';

const likeService = {
  // Like a blog post
  likeBlog: async (blogId) => {
    const response = await api.post(`/likes/${blogId}/like`);
    return response.data;
  },

  // Unlike a blog post
  unlikeBlog: async (blogId) => {
    const response = await api.delete(`/likes/${blogId}/like`);
    return response.data;
  },

  // Get likes count for a blog
  getLikesCount: async (blogId) => {
    const response = await api.get(`/likes/${blogId}/likes`);
    return response.data;
  },
};

export default likeService;
