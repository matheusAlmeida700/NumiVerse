import { UserStreak } from "@/types/user";
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
  getProgress: (id: string) => api.user.getProgress(id),
  updateProgress: (id: string, lessonId: string) =>
    api.user.updateProgress(id, lessonId),
  getStreak: (userId: string) => api.user.getStreak(userId),
  updateStreak: (userId: string, streak: UserStreak) =>
    api.user.updateStreak(userId, streak),
  getAchievements: (userId: string) => api.user.getAchievements(userId),
  updateAchievements: (userId: string, achievementId: string) =>
    api.user.updateAchievements(userId, achievementId),
  getXp: (userId: string) => api.user.getXp(userId),
  updateXp: (userId: string, xpToAdd: number) =>
    api.user.updateXp(userId, xpToAdd),
};
