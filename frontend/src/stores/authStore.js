import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../utils/api";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

        //SIGNUP
      Signup: async (username, email, password) => {
        try {
          const res = await api.post("/auth/signup", { username, email, password });
          if (res.data?.user) {
            set({ user: res.data.user, isAuthenticated: true });
          }
        } catch (error) {
          console.error("Signup failed:", error.response?.data || error.message);
          throw error; // so components can show error messages
        }
      },   

      // LOGIN
      login: async (email, password) => {
        try {
          const res = await api.post("/auth/login", { email, password });
          if (res.data?.user) {
            set({ user: res.data.user, isAuthenticated: true });
          }
        } catch (error) {
          console.error("Login failed:", error.response?.data || error.message);
          throw error; 
        }
      },

      // CHECK AUTH (runs on refresh/app load)
      checkAuth: async () => {
        try {
          const res = await api.get("/auth/me");
          if (res.data?.user) {
            set({ user: res.data.user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch {
          set({ user: null, isAuthenticated: false });
        }
      },

      // LOGOUT
      logout: async () => {
        try {
          await api.post("/auth/logout");
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      }
    }),
    {
      name: "auth-store", // key in localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

// Format of Data in Store:
// {
//   user: {
//     _id, email, username, profilePicture, ...
//   },
//   isAuthenticated: true/false
// }
