
import { apiClient } from './apiClient';
import { UserProgress } from './userService';

export const userProgressService = {
  // Get complete user progress
  getUserProgress: async (): Promise<UserProgress> => {
    const response = await apiClient.get('/user/progress');
    return response.data;
  },
  
  // Complete a lesson and update progress
  completeLesson: async (
    lessonId: string, 
    correctAnswers: number, 
    totalQuestions: number
  ) => {
    const response = await apiClient.post('/user/lessons/complete', {
      lessonId,
      correctAnswers,
      totalQuestions
    });
    return response.data;
  },
  
  // Check if a lesson has been completed
  getLessonStatus: async (lessonId: string) => {
    const response = await apiClient.get(`/user/lessons/${lessonId}/status`);
    return response.data;
  },
  
  // Get user streak information
  getUserStreak: async () => {
    const response = await apiClient.get('/user/streak');
    return response.data;
  },
  
  // Update user XP and level
  updateUserXp: async (xpEarned: number) => {
    const response = await apiClient.post('/user/xp', { xpEarned });
    return response.data;
  },

  // Get achievement data
  getUserAchievements: async () => {
    const response = await apiClient.get('/user/achievements');
    return response.data;
  },
  
  // Get daily goals and missions
  getUserMissions: async () => {
    const response = await apiClient.get('/user/missions');
    return response.data;
  }
};
