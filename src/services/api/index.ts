import { api } from "../apiClient";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
}

export const userService = {
  getAll: () => api.getAll(),
  getById: (id: string) => api.getById(id),
  create: (user: CreateUserData) => api.create(user),
  update: (id: string, updates: UpdateUserData) => api.update(id, updates),
  delete: (id: string) => api.delete(id),
  login: (email: string, password: string) =>
    api.auth.login({ email, password }),
  register: (name: string, email: string, password: string) =>
    api.auth.register({ name, email, password }),
};

export const userDataService = {
  updateProgress: (id: string, lessonId: string) =>
    api.user.updateProgress(id, lessonId),
  updateStreak: (userId: string) => api.user.updateStreak(userId),
  updateAchievements: (userId: string, achievementId: string) =>
    api.user.updateAchievements(userId, achievementId),
  updateXp: (userId: string, xpToAdd: number) =>
    api.user.updateXp(userId, xpToAdd),
};
