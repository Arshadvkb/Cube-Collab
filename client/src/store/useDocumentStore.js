import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useDocumentStore = create((set, get) => ({
  documents: [],
  currentDocument: null,
  isLoading: false,
  error: null,

  fetchDocuments: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/document/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        documents: response.data.documents || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.msg ||
          error.response?.data?.message ||
          'Failed to fetch documents',
        isLoading: false,
      });
    }
  },

  addDocument: async (documentData) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/document/add`,
        documentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh documents
      await get().fetchDocuments();
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.msg ||
          error.response?.data?.message ||
          'Failed to add document',
        isLoading: false,
      });
      throw error;
    }
  },

  updateDocument: async (id, documentData) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/document/update/${id}`,
        documentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh documents
      await get().fetchDocuments();
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.msg ||
          error.response?.data?.message ||
          'Failed to update document',
        isLoading: false,
      });
      throw error;
    }
  },

  getDocumentById: (id) => {
    const { documents } = get();
    return documents.find((doc) => doc._id === id);
  },
}));
