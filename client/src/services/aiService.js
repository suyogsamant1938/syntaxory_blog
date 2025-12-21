import api from './api';

const aiService = {
  // Generate blog content using AI
  generateBlog: async (topic, style = 'technical') => {
    const response = await api.post('/ai/generate', { topic, style });
    return response.data;
  },
};

export default aiService;
