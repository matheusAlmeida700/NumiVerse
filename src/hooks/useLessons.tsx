
import { useQuery } from '@tanstack/react-query';
import { lessonService } from '@/services/lessonService';
import { LessonData } from '@/types/lesson';

export const useLessons = () => {
  // Get all lessons
  const {
    data: lessons,
    isLoading: isLoadingLessons,
    error: lessonsError,
  } = useQuery({
    queryKey: ['lessons'],
    queryFn: lessonService.getLessons,
    retry: 1,
  });

  // Get specific lesson by ID
  const getLessonById = (lessonId: string) => {
    return useQuery({
      queryKey: ['lesson', lessonId],
      queryFn: () => lessonService.getLessonById(lessonId),
      retry: 1,
      enabled: !!lessonId,
    });
  };

  // Get lessons by planet
  const getLessonsByPlanet = (planetId: string) => {
    return useQuery({
      queryKey: ['planetLessons', planetId],
      queryFn: () => lessonService.getLessonsByPlanet(planetId),
      retry: 1,
      enabled: !!planetId,
    });
  };

  return {
    lessons,
    isLoadingLessons,
    lessonsError,
    getLessonById,
    getLessonsByPlanet,
  };
};
