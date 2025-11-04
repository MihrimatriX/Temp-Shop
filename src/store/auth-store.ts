import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useBackendStore } from "./backend-store";
import { 
  mockUsers, 
  findUserByEmail, 
  findUserById, 
  verifyPassword, 
  generateMockToken, 
  verifyMockToken,
  updateUser,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  toggleUserFavorite,
  addUserOrder,
  MockUser,
  MockAddress
} from "@/data/mock-users";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  role?: string;
  phoneNumber?: string;
  avatar?: string;
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
  // Mock auth actions
  mockLogin: (email: string, password: string) => Promise<boolean>;
  mockRegister: (userData: RegisterData) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  updateUser: (user: User) => void;
  addAddress: (address: Omit<MockAddress, 'id'>) => Promise<MockAddress | null>;
  updateAddress: (addressId: number, updates: Partial<MockAddress>) => Promise<MockAddress | null>;
  deleteAddress: (addressId: number) => Promise<boolean>;
  toggleFavorite: (productId: number) => Promise<boolean>;
  getFullUser: () => MockUser | null;
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

// API URL artık backend store'dan alınacak

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Backend login (fallback)
      login: async (email: string, password: string) => {
        const { config } = useBackendStore.getState();
        
        // Mock backend kullanılıyorsa mock login'e yönlendir
        if (config.type === 'mock') {
          return get().mockLogin(email, password);
        }

        set({ isLoading: true, error: null });

        try {
          const apiUrl = useBackendStore.getState().getCurrentApiUrl();
          const response = await fetch(`${apiUrl}/Auth/login`, {
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

      // Backend register (fallback)
      register: async (userData: RegisterData) => {
        const { config } = useBackendStore.getState();
        
        // Mock backend kullanılıyorsa mock register'e yönlendir
        if (config.type === 'mock') {
          return get().mockRegister(userData);
        }

        set({ isLoading: true, error: null });

        try {
          const apiUrl = useBackendStore.getState().getCurrentApiUrl();
          const response = await fetch(`${apiUrl}/Auth/register`, {
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

      // Mock login implementation
      mockLogin: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          const user = findUserByEmail(email);
          if (!user) {
            set({
              isLoading: false,
              error: "Kullanıcı bulunamadı",
            });
            return false;
          }

          if (!verifyPassword(user, password)) {
            set({
              isLoading: false,
              error: "Şifre hatalı",
            });
            return false;
          }

          const token = generateMockToken(user.id);
          const userData: User = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isEmailVerified: user.isEmailVerified,
            role: user.role,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
          };

          // Update last login
          updateUser(user.id, { lastLoginAt: new Date() });

          set({
            user: userData,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: "Giriş yapılırken hata oluştu",
          });
          return false;
        }
      },

      // Mock register implementation
      mockRegister: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1500));

          // Check if user already exists
          const existingUser = findUserByEmail(userData.email);
          if (existingUser) {
            set({
              isLoading: false,
              error: "Bu e-posta adresi zaten kullanılıyor",
            });
            return false;
          }

          // Create new user
          const newUser: MockUser = {
            id: Math.max(...mockUsers.map(u => u.id)) + 1,
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'user',
            isEmailVerified: false,
            phoneNumber: userData.phoneNumber,
            addresses: userData.address ? [{
              id: Date.now(),
              title: 'Ev',
              fullAddress: userData.address,
              city: userData.city || '',
              district: '',
              postalCode: userData.postalCode || '',
              isDefault: true,
            }] : [],
            orders: [],
            favorites: [],
            createdAt: new Date(),
          };

          mockUsers.push(newUser);

          const token = generateMockToken(newUser.id);
          const user: User = {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            isEmailVerified: newUser.isEmailVerified,
            role: newUser.role,
            phoneNumber: newUser.phoneNumber,
            avatar: newUser.avatar,
          };

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: "Kayıt olurken hata oluştu",
          });
          return false;
        }
      },

      // Update user profile
      updateProfile: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return false;

        try {
          const updatedUser = updateUser(user.id, {
            firstName: updates.firstName || user.firstName,
            lastName: updates.lastName || user.lastName,
            phoneNumber: updates.phoneNumber,
            avatar: updates.avatar,
          });

          if (updatedUser) {
            const userData: User = {
              id: updatedUser.id,
              email: updatedUser.email,
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              isEmailVerified: updatedUser.isEmailVerified,
              role: updatedUser.role,
              phoneNumber: updatedUser.phoneNumber,
              avatar: updatedUser.avatar,
            };

            set({ user: userData });
            return true;
          }
          return false;
        } catch (error) {
          return false;
        }
      },

      // Update user directly
      updateUser: (user: User) => {
        set({ user });
      },

      // Address management
      addAddress: async (address: Omit<MockAddress, 'id'>) => {
        const { user } = get();
        if (!user) return null;

        return addUserAddress(user.id, address);
      },

      updateAddress: async (addressId: number, updates: Partial<MockAddress>) => {
        const { user } = get();
        if (!user) return null;

        return updateUserAddress(user.id, addressId, updates);
      },

      deleteAddress: async (addressId: number) => {
        const { user } = get();
        if (!user) return false;

        return deleteUserAddress(user.id, addressId);
      },

      // Favorites management
      toggleFavorite: async (productId: number) => {
        const { user } = get();
        if (!user) return false;

        return toggleUserFavorite(user.id, productId);
      },

      // Get full user data
      getFullUser: () => {
        const { user } = get();
        if (!user) return null;

        return findUserById(user.id) || null;
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
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
