import api from './api';

const commentService = {
  // Get comments for a blog post
  getComments: async (blogId, page = 1, limit = 10) => {
    const response = await api.get(`/comments/${blogId}/comments`, {
      params: { page, limit },
    });
    return response.data;
  },

  // Add a comment to a blog post
  addComment: async (blogId, comment) => {
    const response = await api.post(`/comments/${blogId}/comments`, { comment });
    return response.data;
  },
};

export default commentService;
