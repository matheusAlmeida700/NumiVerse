import { toast } from "@/components/ui/use-toast";
import { getLocalUserData } from "@/hooks/useUserData";

export interface UserProgress {
  lessonCompletions: Record<
    string,
    {
      completed: boolean;
      correctAnswers: number;
      totalQuestions: number;
      xpEarned: number;
      completedAt: string; // ISO date string
    }
  >;
  lastCompletedLessonId: string | null;
  streakDays: number;
  lastStreakDate: string | null; // ISO date string
  totalXp: number;
  level: number;
}

const USER_STORAGE_KEY = "numiverse_user_progress";

// Calculate XP based on performance
export const calculateXpForLesson = (
  correctAnswers: number,
  totalQuestions: number,
  baseXp: number
): number => {
  const percentCorrect = correctAnswers / totalQuestions;

  // Scale XP based on performance
  if (percentCorrect >= 0.9) {
    // Excellent performance (90%+)
    return Math.round(baseXp * 1.2);
  } else if (percentCorrect >= 0.7) {
    // Good performance (70-89%)
    return baseXp;
  } else if (percentCorrect >= 0.5) {
    // Average performance (50-69%)
    return Math.round(baseXp * 0.8);
  } else {
    // Poor performance (<50%)
    return Math.round(baseXp * 0.5);
  }
};

// Initialize with data from localStorage if available, otherwise use default data
export const initializeUserProgress = async (): Promise<UserProgress> => {
  return await getLocalUserData();
};

// Functions to manipulate user progress
export const saveUserProgress = (userProgress: UserProgress): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userProgress));
};

// Check if a lesson is completed
export const isLessonCompleted = (lessonId: string): boolean => {
  const storedData = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedData) return false;

  try {
    const userProgress = JSON.parse(storedData);
    return !!userProgress.lessonCompletions[lessonId]?.completed;
  } catch (e) {
    console.error("Error checking lesson completion:", e);
    return false;
  }
};

// Get lesson completion stats
export const getLessonStats = (lessonId: string) => {
  const storedData = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedData) return null;

  try {
    const userProgress = JSON.parse(storedData);
    return userProgress.lessonCompletions[lessonId] || null;
  } catch (e) {
    console.error("Error getting lesson stats:", e);
    return null;
  }
};

// Check and update streak status
export const getStreakDays = (): number => {
  const storedData = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedData) return 0;

  try {
    const userProgress = JSON.parse(storedData);

    // Check if streak is expired (more than 1 day since last activity)
    if (userProgress.lastStreakDate) {
      const lastDate = new Date(userProgress.lastStreakDate);
      const today = new Date();
      const lastDateStr = lastDate.toISOString().split("T")[0];
      const todayStr = today.toISOString().split("T")[0];

      if (lastDateStr === todayStr) {
        // Already logged in today
        return userProgress.streakDays;
      }

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastDateStr !== yesterdayStr) {
        // More than 1 day has passed - reset streak
        userProgress.streakDays = 0;
        saveUserProgress(userProgress);
      }
    }

    return userProgress.streakDays;
  } catch (e) {
    console.error("Error getting streak days:", e);
    return 0;
  }
};

// Get current user level
export const getUserLevel = (): number => {
  const storedData = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedData) return 1;

  try {
    const userProgress = JSON.parse(storedData);
    return userProgress.level;
  } catch (e) {
    console.error("Error getting user level:", e);
    return 1;
  }
};

// Get total XP
export const getUserXp = (): number => {
  const storedData = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedData) return 0;

  try {
    const userProgress = JSON.parse(storedData);
    return userProgress.totalXp;
  } catch (e) {
    console.error("Error getting user XP:", e);
    return 0;
  }
};

// Get level progress percentage
export const getCurrentLevelProgress = (): number => {
  const storedData = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedData) return 0;

  try {
    const userProgress = JSON.parse(storedData);
    return (userProgress.totalXp % 1000) / 10; // Convert to percentage (0-100)
  } catch (e) {
    console.error("Error getting level progress:", e);
    return 0;
  }
};

// This function will be used by components transitioning to the API
export const updateUserProgress = async (
  lessonId: string,
  correctAnswers: number,
  totalQuestions: number,
  xpEarned: number
): Promise<void> => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  try {
    // First, get current user progress from localStorage
    const userProgress = await initializeUserProgress();

    // Update lesson completion data
    userProgress.lessonCompletions[lessonId] = {
      completed: true,
      correctAnswers,
      totalQuestions,
      xpEarned,
      completedAt: new Date().toISOString(),
    };

    userProgress.lastCompletedLessonId = lessonId;
    userProgress.totalXp += xpEarned;

    // Update level (1000 XP per level)
    userProgress.level = Math.max(
      1,
      Math.floor(userProgress.totalXp / 1000) + 1
    );

    // Update streak - Only increase if the last streak date wasn't today
    const lastStreakDate = userProgress.lastStreakDate
      ? new Date(userProgress.lastStreakDate).toISOString().split("T")[0]
      : null;

    if (lastStreakDate !== todayString) {
      // Check if this is a continuation of the streak (yesterday or first time)
      if (!lastStreakDate) {
        // First time - start streak
        userProgress.streakDays = 1;
      } else {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        if (lastStreakDate === yesterdayString) {
          // Last activity was yesterday - continue streak
          userProgress.streakDays += 1;
        } else {
          // Break in the streak - reset
          userProgress.streakDays = 1;
        }
      }

      userProgress.lastStreakDate = today.toISOString();
    }

    // Save to localStorage
    saveUserProgress(userProgress);

    // In a fully integrated app, we'd call the API here
    // For now, we'll use a toast to simulate successful API call
    toast({
      title: "Progresso salvo",
      description: `Você ganhou ${xpEarned} XP!`,
    });
  } catch (error) {
    console.error("Error updating user progress:", error);
    toast({
      title: "Erro",
      description: "Falha ao salvar progresso",
      variant: "destructive",
    });
  }
};
