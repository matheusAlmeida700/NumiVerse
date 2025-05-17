import { ReactNode } from "react";
import { Sun, Moon, Earth, Calculator, Triangle } from "lucide-react";

export interface Planet {
  id: string;
  name: string;
  description: string;
  color: string;
  glowColor: string;
  size: number;
  icon: () => ReactNode;
  position: { x: number; y: number };
  unlocked: boolean;
  progress: number;
  orbitSpeed: number;
  totalLessons: number;
  totalGames: number;
}

// Define icon creators as functions that will be called later when rendering
export const planets = [
  {
    id: "algebra",
    name: "Sol (Álgebra)",
    description:
      "Explore o mundo das equações, variáveis e resolução de problemas",
    color: "bg-yellow-500",
    glowColor: "bg-yellow-500/40",
    size: 100,
    icon: () => <Sun className="w-6 h-6" />,
    position: { x: 0, y: 0 },
    unlocked: true,
    progress: 25,
    orbitSpeed: 0, // Sun doesn't orbit
    totalLessons: 5,
    totalGames: 2,
  },
  {
    id: "aritmetica",
    name: "Lua (Aritmética)",
    description: "Domine os fundamentos dos números, operações e contagens",
    color: "bg-slate-300",
    glowColor: "bg-slate-300/40",
    size: 60,
    icon: () => <Moon className="w-6 h-6" />,
    position: { x: -150, y: -150 },
    unlocked: true,
    progress: 40,
    orbitSpeed: 30,
    totalLessons: 5,
    totalGames: 2,
  },
  {
    id: "estatistica",
    name: "Terra (Estatística)",
    description: "Analise dados, probabilidade e métodos estatísticos",
    color: "bg-blue-500",
    glowColor: "bg-blue-500/40",
    size: 80,
    icon: () => <Earth className="w-6 h-6" />,
    position: { x: 150, y: -150 },
    unlocked: true,
    progress: 15,
    orbitSpeed: 50,
    totalLessons: 5,
    totalGames: 2,
  },
  {
    id: "funcoes",
    name: "Saturno (Funções)",
    description:
      "Compreenda relações matemáticas e suas representações gráficas",
    color: "bg-amber-300",
    glowColor: "bg-amber-300/40",
    size: 90,
    icon: () => <Calculator className="w-6 h-6" />,
    position: { x: 200, y: 100 },
    unlocked: true,
    progress: 5,
    orbitSpeed: 40,
    totalLessons: 5,
    totalGames: 2,
  },
  {
    id: "geometria",
    name: "Urano (Geometria)",
    description: "Descubra formas, dimensões e relações espaciais",
    color: "bg-green-500",
    glowColor: "bg-green-500/40",
    size: 70,
    icon: () => <Triangle className="w-6 h-6" />,
    position: { x: -200, y: 150 },
    unlocked: true,
    progress: 10,
    orbitSpeed: 60,
    totalLessons: 5,
    totalGames: 2,
  },
];

export const getPlanetById = (planetId: string) => {
  return planets.find((planet) => planet.id === planetId);
};
