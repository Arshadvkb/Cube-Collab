import { create } from 'zustand';
import axios from 'axios';

// Ensure backend URL is centralized
const API_URL = 'http://localhost:5000/api';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Action to login user
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { user, token } = response.data;

      // Store token in local storage (or secure cookie depending on your setup)
      localStorage.setItem('token', token);

      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.msg || error.response?.data?.message || 'Request failed',
        isLoading: false
      });
    }
  },

  // Action to register user
  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, credentials);
      const { user, token } = response.data;

      localStorage.setItem('token', token);

      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.msg || error.response?.data?.message || 'Registration failed',
        isLoading: false
      });
    }
  },

  // Action to logout user
  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      isAuthenticated: false
    });
  },

  // Actions for email verification flow
  sendVerificationEmail: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/send-verification-email/${userId}`);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.msg || error.response?.data?.message || 'Failed to send verification email',
        isLoading: false
      });
      throw error;
    }
  },

  verifyEmail: async (email, otp) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, { email, otp });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.msg || error.response?.data?.message || 'Invalid OTP',
        isLoading: false
      });
      throw error;
    }
  },

  // Actions for forgot password flow
  sendResetOtp: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/send-reset-password-otp`, { email });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.msg || error.response?.data?.message || 'Failed to send OTP',
        isLoading: false
      });
      throw error;
    }
  },

  verifyResetOtp: async (email, otp) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-password-reset-otp`, { email, otp });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.msg || error.response?.data?.message || 'Invalid OTP',
        isLoading: false
      });
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.msg || error.response?.data?.message || 'Failed to reset password',
        isLoading: false
      });
      throw error;
    }
  },

  // Action to update user profile
  updateProfile: async (id, formData) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/user/update-profile/${id}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });
      
      set((state) => ({
        user: { ...state.user, ...response.data.user },
        isLoading: false
      }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.msg || error.response?.data?.message || 'Failed to update profile',
        isLoading: false
      });
      throw error;
    }
  },

  // Action to check current auth status (e.g., on app load)
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }
}));
