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
        // Make a direct axios call to avoid interceptor redirect on 401
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'}/auth/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          set({
            user: data.user || null,
            loading: false,
            initialized: true,
          });
        } else {
          // 401 or other error - user not authenticated
          set({
            user: null,
            loading: false,
            initialized: true,
          });
        }
      } catch {
        // Network error or other issues
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
        // Use fetch to avoid axios interceptor issues
        const loginRes = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'}/auth/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) {
          const errorData = await loginRes.json();
          return {
            data: null,
            error: errorData || { message: 'Login failed' },
          };
        }

        // Get user data after successful login
        const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'}/auth/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          set({ user: userData.user });
          return { data: userData, error: null };
        } else {
          return {
            data: null,
            error: { message: 'Failed to get user data after login' },
          };
        }
      } catch (err) {
        return {
          data: null,
          error: { message: 'Login failed' },
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
