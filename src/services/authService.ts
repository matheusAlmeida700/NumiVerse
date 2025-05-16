
import { apiClient } from './apiClient';
import { UserProgress } from './userService';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  createdAt: string;
  progress: UserProgress;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    localStorage.removeItem('auth_token');
    return response.data;
  },
  
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  
  // Fallback to localStorage when offline or during development
  getUserFromLocal: (): UserProfile | null => {
    const userData = localStorage.getItem('numiverse_user_data');
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch (e) {
      console.error('Error parsing user data from localStorage:', e);
      return null;
    }
  },
  
  saveUserToLocal: (userData: UserProfile): void => {
    localStorage.setItem('numiverse_user_data', JSON.stringify(userData));
  }
};
