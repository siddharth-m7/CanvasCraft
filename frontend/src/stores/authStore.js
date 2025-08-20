import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import api from '../utils/api'; // axios/fetch wrapper, must have withCredentials=true

const useAuthStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    user: null,
    loading: true,
    initialized: false,

    // Actions
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setInitialized: (initialized) => set({ initialized }),

    // Initialize auth (check if logged in)
    initialize: async () => {
      if (get().initialized) return;
      set({ loading: true });

      try {
        // const res = await api.get('/auth/user', { withCredentials: true });
        set({
          user: res.data.user || null,
          loading: false,
          initialized: true,
        });
      } catch {
        set({
          user: null,
          loading: false,
          initialized: true,
        });
      }
    },

    // Sign up with email/password
    signUpWithEmail: async (email, password, firstName = '', lastName = '') => {
      try {
        const res = await api.post(
          '/auth/signup',
          { email, password, firstName, lastName },
          { withCredentials: true }
        );
        // user may not be logged in until email confirmed
        return { data: res.data, error: null };
      } catch (err) {
        return {
          data: null,
          error: err.response?.data || { message: 'Signup failed' },
        };
      }
    },

    // Sign in with email/password
    signInWithEmail: async (email, password) => {
      try {
        await api.post(
          '/auth/login',
          { email, password },
          { withCredentials: true }
        );
        // hydrate user after login
        const res = await api.get('/auth/user', { withCredentials: true });
        set({ user: res.data.user });
        return { data: res.data, error: null };
      } catch (err) {
        return {
          data: null,
          error: err.response?.data || { message: 'Login failed' },
        };
      }
    },

    // Start Google login (redirect)
    signInWithGoogle: async () => {
      try {
        const res = await api.post('/auth/google');
        if (res.data?.url) {
          window.location.href = res.data.url;
        }
        return { data: res.data, error: null };
      } catch (err) {
        return {
          data: null,
          error: err.response?.data || { message: 'Google login failed' },
        };
      }
    },

    // Sign out
    signOut: async () => {
      try {
        await api.post('/auth/signout', {}, { withCredentials: true });
        set({ user: null });
        return { error: null };
      } catch (err) {
        return {
          error: err.response?.data || { message: 'Logout failed' },
        };
      }
    },

    // Get current user (force refresh from backend)
    getCurrentUser: async () => {
      try {
        const res = await api.get('/auth/me', { withCredentials: true });
        set({ user: res.data.user || null });
        return { data: res.data, error: null };
      } catch (err) {
        set({ user: null });
        return {
          data: null,
          error: err.response?.data || { message: 'Failed to get user' },
        };
      }
    },

    // Refresh session (rotate cookies)
    refreshSession: async () => {
      try {
        await api.post('/auth/refresh', {}, { withCredentials: true });
        // optionally hydrate user again
        const res = await api.get('/auth/user', { withCredentials: true });
        set({ user: res.data.user || null });
        return { data: res.data, error: null };
      } catch (err) {
        set({ user: null });
        return {
          data: null,
          error: err.response?.data || { message: 'Token refresh failed' },
        };
      }
    },
  }))
);

export default useAuthStore;
