import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  seedSample: () => api.post('/projects/seed')
};

export const aiAPI = {
  chat: (prompt, conversationHistory = []) => api.post('/ai/chat', { 
    prompt, 
    conversationHistory 
  })
};

export default api;