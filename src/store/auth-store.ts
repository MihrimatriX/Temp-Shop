import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  };
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  data?: {
    token: string;
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  };
  message?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_DOTNET_API_URL || "http://localhost:5000/api";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/Auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data: LoginResponse = await response.json();

          if (data.success && data.data) {
            const user: User = {
              id: data.data.userId,
              email: data.data.email,
              firstName: data.data.firstName,
              lastName: data.data.lastName,
              isEmailVerified: data.data.isEmailVerified,
            };

            set({
              user,
              token: data.data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return true;
          } else {
            set({
              isLoading: false,
              error: data.message || "Login failed",
            });
            return false;
          }
        } catch (error) {
          set({
            isLoading: false,
            error: "Network error occurred",
          });
          return false;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/Auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          const data: RegisterResponse = await response.json();

          if (data.success && data.data) {
            const user: User = {
              id: data.data.userId,
              email: data.data.email,
              firstName: data.data.firstName,
              lastName: data.data.lastName,
              isEmailVerified: data.data.isEmailVerified,
            };

            set({
              user,
              token: data.data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return true;
          } else {
            set({
              isLoading: false,
              error: data.message || "Registration failed",
            });
            return false;
          }
        } catch (error) {
          set({
            isLoading: false,
            error: "Network error occurred",
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setUser: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
