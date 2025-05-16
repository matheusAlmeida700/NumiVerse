
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userProgressService } from '@/services/userProgressService';
import { toast } from '@/components/ui/use-toast';

export const useUserProgress = () => {
  const queryClient = useQueryClient();

  // Get user progress
  const { 
    data: userProgress, 
    isLoading: isLoadingProgress,
    error: progressError,
    refetch: refetchProgress
  } = useQuery({
    queryKey: ['userProgress'],
    queryFn: userProgressService.getUserProgress,
    retry: 1,
  });

  // Complete a lesson
  const { mutate: completeLesson } = useMutation({
    mutationFn: ({ 
      lessonId, 
      correctAnswers, 
      totalQuestions 
    }: { 
      lessonId: string, 
      correctAnswers: number, 
      totalQuestions: number 
    }) => userProgressService.completeLesson(lessonId, correctAnswers, totalQuestions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      toast({
        title: "Lição completa!",
        description: "Seu progresso foi salvo com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível salvar seu progresso",
        variant: "destructive",
      });
    }
  });

  // Get user streak
  const { 
    data: userStreak,
    isLoading: isLoadingStreak 
  } = useQuery({
    queryKey: ['userStreak'],
    queryFn: userProgressService.getUserStreak,
    retry: 1,
  });

  // Get user achievements
  const {
    data: achievements,
    isLoading: isLoadingAchievements
  } = useQuery({
    queryKey: ['userAchievements'],
    queryFn: userProgressService.getUserAchievements,
    retry: 1,
  });

  // Get user missions
  const {
    data: missions,
    isLoading: isLoadingMissions
  } = useQuery({
    queryKey: ['userMissions'],
    queryFn: userProgressService.getUserMissions,
    retry: 1,
  });

  return {
    userProgress,
    completeLesson,
    userStreak,
    achievements,
    missions,
    isLoading: isLoadingProgress || isLoadingStreak || isLoadingAchievements || isLoadingMissions,
    error: progressError,
    refetchProgress,
  };
};
