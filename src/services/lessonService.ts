import { LessonData } from "@/types/lesson";

export const lessonService = {
  getLessons: async () => {
    const response = await fetch("/api/lessons");
    if (!response.ok) {
      throw new Error("Failed to fetch lessons");
    }
    return response.json();
  },

  getLessonById: async (lessonId: string): Promise<LessonData> => {
    const response = await fetch(`/api/lessons/${lessonId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch lesson: ${lessonId}`);
    }
    return response.json();
  },

  getLessonsByPlanet: async (planetId: string) => {
    const response = await fetch(`/api/planets/${planetId}/lessons`);
    if (!response.ok) {
      throw new Error(`Failed to fetch planet lessons: ${planetId}`);
    }
    return response.json();
  },
};
