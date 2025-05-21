export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
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
    rarity: "common",
    category: "lesson",
  },
  {
    id: "ten-lessons",
    title: "Estudante Dedicado",
    description: "Complete 10 lições",
    icon: "📚",
    rarity: "common",
    category: "lesson",
  },
  {
    id: "perfect-lesson",
    title: "Perfeição",
    description: "Complete uma lição com 100% de acerto",
    icon: "💯",
    rarity: "rare",
    category: "lesson",
  },

  {
    id: "three-day-streak",
    title: "Comprometido",
    description: "Mantenha uma sequência de aprendizado de 3 dias",
    icon: "🔥",
    rarity: "common",
    category: "streak",
  },
  {
    id: "seven-day-streak",
    title: "Hábito Saudável",
    description: "Mantenha uma sequência de aprendizado de 7 dias",
    icon: "📅",
    rarity: "rare",
    category: "streak",
  },
  {
    id: "thirty-day-streak",
    title: "Inabalável",
    description: "Mantenha uma sequência de aprendizado de 30 dias",
    icon: "🏆",
    rarity: "legendary",
    category: "streak",
  },

  {
    id: "all-planets",
    title: "Explorador Espacial",
    description: "Visite todos os planetas",
    icon: "🚀",
    rarity: "epic",
    category: "exploration",
  },
  {
    id: "algebra-master",
    title: "Mestre da Álgebra",
    description: "Complete todas as lições do planeta Álgebra",
    icon: "🌞",
    rarity: "rare",
    category: "exploration",
  },
  {
    id: "arithmetic-master",
    title: "Mestre da Aritmética",
    description: "Complete todas as lições do planeta Aritmética",
    icon: "🌙",
    rarity: "rare",
    category: "exploration",
  },

  {
    id: "level-5",
    title: "Aprendiz Estelar",
    description: "Alcance o nível 5",
    icon: "⭐",
    rarity: "rare",
    category: "mastery",
  },
  {
    id: "level-10",
    title: "Sábio Cósmico",
    description: "Alcance o nível 10",
    icon: "🌌",
    rarity: "epic",
    category: "mastery",
  },
  {
    id: "all-perfect",
    title: "A Perfeição Matemática",
    description: "Complete todas as lições de um planeta com 100% de acerto",
    icon: "👑",
    rarity: "legendary",
    category: "mastery",
  },

  {
    id: "easter-egg",
    title: "???",
    description: "Descubra o segredo oculto na aplicação",
    icon: "🥚",
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
