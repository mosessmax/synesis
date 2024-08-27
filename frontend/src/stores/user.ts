import { defineStore } from 'pinia';
import api from '@/services/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.user,
  },
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    async login(matricNumber, email, password) {
      try {
        const response = await api.auth.login(matricNumber, email, password);
        this.setToken(response.data.token);
        this.setUser(response.data.user);
        return response.data;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async register(name, matricNumber, email, password) {
      try {
        const response = await api.auth.register(name, matricNumber, email, password);
        this.setToken(response.data.token);
        this.setUser(response.data.user);
        return response.data;
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});