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

export const useUser = (id?: string) => {
  const isFetchingSingle = !!id;

  const query = useQuery({
    queryKey: isFetchingSingle ? ["user", id] : ["users"],
    queryFn: isFetchingSingle
      ? () => userService.getById(id!)
      : userService.getAll,
    enabled: isFetchingSingle ? !!id : true,
  });

  return query;
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, lessonId }: { userId: string; lessonId: string }) =>
      userDataService.updateProgress(userId, lessonId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
    },
  });
};

export const useUpdateStreak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      userDataService.updateStreak(userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
    },
  });
};

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      achievementId,
    }: {
      userId: string;
      achievementId: string;
    }) => userDataService.updateAchievements(userId, achievementId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
    },
  });
};

export const useUpdateUserXp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, xpToAdd }: { userId: string; xpToAdd: number }) => {
      return userDataService.updateXp(userId, xpToAdd);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
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
