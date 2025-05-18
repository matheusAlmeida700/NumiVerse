import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDataService, userService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export function useUserData() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => userService.getById(user.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
}

export const useUpdateProgress = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, lessonId }: { id: string; lessonId: string }) =>
      userDataService.updateProgress(id, lessonId),
    onSuccess: () => {
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      }
    },
  });
};

export const useUpdateStreak = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (streak: {
      current: number;
      lastUpdate: string;
      lastActiveDate: string;
    }) => userDataService.updateStreak(user.id, streak),
    onSuccess: () => {
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      }
    },
  });
};

export const useUpdateAchievement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (achievementId: string) =>
      userDataService.updateAchievements(user.id, achievementId),
    onSuccess: () => {
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      }
    },
  });
};

export const useUpdateUserXp = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (xp: number) => userDataService.updateXp(user.id, xp),
    onSuccess: () => {
      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      }
    },
  });
};

export const isLessonCompleted = (
  progress: string[] | undefined,
  lessonId: string
): boolean => {
  if (!progress) return false;
  return progress.includes(lessonId);
};
