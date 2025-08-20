import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { supabase } from '../utils/supabase';
import api from '../utils/api';

const useAuthStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    user: null,
    session: null,
    loading: true,
    initialized: false,

    // Actions
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),
    setLoading: (loading) => set({ loading }),
    setInitialized: (initialized) => set({ initialized }),

    // Initialize auth
    initialize: async () => {
      if (get().initialized) return;
      
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!error && session) {
          set({
            session,
            user: session.user,
            loading: false,
            initialized: true
          });
          
          // Store tokens
          localStorage.setItem('access_token', session.access_token);
          localStorage.setItem('refresh_token', session.refresh_token);
        } else {
          set({
            session: null,
            user: null,
            loading: false,
            initialized: true
          });
        }

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
          set({
            session,
            user: session?.user ?? null,
            loading: false
          });

          if (session) {
            localStorage.setItem('access_token', session.access_token);
            localStorage.setItem('refresh_token', session.refresh_token);
          } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        });

      } catch (error) {
        console.error('Auth initialization error:', error);
        set({
          session: null,
          user: null,
          loading: false,
          initialized: true
        });
      }
    },

    // Sign up with email
    signUpWithEmail: async (email, password, firstName = '', lastName = '') => {
      try {
        const response = await api.post('/auth/signup', {
          email,
          password,
          firstName,
          lastName,
        });
        return { data: response.data, error: null };
      } catch (error) {
        return { 
          data: null, 
          error: error.response?.data || { message: 'Signup failed' } 
        };
      }
    },

    // Sign in with email
    signInWithEmail: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { session } = response.data || {};
      if (session?.access_token) {
        localStorage.setItem('access_token', session.access_token);
        localStorage.setItem('refresh_token', session.refresh_token);
        // Optionally set user/session in store
        set({ session, user: session.user });
      }
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data || { message: 'Login failed' },
      };
    }
  },
  
    // Sign in with Google
    signInWithGoogle: async () => {
      try {
        const response = await api.post('/auth/google');
        // Redirect to Google OAuth URL
        window.location.href = response.data.url;
        return { data: response.data, error: null };
      } catch (error) {
        return { 
          data: null, 
          error: error.response?.data || { message: 'Google login failed' } 
        };
      }
    },

    // Sign out
    signOut: async () => {
      try {
        await api.post('/auth/signout');
        await supabase.auth.signOut();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        set({
          user: null,
          session: null
        });
        
        return { error: null };
      } catch (error) {
        return { 
          error: error.response?.data || { message: 'Logout failed' } 
        };
      }
    },

    // Get current user from API
    getCurrentUser: async () => {
      try {
        const response = await api.get('/auth/user');
        set({ user: response.data.user });
        return { data: response.data, error: null };
      } catch (error) {
        return { 
          data: null, 
          error: error.response?.data || { message: 'Failed to get user' } 
        };
      }
    },

    // Refresh session
    refreshSession: async () => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return { error: { message: 'No refresh token' } };

      try {
        const response = await api.post('/auth/refresh', {
          refresh_token: refreshToken,
        });
        
        const { session } = response.data;
        localStorage.setItem('access_token', session.access_token);
        localStorage.setItem('refresh_token', session.refresh_token);
        
        set({
          session,
          user: session.user
        });
        
        return { data: response.data, error: null };
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ user: null, session: null });
        
        return { 
          data: null, 
          error: error.response?.data || { message: 'Token refresh failed' } 
        };
      }
    }
  }))
);

export default useAuthStore;