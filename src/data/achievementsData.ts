export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "comum" | "raro" | "épico" | "lendário";
  category: "lesson" | "streak" | "mastery";
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
    id: "five-lessons",
    title: "Estudante Dedicado",
    description: "Complete 5 lições",
    icon: "/images/feedback/correct1.png",
    rarity: "comum",
    category: "lesson",
  },
  {
    id: "ten-lessons",
    title: "Mentor em Formação",
    description: "Complete 10 lições",
    icon: "/images/feedback/correct4.png",
    rarity: "raro",
    category: "lesson",
  },
  {
    id: "twenty-five-lessons",
    title: "Mestre do Conhecimento",
    description: "Complete 25 lições",
    icon: "/images/feedback/correct5.png",
    rarity: "épico",
    category: "lesson",
  },
  {
    id: "xp-100",
    title: "Início da Jornada",
    description: "Atinga 100 XP e inicie sua jornada de aprendizado.",
    icon: "/images/feedback/correct7.png",
    rarity: "comum",
    category: "mastery",
  },
  {
    id: "xp-500",
    title: "Aprendiz em Ascensão",
    description: "Atinga 500 XP em sua jornada.",
    icon: "/images/feedback/incorrect1.png",
    rarity: "comum",
    category: "mastery",
  },
  {
    id: "xp-1000",
    title: "Conhecimento Consolidado",
    description: "Atinga 1000 XP e prove sua dedicação.",
    icon: "/images/feedback/incorrect2.png",
    rarity: "raro",
    category: "mastery",
  },
  {
    id: "xp-5000",
    title: "Sábio Venerado",
    description: "Atinga 5000 XP acumulados.",
    icon: "/images/feedback/incorrect3.png",
    rarity: "épico",
    category: "mastery",
  },
  {
    id: "xp-10000",
    title: "Lenda do Conhecimento",
    description: "Ultrapasse a marca de 10000 XP.",
    icon: "/images/feedback/incorrect5.png",
    rarity: "lendário",
    category: "mastery",
  },
];

export const getAchievementsByCategory = (category: string) => {
  return achievements.filter(
    (achievement) => achievement.category === category
  );
};
