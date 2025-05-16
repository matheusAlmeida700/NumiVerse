
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

export interface UserProgress {
  completedLessons: string[];
  level: number;
  xp: number;
  streak: number;
  lastActivity: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha no login');
    }
    
    return response.json();
  },
  
  register: async (data: RegisterData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao criar conta');
    }
    
    return response.json();
  },
  
  logout: async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    localStorage.removeItem('auth_token');
    return response.ok;
  },
  
  getCurrentUser: async (): Promise<UserProfile> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    
    return response.json();
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
