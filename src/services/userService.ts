export interface UserProgress {
  lessonCompletions: Record<
    string,
    {
      completed: boolean;
      correctAnswers: number;
      totalQuestions: number;
      xpEarned: number;
      completedAt: string;
    }
  >;
  lastCompletedLessonId: string | null;
  streakDays: number;
  lastStreakDate: string | null;
  totalXp: number;
  level: number;
}

const INITIAL_USER_PROGRESS: UserProgress = {
  lessonCompletions: {},
  lastCompletedLessonId: null,
  streakDays: 0,
  lastStreakDate: null,
  totalXp: 0,
  level: 1,
};

const USER_STORAGE_KEY = "numiverse_user_progress";

export const getUserProgress = (): UserProgress => {
  const storedData = localStorage.getItem(USER_STORAGE_KEY);
  if (!storedData) {
    return INITIAL_USER_PROGRESS;
  }

  try {
    return JSON.parse(storedData);
  } catch (e) {
    console.error("Erro ao carregar dados do usuário:", e);
    return INITIAL_USER_PROGRESS;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(progress));
};

export const completeLesson = (
  lessonId: string,
  correctAnswers: number,
  totalQuestions: number,
  xpEarned: number
): UserProgress => {
  const userProgress = getUserProgress();
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  userProgress.lessonCompletions[lessonId] = {
    completed: true,
    correctAnswers,
    totalQuestions,
    xpEarned,
    completedAt: new Date().toISOString(),
  };

  userProgress.lastCompletedLessonId = lessonId;
  userProgress.totalXp += xpEarned;

  userProgress.level = Math.max(1, Math.floor(userProgress.totalXp / 1000) + 1);

  const lastStreakDate = userProgress.lastStreakDate
    ? new Date(userProgress.lastStreakDate).toISOString().split("T")[0]
    : null;

  if (lastStreakDate !== todayString) {
    if (!lastStreakDate) {
      userProgress.streakDays = 1;
    } else {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split("T")[0];

      if (lastStreakDate === yesterdayString) {
        userProgress.streakDays += 1;
      } else {
        userProgress.streakDays = 1;
      }
    }

    userProgress.lastStreakDate = today.toISOString();
  }

  saveUserProgress(userProgress);
  return userProgress;
};

export const isLessonCompleted = (lessonId: string): boolean => {
  const userProgress = getUserProgress();
  return !!userProgress.lessonCompletions[lessonId]?.completed;
};

export const getLessonStats = (lessonId: string) => {
  const userProgress = getUserProgress();
  return userProgress.lessonCompletions[lessonId] || null;
};

export const getStreakDays = (): number => {
  const userProgress = getUserProgress();

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
};

export const getUserLevel = (): number => {
  const userProgress = getUserProgress();
  return userProgress.level;
};

export const getUserXp = (): number => {
  const userProgress = getUserProgress();
  return userProgress.totalXp;
};

export const getCurrentLevelProgress = (): number => {
  const userProgress = getUserProgress();
  return (userProgress.totalXp % 1000) / 10;
};
