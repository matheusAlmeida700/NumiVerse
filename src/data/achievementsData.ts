export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: "lesson" | "streak" | "exploration" | "mastery";
  secret?: boolean;
}

export const achievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "Primeiro Passo",
    description: "Complete sua primeira lição",
    icon: "🎓",
    unlocked: true,
    unlockedAt: "2025-05-01T15:30:00.000Z",
    rarity: "common",
    category: "lesson",
  },
  {
    id: "ten-lessons",
    title: "Estudante Dedicado",
    description: "Complete 10 lições",
    icon: "📚",
    unlocked: false,
    rarity: "common",
    category: "lesson",
  },
  {
    id: "perfect-lesson",
    title: "Perfeição",
    description: "Complete uma lição com 100% de acerto",
    icon: "💯",
    unlocked: true,
    unlockedAt: "2025-05-03T12:15:00.000Z",
    rarity: "rare",
    category: "lesson",
  },

  // Streak achievements
  {
    id: "three-day-streak",
    title: "Comprometido",
    description: "Mantenha uma sequência de aprendizado de 3 dias",
    icon: "🔥",
    unlocked: true,
    unlockedAt: "2025-05-05T18:20:00.000Z",
    rarity: "common",
    category: "streak",
  },
  {
    id: "seven-day-streak",
    title: "Hábito Saudável",
    description: "Mantenha uma sequência de aprendizado de 7 dias",
    icon: "📅",
    unlocked: false,
    rarity: "rare",
    category: "streak",
  },
  {
    id: "thirty-day-streak",
    title: "Inabalável",
    description: "Mantenha uma sequência de aprendizado de 30 dias",
    icon: "🏆",
    unlocked: false,
    rarity: "legendary",
    category: "streak",
  },

  // Exploration achievements
  {
    id: "all-planets",
    title: "Explorador Espacial",
    description: "Visite todos os planetas",
    icon: "🚀",
    unlocked: false,
    rarity: "epic",
    category: "exploration",
  },
  {
    id: "algebra-master",
    title: "Mestre da Álgebra",
    description: "Complete todas as lições do planeta Álgebra",
    icon: "🌞",
    unlocked: false,
    rarity: "rare",
    category: "exploration",
  },
  {
    id: "arithmetic-master",
    title: "Mestre da Aritmética",
    description: "Complete todas as lições do planeta Aritmética",
    icon: "🌙",
    unlocked: false,
    rarity: "rare",
    category: "exploration",
  },

  // Mastery achievements
  {
    id: "level-5",
    title: "Aprendiz Estelar",
    description: "Alcance o nível 5",
    icon: "⭐",
    unlocked: false,
    rarity: "rare",
    category: "mastery",
  },
  {
    id: "level-10",
    title: "Sábio Cósmico",
    description: "Alcance o nível 10",
    icon: "🌌",
    unlocked: false,
    rarity: "epic",
    category: "mastery",
  },
  {
    id: "all-perfect",
    title: "A Perfeição Matemática",
    description: "Complete todas as lições de um planeta com 100% de acerto",
    icon: "👑",
    unlocked: false,
    rarity: "legendary",
    category: "mastery",
  },

  // Secret achievements
  {
    id: "easter-egg",
    title: "???",
    description: "Descubra o segredo oculto na aplicação",
    icon: "🥚",
    unlocked: false,
    rarity: "legendary",
    category: "exploration",
    secret: true,
  },
];

export const getAchievementsByCategory = (category: string) => {
  return achievements.filter(
    (achievement) => achievement.category === category
  );
};

export const getUnlockedAchievements = () => {
  return achievements.filter((achievement) => achievement.unlocked);
};

export const getLockedAchievements = () => {
  return achievements.filter((achievement) => !achievement.unlocked);
};
