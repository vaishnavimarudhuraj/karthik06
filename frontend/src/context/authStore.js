import { create } from 'zustand';
import { authAPI } from '../utils/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('authToken'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      set({ user, token, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register(data);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      set({ user, token, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ user: null, token: null, error: null });
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.updateProfile(data);
      set({ user: response.data.user, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Update failed', isLoading: false });
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await authAPI.getCurrentUser();
      set({ user: response.data.user });
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('authToken');
      set({ user: null, token: null });
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
