import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const useCollaboratorStore = create((set, get) => ({
  collaborators: [],
  isLoading: false,
  error: null,

  addCollaborator: async (documentId, email, role = 'editor') => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/collaborator/add/${documentId}`,
        { email, role },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh collaborators after adding
      await get().fetchCollaborators(documentId);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        'Failed to add collaborator';
      set({
        error: errorMsg,
        isLoading: false,
      });
      throw error;
    }
  },

  fetchCollaborators: async (documentId) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/collaborator/view/${documentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({
        collaborators: response.data.collaborators || [],
        isLoading: false,
      });
      return response.data.collaborators;
    } catch (error) {
      set({
        error:
          error.response?.data?.msg ||
          error.response?.data?.message ||
          'Failed to fetch collaborators',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  clearCollaborators: () => {
    set({ collaborators: [] });
  },
}));
