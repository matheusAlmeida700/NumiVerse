
import { createQueryKeys } from '@/lib/utils';

// Base API configuration
const API_BASE_URL = '/api'; // This will be replaced with your actual API URL

// Define API query keys
export const apiKeys = createQueryKeys('api', {
  user: ['user'] as const,
  lessons: ['lessons'] as const,
  lesson: (id: string) => ['lesson', id] as const,
  planets: ['planets'] as const,
  planet: (id: string) => ['planet', id] as const,
  streak: ['streak'] as const,
  achievements: ['achievements'] as const,
  progress: ['progress'] as const,
});

// API error handling
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Generic fetch wrapper
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // We can add auth token here later
  const authToken = localStorage.getItem('auth_token');
  if (authToken) {
    defaultHeaders['Authorization'] = `Bearer ${authToken}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });
  
  if (!response.ok) {
    let errorMessage = 'Ocorreu um erro na solicitação';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // If parsing JSON fails, use the default error message
    }
    
    throw new ApiError(errorMessage, response.status);
  }
  
  // For 204 No Content responses
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}

// API methods
export const api = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      return fetchApi<{ token: string, user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
    register: async (email: string, password: string, name: string) => {
      return fetchApi<{ token: string, user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
    },
    logout: async () => {
      return fetchApi('/auth/logout', {
        method: 'POST',
      });
    },
    getUser: async () => {
      return fetchApi('/auth/user');
    },
  },
  
  // User data endpoints
  user: {
    getProgress: async () => {
      return fetchApi('/user/progress');
    },
    getStreak: async () => {
      return fetchApi('/user/streak');
    },
    getAchievements: async () => {
      return fetchApi('/user/achievements');
    },
    updateAvatar: async (avatarId: string) => {
      return fetchApi('/user/avatar', {
        method: 'PUT',
        body: JSON.stringify({ avatarId }),
      });
    },
  },
  
  // Lesson endpoints
  lessons: {
    getAll: async () => {
      return fetchApi('/lessons');
    },
    getById: async (id: string) => {
      return fetchApi(`/lessons/${id}`);
    },
    completeLesson: async (
      lessonId: string, 
      stats: { 
        correctAnswers: number, 
        totalQuestions: number 
      }
    ) => {
      return fetchApi(`/lessons/${lessonId}/complete`, {
        method: 'POST',
        body: JSON.stringify(stats),
      });
    },
  },
  
  // Planet endpoints
  planets: {
    getAll: async () => {
      return fetchApi('/planets');
    },
    getById: async (id: string) => {
      return fetchApi(`/planets/${id}`);
    },
  },
};

export default api;
