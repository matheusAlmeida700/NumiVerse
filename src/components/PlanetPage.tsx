import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Moon,
  Earth,
  Calculator,
  Triangle,
  CheckCircle,
  LockIcon,
  RocketIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { lessonData } from "@/data/lessonData";
import { isLessonCompleted, getLessonStats } from "@/services/userService";

interface LessonType {
  id: string;
  title: string;
  description: string;
  duration: number;
  xp: number;
  completed: boolean;
  locked: boolean;
}

interface GameType {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  xp: number;
  completed: boolean;
  locked: boolean;
}

const planetsData = {
  algebra: {
    name: "Sol (Álgebra)",
    description:
      "Explore o mundo das equações, variáveis e resolução de problemas",
    color: "bg-yellow-500",
    icon: <Sun className="w-6 h-6" />,
    progress: 0, // Will be calculated dynamically
    lessons: [
      {
        id: "algebra-1",
        title: "Expressões Algébricas",
        description:
          "Aprenda a trabalhar com expressões algébricas e suas propriedades.",
        duration: 15,
        xp: 150,
        completed: false, // Will be updated dynamically
        locked: false,
      },
      {
        id: "algebra-2",
        title: "Equações do 1º Grau",
        description:
          "Domine as técnicas para resolver equações de primeiro grau.",
        duration: 20,
        xp: 200,
        completed: false,
        locked: false,
      },
      {
        id: "algebra-3",
        title: "Equações do 2º Grau",
        description:
          "Aprenda a resolver equações do segundo grau usando fórmulas e gráficos.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false,
      },
      {
        id: "algebra-4",
        title: "Sistemas de Equações",
        description: "Resolva sistemas de equações usando diferentes métodos.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: false,
      },
      {
        id: "algebra-5",
        title: "Produtos Notáveis e Fatoração",
        description:
          "Aprenda a simplificar expressões algébricas usando produtos notáveis e fatoração.",
        duration: 30,
        xp: 350,
        completed: false,
        locked: false,
      },
    ],
    games: [
      {
        id: "algebra-game-1",
        title: "Explorador de Equações",
        description:
          "Navegue por um labirinto espacial resolvendo equações algébricas.",
        difficulty: "medium" as const,
        xp: 250,
        completed: false,
        locked: false,
      },
      {
        id: "algebra-game-2",
        title: "Viagem das Variáveis",
        description:
          "Colete variáveis e forme equações corretas neste jogo de aventura.",
        difficulty: "hard" as const,
        xp: 400,
        completed: false,
        locked: false,
      },
    ],
  },
  aritmetica: {
    name: "Lua (Aritmética)",
    description: "Domine os fundamentos dos números, operações e contagens",
    color: "bg-slate-300",
    icon: <Moon className="w-6 h-6" />,
    progress: 0,
    lessons: [
      {
        id: "aritmetica-1",
        title: "Números Naturais e Inteiros",
        description: "Compreenda os conjuntos numéricos e suas propriedades.",
        duration: 10,
        xp: 100,
        completed: false,
        locked: false,
      },
      {
        id: "aritmetica-2",
        title: "Frações e Decimais",
        description: "Aprenda a trabalhar com frações e números decimais.",
        duration: 15,
        xp: 150,
        completed: false,
        locked: false,
      },
      {
        id: "aritmetica-3",
        title: "Múltiplos, MMC e MDC",
        description:
          "Entenda os conceitos de múltiplos, mínimo múltiplo comum e máximo divisor comum.",
        duration: 20,
        xp: 200,
        completed: false,
        locked: false,
      },
      {
        id: "aritmetica-4",
        title: "Porcentagens e Proporções",
        description:
          "Aprenda a trabalhar com porcentagens e proporções em problemas práticos.",
        duration: 20,
        xp: 250,
        completed: false,
        locked: false,
      },
      {
        id: "aritmetica-5",
        title: "Potências e Raízes",
        description: "Compreenda potências, raízes e suas propriedades.",
        duration: 25,
        xp: 300,
        completed: false,
        locked: false,
      },
    ],
    games: [
      {
        id: "aritmetica-game-1",
        title: "Explosão de Números",
        description:
          "Corra contra o tempo para resolver problemas simples de aritmética.",
        difficulty: "easy" as const,
        xp: 150,
        completed: false,
        locked: false,
      },
      {
        id: "aritmetica-game-2",
        title: "Estação de Cálculo",
        description:
          "Pratique operações aritméticas em um cenário divertido de estação espacial.",
        difficulty: "medium" as const,
        xp: 300,
        completed: false,
        locked: false,
      },
    ],
  },
  estatistica: {
    name: "Terra (Estatística)",
    description: "Analise dados, probabilidade e métodos estatísticos",
    color: "bg-blue-500",
    icon: <Earth className="w-6 h-6" />,
    progress: 40,
    lessons: [
      {
        id: "estatistica-1",
        title: "Leitura de Gráficos",
        description:
          "Aprenda a interpretar diferentes tipos de gráficos estatísticos.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false,
      },
      {
        id: "estatistica-2",
        title: "Tabelas e Organização de Dados",
        description:
          "Saiba como organizar dados em tabelas para facilitar análises.",
        duration: 20,
        xp: 200,
        completed: true,
        locked: false,
      },
      {
        id: "estatistica-3",
        title: "Média, Moda e Mediana",
        description:
          "Entenda as medidas de tendência central e sua importância.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false,
      },
      {
        id: "estatistica-4",
        title: "Probabilidade Básica",
        description: "Aprenda os conceitos fundamentais de probabilidade.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false,
      },
      {
        id: "estatistica-5",
        title: "Análise de Dados na Vida Real",
        description:
          "Aplique conceitos estatísticos em situações reais e tome decisões baseadas em dados.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: false,
      },
    ],
    games: [
      {
        id: "estatistica-game-1",
        title: "Caçador de Dados",
        description:
          "Colete e analise dados em uma missão espacial interativa.",
        difficulty: "medium" as const,
        xp: 250,
        completed: false,
        locked: false,
      },
      {
        id: "estatistica-game-2",
        title: "Probabilidade Planetária",
        description:
          "Calcule probabilidades para prever eventos em diferentes planetas.",
        difficulty: "hard" as const,
        xp: 350,
        completed: false,
        locked: false,
      },
    ],
  },
  funcoes: {
    name: "Saturno (Funções)",
    description:
      "Compreenda relações matemáticas e suas representações gráficas",
    color: "bg-amber-300",
    icon: <Calculator className="w-6 h-6" />,
    progress: 30,
    lessons: [
      {
        id: "funcoes-1",
        title: "Introdução às Funções",
        description:
          "Conheça o conceito de função, domínio, contradomínio e imagem.",
        duration: 20,
        xp: 200,
        completed: true,
        locked: false,
      },
      {
        id: "funcoes-2",
        title: "Funções Lineares",
        description: "Explore funções de primeiro grau e suas aplicações.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false,
      },
      {
        id: "funcoes-3",
        title: "Funções Quadráticas",
        description:
          "Estude funções de segundo grau, suas propriedades e gráficos.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: false,
      },
      {
        id: "funcoes-4",
        title: "Funções Exponenciais",
        description: "Compreenda funções exponenciais e seus comportamentos.",
        duration: 30,
        xp: 350,
        completed: false,
        locked: false,
      },
      {
        id: "funcoes-5",
        title: "Leitura e Comparação de Gráficos",
        description:
          "Analise e compare diferentes tipos de gráficos de funções.",
        duration: 25,
        xp: 300,
        completed: false,
        locked: false,
      },
    ],
    games: [
      {
        id: "funcoes-game-1",
        title: "Construtor de Gráficos",
        description:
          "Construa gráficos para resolver desafios intergalácticos.",
        difficulty: "medium" as const,
        xp: 300,
        completed: false,
        locked: false,
      },
      {
        id: "funcoes-game-2",
        title: "Corrida de Funções",
        description:
          "Compita para encontrar a função que melhor se ajusta a uma situação.",
        difficulty: "hard" as const,
        xp: 400,
        completed: false,
        locked: false,
      },
    ],
  },
  geometria: {
    name: "Urano (Geometria)",
    description: "Descubra formas, dimensões e relações espaciais",
    color: "bg-green-500",
    icon: <Triangle className="w-6 h-6" />,
    progress: 15,
    lessons: [
      {
        id: "geometria-1",
        title: "Figuras Planas e Perímetros",
        description:
          "Conheça as principais figuras planas e calcule seus perímetros.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false,
      },
      {
        id: "geometria-2",
        title: "Área das Principais Figuras",
        description:
          "Aprenda a calcular áreas de diversas figuras geométricas.",
        duration: 20,
        xp: 200,
        completed: false,
        locked: false,
      },
      {
        id: "geometria-3",
        title: "Sólidos e Volume",
        description: "Explore figuras tridimensionais e calcule seus volumes.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false,
      },
      {
        id: "geometria-4",
        title: "Ângulos e Paralelismo",
        description: "Estude ângulos, paralelismo e suas propriedades.",
        duration: 25,
        xp: 300,
        completed: false,
        locked: false,
      },
      {
        id: "geometria-5",
        title: "Teorema de Pitágoras e Triângulos",
        description: "Compreenda o teorema de Pitágoras e suas aplicações.",
        duration: 30,
        xp: 350,
        completed: false,
        locked: false,
      },
    ],
    games: [
      {
        id: "geometria-game-1",
        title: "Modelador de Formas",
        description: "Transforme formas para resolver desafios espaciais.",
        difficulty: "easy" as const,
        xp: 200,
        completed: false,
        locked: false,
      },
      {
        id: "geometria-game-2",
        title: "Construtor Cósmico",
        description:
          "Construa estruturas usando princípios geométricos para alcançar estrelas distantes.",
        difficulty: "medium" as const,
        xp: 350,
        completed: false,
        locked: false,
      },
    ],
  },
};

const PlanetPage = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [planetData, setPlanetData] = useState<any>(null);

  useEffect(() => {
    // Check if the planet exists
    if (!planetId || !planetsData[planetId as keyof typeof planetsData]) {
      toast({
        title: "Erro",
        description: "Planeta não encontrado",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // Clone the planet data to avoid modifying the original
    const planet = JSON.parse(
      JSON.stringify(planetsData[planetId as keyof typeof planetsData])
    );

    // Update completion status for lessons based on localStorage data
    let completedLessons = 0;
    planet.lessons = planet.lessons.map((lesson: LessonType, index: number) => {
      const completed = isLessonCompleted(lesson.id);
      if (completed) completedLessons++;

      // Lock lessons based on previous completion (except the first one)
      const locked =
        index > 0 && !isLessonCompleted(planet.lessons[index - 1].id);

      return {
        ...lesson,
        completed,
        locked,
      };
    });

    // Calculate progress percentage
    const totalLessons = planet.lessons.length;
    planet.progress =
      totalLessons > 0
        ? Math.floor((completedLessons / totalLessons) * 100)
        : 0;

    // Set local state with updated data
    setPlanetData(planet);

    // Update page title
    if (planetId && planetId in planetsData) {
      document.title = `NumiVerse - Explorar ${planetData?.name || ""}`;
    } else {
      document.title = "NumiVerse - Explorar Planeta";
    }
  }, [planetId, navigate, toast]);

  if (!planetData) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const startLesson = (lesson: LessonType) => {
    if (lesson.locked) {
      toast({
        title: "Lição Bloqueada",
        description: "Complete as lições anteriores para desbloquear esta.",
        variant: "destructive",
      });
      return;
    }

    // Navegar para a página da lição
    navigate(`/lesson/${lesson.id}`);
  };

  const playGame = (game: GameType) => {
    if (game.locked) {
      toast({
        title: "Jogo Bloqueado",
        description:
          "Complete as lições necessárias para desbloquear este jogo.",
        variant: "destructive",
      });
      return;
    }

    navigate(`/game/${game.id}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Planet header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div
              className={`w-24 h-24 ${planetData.color} rounded-full flex items-center justify-center`}
            >
              {planetData.icon}
            </div>
            <div
              className={`absolute inset-0 ${planetData.color.replace(
                "bg-",
                "bg-"
              )}/40 rounded-full blur-xl -z-10`}
            ></div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {planetData.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start">
                <Badge
                  variant="outline"
                  className="text-yellow-300 border-yellow-300/30"
                >
                  <Sun className="w-3 h-3 mr-1 fill-yellow-300" />
                  {planetData.progress < 50
                    ? "INICIANTE"
                    : planetData.progress < 80
                    ? "INTERMEDIÁRIO"
                    : "AVANÇADO"}
                </Badge>
              </div>
            </div>

            <p className="mt-2 text-lg text-white/80">
              {planetData.description}
            </p>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-white/60">
                  Progresso: {planetData.progress}%
                </p>
                <div className="flex-1 max-w-md">
                  <Progress value={planetData.progress} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="mt-12">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="lessons" onClick={() => setActiveTabIndex(0)}>
                Lições
              </TabsTrigger>
              <TabsTrigger value="games" onClick={() => setActiveTabIndex(1)}>
                Jogos
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                onClick={() => setActiveTabIndex(2)}
              >
                Conquistas
              </TabsTrigger>
            </TabsList>

            {/* Lessons tab */}
            <TabsContent value="lessons" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planetData.lessons.map((lesson: LessonType) => (
                  <Card
                    key={lesson.id}
                    className={`bg-card border-white/10 overflow-hidden ${
                      lesson.locked ? "opacity-70" : ""
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`absolute right-3 top-3 z-10 ${
                          lesson.completed
                            ? "text-green-500"
                            : lesson.locked
                            ? "text-white/40"
                            : "text-white/70"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : lesson.locked ? (
                          <LockIcon className="w-5 h-5" />
                        ) : null}
                      </div>
                      <div className="h-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <span>{lesson.title}</span>
                      </CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <div className="flex items-center">
                          <span className="mr-4">{lesson.duration} min</span>
                        </div>
                        <div className="flex items-center">
                          <span>{lesson.xp} XP</span>
                          <Sun className="w-3 h-3 ml-1 fill-yellow-300 text-yellow-300" />
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button
                        className={`w-full ${
                          lesson.completed
                            ? "bg-green-600 hover:bg-green-700"
                            : lesson.locked
                            ? "bg-gray-700 hover:bg-gray-800"
                            : "bg-space-purple hover:bg-space-purple/80"
                        }`}
                        onClick={() => startLesson(lesson)}
                        disabled={lesson.locked}
                      >
                        {lesson.completed
                          ? "Revisar"
                          : lesson.locked
                          ? "Bloqueado"
                          : "Iniciar Lição"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Games tab */}
            <TabsContent value="games" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planetData.games.map((game: GameType) => (
                  <Card
                    key={game.id}
                    className={`bg-card border-white/10 overflow-hidden ${
                      game.locked ? "opacity-70" : ""
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`absolute right-3 top-3 z-10 ${
                          game.completed
                            ? "text-green-500"
                            : game.locked
                            ? "text-white/40"
                            : "text-white/70"
                        }`}
                      >
                        {game.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : game.locked ? (
                          <LockIcon className="w-5 h-5" />
                        ) : null}
                      </div>
                      <div className="h-24 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-sky-500/20 flex items-center justify-center">
                        <RocketIcon
                          className={`w-12 h-12 ${
                            game.locked ? "text-white/20" : "text-white"
                          }`}
                        />
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-white">{game.title}</CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            game.difficulty === "easy"
                              ? "outline"
                              : game.difficulty === "medium"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {game.difficulty === "easy"
                            ? "Fácil"
                            : game.difficulty === "medium"
                            ? "Médio"
                            : "Difícil"}
                        </Badge>
                        <div className="flex items-center text-sm text-white/60">
                          <span>{game.xp} XP</span>
                          <Sun className="w-3 h-3 ml-1 fill-yellow-300 text-yellow-300" />
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button
                        className={`w-full ${
                          game.completed
                            ? "bg-green-600 hover:bg-green-700"
                            : game.locked
                            ? "bg-gray-700 hover:bg-gray-800"
                            : "bg-space-blue hover:bg-space-blue/80"
                        }`}
                        onClick={() => playGame(game)}
                        disabled={game.locked}
                      >
                        {game.completed
                          ? "Jogar Novamente"
                          : game.locked
                          ? "Bloqueado"
                          : "Jogar"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements tab */}
            <TabsContent value="achievements" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Achievement cards - these will now be calculated based on actual progress */}
                <Card className="bg-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Sun className="w-5 h-5 text-yellow-500" />
                      </div>
                      <span>Primeiro Passo</span>
                    </CardTitle>
                    <CardDescription>
                      Complete sua primeira lição em {planetData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Progress
                        value={planetData.progress > 0 ? 100 : 0}
                        className="h-2"
                      />
                      <span className="ml-2 text-xs text-white/60">
                        {planetData.progress > 0 ? "100%" : "0%"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <RocketIcon className="w-5 h-5 text-blue-500" />
                      </div>
                      <span>Mestre dos Jogos</span>
                    </CardTitle>
                    <CardDescription>
                      Complete todos os jogos em {planetData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Progress value={0} className="h-2" />
                      <span className="ml-2 text-xs text-white/60">0/2</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-white/10 opacity-50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <LockIcon className="w-5 h-5 text-purple-500" />
                      </div>
                      <span>Explorador do Conhecimento</span>
                    </CardTitle>
                    <CardDescription>
                      Termine 75% das lições em {planetData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Progress
                        value={
                          planetData.progress >= 75
                            ? 100
                            : (planetData.progress / 75) * 100
                        }
                        className="h-2"
                      />
                      <span className="ml-2 text-xs text-white/60">
                        {planetData.progress}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-white/10 opacity-50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <LockIcon className="w-5 h-5 text-green-500" />
                      </div>
                      <span>Mestre de {planetData.name}</span>
                    </CardTitle>
                    <CardDescription>
                      Complete todas as lições e jogos em {planetData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Progress value={planetData.progress} className="h-2" />
                      <span className="ml-2 text-xs text-white/60">
                        {planetData.progress}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Back button */}
        <div className="mt-10 flex justify-center">
          <Link to="/">
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              Voltar ao Sistema Solar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanetPage;
