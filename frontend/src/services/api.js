import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// adding a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  // Auth
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),

  // Tests
  getAvailableTests: () => api.get('/tests/available'),
  startTest: (testId) => api.post(`/tests/${testId}/start`),
  submitTest: (testId, answers) => api.post(`/tests/${testId}/submit`, { answers }),
  getTestResults: () => api.get('/tests/results'),
  getDetailedResult: (submissionId) => api.get(`/tests/results/${submissionId}`),

  // Admin
  createTest: (testData) => api.post('/tests', testData),
  getAllTests: () => api.get('/tests'),
  updateTest: (testId, testData) => api.put(`/tests/${testId}`, testData),
  deleteTest: (testId) => api.delete(`/tests/${testId}`),
  getTestAnalytics: (testId) => api.get(`/tests/${testId}/analytics`),
  getOverallAnalytics: () => api.get('/tests/overall-analytics'),
};