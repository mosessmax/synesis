import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

// Centralized error handling
const handleApiError = async (request) => {
  try {
    return await request();
  } catch (error) {
    // Handle different types of errors here
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error(error.response.data);
    } else if (error.request) {
      // No response received
      console.error("No response received from server");
    } else {
      // Error setting up the request
      console.error("Error setting up the request");
    }
    throw error; // Rethrow after logging
  }
};

// API calls
const apiService = {
  auth: {
    login: (matricNumber, email, password) => handleApiError(() => api.post('/auth/login', { matricNumber, email, password })),
    register: (name, matricNumber, email, password) => handleApiError(() => api.post('/auth/register', { name, matricNumber, email, password })),
  },
  tests: {
    getAvailableTests: () => handleApiError(() => api.get('/tests/available')),
    startTest: (testId) => handleApiError(() => api.post(`/tests/${testId}/start`)),
    submitTest: (testId, answers) => handleApiError(() => api.post(`/tests/${testId}/submit`, { answers })),
    getTestResults: () => handleApiError(() => api.get('/tests/results')),
    getDetailedResult: (submissionId) => handleApiError(() => api.get(`/tests/results/${submissionId}`)),
  },
  admin: {
    createTest: (testData) => handleApiError(() => api.post('/tests', testData)),
    getAllTests: () => handleApiError(() => api.get('/tests')),
    updateTest: (testId, testData) => handleApiError(() => api.put(`/tests/${testId}`, testData)),
    deleteTest: (testId) => handleApiError(() => api.delete(`/tests/${testId}`)),
    getTestAnalytics: (testId) => handleApiError(() => api.get(`/tests/${testId}/analytics`)),
    getOverallAnalytics: () => handleApiError(() => api.get('/tests/overall-analytics')),
  },
};

export default apiService;