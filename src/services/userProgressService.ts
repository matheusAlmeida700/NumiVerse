import { UserProgress } from "./authService";

export const userProgressService = {
  getUserProgress: async (): Promise<UserProgress> => {
    const token = localStorage.getItem("auth_token");

    const response = await fetch("/api/user/progress", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user progress");
    }

    return response.json();
  },

  // Complete a lesson and update progress
  completeLesson: async (
    lessonId: string,
    correctAnswers: number,
    totalQuestions: number
  ) => {
    const token = localStorage.getItem("auth_token");

    const response = await fetch("/api/user/lessons/complete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lessonId,
        correctAnswers,
        totalQuestions,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to complete lesson");
    }

    return response.json();
  },

  getLessonStatus: async (lessonId: string) => {
    const token = localStorage.getItem("auth_token");

    const response = await fetch(`/api/user/lessons/${lessonId}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get lesson status");
    }

    return response.json();
  },

  // Get user streak information
  getUserStreak: async () => {
    const token = localStorage.getItem("auth_token");

    const response = await fetch("/api/user/streak", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user streak");
    }

    return response.json();
  },

  // Update user XP and level
  updateUserXp: async (xpEarned: number) => {
    const token = localStorage.getItem("auth_token");

    const response = await fetch("/api/user/xp", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ xpEarned }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user XP");
    }

    return response.json();
  },

  // Get achievement data
  getUserAchievements: async () => {
    const token = localStorage.getItem("auth_token");

    const response = await fetch("/api/user/achievements", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user achievements");
    }

    return response.json();
  },

  // Get daily goals and missions
  getUserMissions: async () => {
    const token = localStorage.getItem("auth_token");

    const response = await fetch("/api/user/missions", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user missions");
    }

    return response.json();
  },
};
