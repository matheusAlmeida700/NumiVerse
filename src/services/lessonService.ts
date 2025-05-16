
import { apiClient } from './apiClient';
import { LessonData } from '@/types/lesson';

export const lessonService = {
  // Get a list of all available lessons
  getLessons: async () => {
    const response = await apiClient.get('/lessons');
    return response.data;
  },
  
  // Get detailed data for a specific lesson
  getLessonById: async (lessonId: string): Promise<LessonData> => {
    const response = await apiClient.get(`/lessons/${lessonId}`);
    return response.data;
  },
  
  // Get lessons for a specific planet
  getLessonsByPlanet: async (planetId: string) => {
    const response = await apiClient.get(`/planets/${planetId}/lessons`);
    return response.data;
  }
};
