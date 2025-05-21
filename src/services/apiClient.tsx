import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number = 500, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/user`,
  user: (id: string) => `${API_BASE_URL}/user/${id}`,
  userLogin: `${API_BASE_URL}/auth/login`,
  userRegister: `${API_BASE_URL}/auth/register`,
  streak: (id: string) => `${API_BASE_URL}/user/${id}/streak`,
  progress: (id: string) => `${API_BASE_URL}/user/${id}/progress`,
  achievements: (id: string) => `${API_BASE_URL}/user/${id}/achievements`,
  xp: (id: string) => `${API_BASE_URL}/user/${id}/xp`,
};

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const REQUEST_TIMEOUT = 30000;

/**
 * Simplified fetch function with timeout and error handling
 */
async function apiFetch<T = any>(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<T> {
  const { timeout = REQUEST_TIMEOUT, headers = {}, ...rest } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const token = localStorage.getItem("auth_token");

    const requestHeaders = {
      ...DEFAULT_HEADERS,
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, {
      ...rest,
      headers: requestHeaders,
      signal: controller.signal,
    });

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408);
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

const invalidateQueries = (queryKey: string | string[], id?: string) => {
  if (id) {
    queryClient.invalidateQueries({ queryKey: [queryKey, id] });
  } else {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  }
};

export const api = {
  getAll: async () => {
    const url = API_ENDPOINTS.users;

    try {
      const response = await apiFetch(url);
      const items = response.users;

      if (!items || !Array.isArray(items)) {
        console.error("Invalid response format from API");
        return [];
      }

      return items;
    } catch (error) {
      console.error(`Error fetching items:`, error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      if (!id) {
        throw new Error("Invalid ID format");
      }

      const url = API_ENDPOINTS.user(id);

      const response = await apiFetch(url);
      const item = response.user;

      if (!item || !(item._id || item.id)) {
        throw new Error(`Item not found or invalid data format`);
      }

      return item;
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (data: any) => {
    const url = API_ENDPOINTS.users;
    try {
      const response = await apiFetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      return response;
    } catch (error) {
      console.error(`Error creating item:`, error);
      throw error;
    }
  },

  update: async (id: string, updates: any) => {
    try {
      if (!id) {
        throw new Error("Invalid ID format");
      }

      const url = API_ENDPOINTS.user(id);

      const response = await apiFetch(url, {
        method: "PUT",
        body: JSON.stringify(updates),
      });

      return response;
    } catch (error) {
      console.error(`Error updating item with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      if (!id) {
        throw new Error("Invalid ID format");
      }

      const url = API_ENDPOINTS.user(id);

      await apiFetch(url, { method: "DELETE" });

      return true;
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
      throw error;
    }
  },

  auth: {
    login: async (credentials: { email: string; password: string }) => {
      return await apiFetch(API_ENDPOINTS.userLogin, {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },

    register: async (userData: {
      name: string;
      email: string;
      password: string;
    }) => {
      return await apiFetch(API_ENDPOINTS.userRegister, {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },
  },

  user: {
    updateProgress: async (userId: string, lessonId: string) => {
      try {
        if (!userId) {
          throw new Error("Invalid ID format");
        }

        const url = API_ENDPOINTS.progress(userId);

        const response = await apiFetch(url, {
          method: "POST",
          body: JSON.stringify({ lessonId }),
        });

        return response;
      } catch (error) {
        console.error(`Error updating item:`, error);
        throw error;
      }
    },
    updateStreak: async (userId: string) => {
      try {
        if (!userId) {
          throw new Error("Invalid ID format");
        }

        const url = API_ENDPOINTS.streak(userId);

        const response = await apiFetch(url, {
          method: "PUT",
        });

        return response;
      } catch (error) {
        console.error(`Error updating streak:`, error);
        throw error;
      }
    },

    updateAchievements: async (userId: string, achievementId: string) => {
      try {
        if (!userId) {
          throw new Error("Invalid ID format");
        }

        const url = API_ENDPOINTS.achievements(userId);

        const response = await apiFetch(url, {
          method: "PUT",
          body: JSON.stringify({ achievementId }),
        });

        return response;
      } catch (error) {
        console.error(`Error updating item:`, error);
        throw error;
      }
    },
    updateXp: async (userId: string, xpToAdd: number) => {
      try {
        if (!userId) {
          throw new Error("Invalid ID format");
        }

        const url = API_ENDPOINTS.xp(userId);

        const response = await apiFetch(url, {
          method: "PUT",
          body: JSON.stringify({ amount: xpToAdd }),
        });

        return response;
      } catch (error) {
        console.error(`Error updating item:`, error);
        throw error;
      }
    },
  },

  lessons: {
    getAll: async () => {
      return apiFetch("/lessons");
    },
    getById: async (id: string) => {
      return apiFetch(`/lessons/${id}`);
    },
    completeLesson: async (
      lessonId: string,
      stats: {
        correctAnswers: number;
        totalQuestions: number;
      }
    ) => {
      return apiFetch(`/lessons/${lessonId}/complete`, {
        method: "POST",
        body: JSON.stringify(stats),
      });
    },
  },
};

export default api;
