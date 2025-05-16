
import { LessonData } from '@/types/lesson';

export const lessonService = {
  // Get a list of all available lessons
  getLessons: async () => {
    const response = await fetch('/api/lessons');
    if (!response.ok) {
      throw new Error('Failed to fetch lessons');
    }
    return response.json();
  },
  
  // Get detailed data for a specific lesson
  getLessonById: async (lessonId: string): Promise<LessonData> => {
    const response = await fetch(`/api/lessons/${lessonId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch lesson: ${lessonId}`);
    }
    return response.json();
  },
  
  // Get lessons for a specific planet
  getLessonsByPlanet: async (planetId: string) => {
    const response = await fetch(`/api/planets/${planetId}/lessons`);
    if (!response.ok) {
      throw new Error(`Failed to fetch planet lessons: ${planetId}`);
    }
    return response.json();
  }
};
