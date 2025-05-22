export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "comum" | "raro" | "épico" | "lendário";
  category: "lesson" | "streak" | "exploration" | "mastery";
  secret?: boolean;
}

export const achievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "Primeiro Passo",
    description: "Complete sua primeira lição",
    icon: "/images/feedback/correct8.png",
    rarity: "comum",
    category: "streak",
  },
  {
    id: "streak-7",
    title: "Hábito Semanal",
    description: "Mantenha uma sequência de aprendizado por 7 dias",
    icon: "/images/feedback/correct2.png",
    rarity: "comum",
    category: "streak",
  },
  {
    id: "streak-30",
    title: "Mente Determinada",
    description: "Mantenha uma sequência de aprendizado por 30 dias",
    icon: "/images/feedback/correct10.png",
    rarity: "raro",
    category: "streak",
  },
  {
    id: "streak-75",
    title: "Foco Inabalável",
    description: "Mantenha uma sequência de aprendizado por 75 dias",
    icon: "/images/feedback/correct3.png",
    rarity: "raro",
    category: "streak",
  },
  {
    id: "streak-100",
    title: "Centésimo Marco",
    description: "Mantenha uma sequência de aprendizado por 100 dias",
    icon: "/images/feedback/correct13.png",
    rarity: "épico",
    category: "streak",
  },
  {
    id: "streak-365",
    title: "Ciclo Completo",
    description: "Mantenha uma sequência de aprendizado por 365 dias",
    icon: "/images/feedback/correct12.png",
    rarity: "épico",
    category: "streak",
  },
  {
    id: "streak-500",
    title: "Lenda do Conhecimento",
    description: "Mantenha uma sequência de aprendizado por 500 dias",
    icon: "/images/feedback/correct11.png",
    rarity: "lendário",
    category: "streak",
  },
  {
    id: "streak-1000",
    title: "Imortal do Saber",
    description: "Mantenha uma sequência de aprendizado por 1000 dias",
    icon: "/images/feedback/correct6.png",
    rarity: "lendário",
    category: "streak",
  },
  {
    id: "ten-lessons",
    title: "Estudante Dedicado",
    description: "Complete 10 lições",
    icon: "📚",
    rarity: "comum",
    category: "lesson",
  },
  {
    id: "fifty-lessons",
    title: "Mentor em Formação",
    description: "Complete 50 lições",
    icon: "🎓",
    rarity: "raro",
    category: "lesson",
  },
  {
    id: "hundred-lessons",
    title: "Mestre do Conhecimento",
    description: "Complete 100 lições",
    icon: "🏆",
    rarity: "épico",
    category: "lesson",
  },

  {
    id: "all-planets",
    title: "Explorador Espacial",
    description: "Visite todos os planetas",
    icon: "🚀",
    rarity: "épico",
    category: "exploration",
  },
  {
    id: "algebra-master",
    title: "Mestre da Álgebra",
    description: "Complete todas as lições do planeta Álgebra",
    icon: "🌞",
    rarity: "raro",
    category: "exploration",
  },
  {
    id: "arithmetic-master",
    title: "Mestre da Aritmética",
    description: "Complete todas as lições do planeta Aritmética",
    icon: "🌙",
    rarity: "raro",
    category: "exploration",
  },

  {
    id: "level-5",
    title: "Aprendiz Estelar",
    description: "Alcance o nível 5",
    icon: "⭐",
    rarity: "raro",
    category: "mastery",
  },
  {
    id: "level-10",
    title: "Sábio Cósmico",
    description: "Alcance o nível 10",
    icon: "🌌",
    rarity: "épico",
    category: "mastery",
  },
  {
    id: "all-perfect",
    title: "A Perfeição Matemática",
    description: "Complete todas as lições de um planeta com 100% de acerto",
    icon: "👑",
    rarity: "lendário",
    category: "mastery",
  },

  {
    id: "easter-egg",
    title: "???",
    description: "Descubra o segredo oculto na aplicação",
    icon: "🥚",
    rarity: "lendário",
    category: "exploration",
    secret: true,
  },
];

export const getAchievementsByCategory = (category: string) => {
  return achievements.filter(
    (achievement) => achievement.category === category
  );
};
