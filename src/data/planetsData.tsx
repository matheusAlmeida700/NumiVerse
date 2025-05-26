import { ReactNode } from "react";

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

export const planets = [
  {
    id: "algebra",
    name: "Sol (Álgebra)",
    description:
      "Explore o mundo das equações, variáveis e resolução de problemas",
    color: "bg-yellow-500/90",
    size: 100,
    icon: () => (
      <img src="/planets/sun.png" alt="Sol (Álgebra)" className="w-6 h-6" />
    ),
    position: { x: 0, y: 0 },
    unlocked: true,
    orbitSpeed: 0,
  },
  {
    id: "aritmetica",
    name: "Lua (Aritmética)",
    description: "Domine os fundamentos dos números, operações e contagens",
    color: "bg-slate-300/70",
    size: 60,
    icon: () => (
      <img src="/planets/moon.png" alt="Lua (Aritmética)" className="w-6 h-6" />
    ),
    position: { x: -150, y: -150 },
    unlocked: true,
    orbitSpeed: 30,
  },
  {
    id: "estatistica",
    name: "Terra (Estatística)",
    description: "Analise dados, probabilidade e métodos estatísticos",
    color: "bg-blue-500/80",
    size: 80,
    icon: () => (
      <img
        src="/planets/earth.png"
        alt="Terra (Estatística)"
        className="w-6 h-6"
      />
    ),
    position: { x: 150, y: -150 },
    unlocked: true,
    orbitSpeed: 50,
  },
  {
    id: "funcoes",
    name: "Saturno (Funções)",
    description:
      "Compreenda relações matemáticas e suas representações gráficas",
    color: "bg-amber-300/90",
    size: 90,
    icon: () => (
      <img
        src="/planets/saturn.png"
        alt="Saturno (Funções)"
        className="w-8 h-6"
      />
    ),
    position: { x: 200, y: 100 },
    unlocked: true,
    orbitSpeed: 40,
  },
  {
    id: "geometria",
    name: "Netuno (Geometria)",
    description: "Descubra formas, dimensões e relações espaciais",
    color: "bg-green-500/90",
    size: 70,
    icon: () => (
      <img
        src="/planets/netune.png"
        alt="Netuno (Geometria)"
        className="w-7 h-6"
      />
    ),
    position: { x: -200, y: 150 },
    unlocked: true,
    orbitSpeed: 60,
  },
];

export const getPlanetById = (planetId: string) => {
  return planets.find((planet) => planet.id === planetId);
};
