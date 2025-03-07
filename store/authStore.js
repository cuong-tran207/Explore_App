import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiServer from "../utils/api";
import tokenManager from "../utils/tokenManager";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => {
        tokenManager.setToken(token);
        set({ token });
      },
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      initializeTokenManager: () => {
        const token = get().token;
        if (token) {
          tokenManager.initializeFromStore(token);
        }
      },

      reset: () => {
        tokenManager.setToken(null);
        set({ user: null, token: null, error: null });
      },

      signIn: async (email, password) => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiServer.call("user/login", {
            email,
            password,
          });

          if (response.error) {
            throw new Error(response.error.message || "Sign in failed");
          }
          set({
            user: response.data,
            token: response.data.token,
            isLoading: false,
          });
          tokenManager.setToken(response.data.token);

          return true;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return false;
        }
      },

      signUp: async (userData) => {
        try {
          console.log("userData :", userData);
          set({ isLoading: true, error: null });

          const response = await apiServer.call("user/register", userData);
          console.log("response :", response);

          if (response.error) {
            throw new Error(response.error.message || "Sign up failed");
          }

          set({
            user: response.data,
            token: response.data.token,
            isLoading: false,
          });
          tokenManager.setToken(response.data.token);
          return true;
        } catch (error) {
          console.log("error :", error);
          set({
            error: error.message,
            isLoading: false,
          });
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state && state.token) {
          tokenManager.initializeFromStore(state.token);
        }
      },
    }
  )
);

export default useAuthStore;
