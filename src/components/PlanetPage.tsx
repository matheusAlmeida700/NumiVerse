
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, Earth, Calculator, Triangle, Square, CheckCircle, LockIcon, RocketIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  completed: boolean;
  locked: boolean;
}

const planetsData = {
  algebra: {
    name: "Sol (Álgebra)",
    description: "Explore o mundo das equações, variáveis e resolução de problemas",
    color: "bg-yellow-500",
    icon: <Sun className="w-6 h-6" />,
    progress: 85,
    lessons: [
      {
        id: "algebra-1",
        title: "Expressões Algébricas",
        description: "Aprenda a trabalhar com expressões algébricas e suas propriedades.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "algebra-2",
        title: "Equações do 1º Grau",
        description: "Domine as técnicas para resolver equações de primeiro grau.",
        duration: 20,
        xp: 200,
        completed: true,
        locked: false
      },
      {
        id: "algebra-3",
        title: "Equações do 2º Grau",
        description: "Aprenda a resolver equações do segundo grau usando fórmulas e gráficos.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "algebra-4",
        title: "Sistemas de Equações",
        description: "Resolva sistemas de equações usando diferentes métodos.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: false
      },
      {
        id: "algebra-5",
        title: "Produtos Notáveis e Fatoração",
        description: "Aprenda a simplificar expressões algébricas usando produtos notáveis e fatoração.",
        duration: 30,
        xp: 350,
        completed: false,
        locked: false
      }
    ],
    games: [
      {
        id: "algebra-game-1",
        title: "Explorador de Equações",
        description: "Navegue por um labirinto espacial resolvendo equações algébricas.",
        difficulty: "medium" as const,
        xp: 250,
        completed: true,
        locked: false
      },
      {
        id: "algebra-game-2",
        title: "Viagem das Variáveis",
        description: "Colete variáveis e forme equações corretas neste jogo de aventura.",
        difficulty: "hard" as const,
        xp: 400,
        completed: false,
        locked: false
      }
    ]
  },
  aritmetica: {
    name: "Lua (Aritmética)",
    description: "Domine os fundamentos dos números, operações e contagens",
    color: "bg-slate-300",
    icon: <Moon className="w-6 h-6" />,
    progress: 60,
    lessons: [
      {
        id: "aritmetica-1",
        title: "Números Naturais e Inteiros",
        description: "Compreenda os conjuntos numéricos e suas propriedades.",
        duration: 10,
        xp: 100,
        completed: true,
        locked: false
      },
      {
        id: "aritmetica-2",
        title: "Frações e Decimais",
        description: "Aprenda a trabalhar com frações e números decimais.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "aritmetica-3",
        title: "Múltiplos, MMC e MDC",
        description: "Entenda os conceitos de múltiplos, mínimo múltiplo comum e máximo divisor comum.",
        duration: 20,
        xp: 200,
        completed: false,
        locked: false
      },
      {
        id: "aritmetica-4",
        title: "Porcentagens e Proporções",
        description: "Aprenda a trabalhar com porcentagens e proporções em problemas práticos.",
        duration: 20,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "aritmetica-5",
        title: "Potências e Raízes",
        description: "Compreenda potências, raízes e suas propriedades.",
        duration: 25,
        xp: 300,
        completed: false,
        locked: false
      }
    ],
    games: [
      {
        id: "aritmetica-game-1",
        title: "Explosão de Números",
        description: "Corra contra o tempo para resolver problemas simples de aritmética.",
        difficulty: "easy" as const,
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "aritmetica-game-2",
        title: "Estação de Cálculo",
        description: "Pratique operações aritméticas em um cenário divertido de estação espacial.",
        difficulty: "medium" as const,
        xp: 300,
        completed: false,
        locked: false
      }
    ]
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
        description: "Aprenda a interpretar diferentes tipos de gráficos estatísticos.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "estatistica-2",
        title: "Tabelas e Organização de Dados",
        description: "Saiba como organizar dados em tabelas para facilitar análises.",
        duration: 20,
        xp: 200,
        completed: true,
        locked: false
      },
      {
        id: "estatistica-3",
        title: "Média, Moda e Mediana",
        description: "Entenda as medidas de tendência central e sua importância.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "estatistica-4",
        title: "Probabilidade Básica",
        description: "Aprenda os conceitos fundamentais de probabilidade.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "estatistica-5",
        title: "Análise de Dados na Vida Real",
        description: "Aplique conceitos estatísticos em situações reais e tome decisões baseadas em dados.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: false
      }
    ],
    games: [
      {
        id: "estatistica-game-1",
        title: "Caçador de Dados",
        description: "Colete e analise dados em uma missão espacial interativa.",
        difficulty: "medium" as const,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "estatistica-game-2",
        title: "Probabilidade Planetária",
        description: "Calcule probabilidades para prever eventos em diferentes planetas.",
        difficulty: "hard" as const,
        xp: 350,
        completed: false,
        locked: false
      }
    ]
  },
  funcoes: {
    name: "Saturno (Funções)",
    description: "Compreenda relações matemáticas e suas representações gráficas",
    color: "bg-amber-300",
    icon: <Calculator className="w-6 h-6" />,
    progress: 30,
    lessons: [
      {
        id: "funcoes-1",
        title: "Introdução às Funções",
        description: "Conheça o conceito de função, domínio, contradomínio e imagem.",
        duration: 20,
        xp: 200,
        completed: true,
        locked: false
      },
      {
        id: "funcoes-2",
        title: "Funções Lineares",
        description: "Explore funções de primeiro grau e suas aplicações.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "funcoes-3",
        title: "Funções Quadráticas",
        description: "Estude funções de segundo grau, suas propriedades e gráficos.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: false
      },
      {
        id: "funcoes-4",
        title: "Funções Exponenciais",
        description: "Compreenda funções exponenciais e seus comportamentos.",
        duration: 30,
        xp: 350,
        completed: false,
        locked: false
      },
      {
        id: "funcoes-5",
        title: "Leitura e Comparação de Gráficos",
        description: "Analise e compare diferentes tipos de gráficos de funções.",
        duration: 25,
        xp: 300,
        completed: false,
        locked: false
      }
    ],
    games: [
      {
        id: "funcoes-game-1",
        title: "Construtor de Gráficos",
        description: "Construa gráficos para resolver desafios intergalácticos.",
        difficulty: "medium" as const,
        xp: 300,
        completed: false,
        locked: false
      },
      {
        id: "funcoes-game-2",
        title: "Corrida de Funções",
        description: "Compita para encontrar a função que melhor se ajusta a uma situação.",
        difficulty: "hard" as const,
        xp: 400,
        completed: false,
        locked: false
      }
    ]
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
        description: "Conheça as principais figuras planas e calcule seus perímetros.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "geometria-2",
        title: "Área das Principais Figuras",
        description: "Aprenda a calcular áreas de diversas figuras geométricas.",
        duration: 20,
        xp: 200,
        completed: false,
        locked: false
      },
      {
        id: "geometria-3",
        title: "Sólidos e Volume",
        description: "Explore figuras tridimensionais e calcule seus volumes.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "geometria-4",
        title: "Ângulos e Paralelismo",
        description: "Estude ângulos, paralelismo e suas propriedades.",
        duration: 25,
        xp: 300,
        completed: false,
        locked: false
      },
      {
        id: "geometria-5",
        title: "Teorema de Pitágoras e Triângulos",
        description: "Compreenda o teorema de Pitágoras e suas aplicações.",
        duration: 30,
        xp: 350,
        completed: false,
        locked: false
      }
    ],
    games: [
      {
        id: "geometria-game-1",
        title: "Modelador de Formas",
        description: "Transforme formas para resolver desafios espaciais.",
        difficulty: "easy" as const,
        xp: 200,
        completed: false,
        locked: false
      },
      {
        id: "geometria-game-2",
        title: "Construtor Cósmico",
        description: "Construa estruturas usando princípios geométricos para alcançar estrelas distantes.",
        difficulty: "medium" as const,
        xp: 350,
        completed: false,
        locked: false
      }
    ]
  },
};

const PlanetPage = () => {
  const { planetId } = useParams();
  const { toast } = useToast();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // Check if the planet exists
  if (!planetId || !planetsData[planetId as keyof typeof planetsData]) {
    return <div className="flex items-center justify-center h-[80vh]">Planeta não encontrado</div>;
  }
  
  const planet = planetsData[planetId as keyof typeof planetsData];
  
  const startLesson = (lesson: LessonType) => {
    if (lesson.locked) {
      toast({
        title: "Lição Bloqueada",
        description: "Complete as lições anteriores para desbloquear esta.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Lição Iniciada",
      description: `Iniciando ${lesson.title}. Boa sorte!`,
    });
    // In a real app, navigate to lesson page
  };
  
  const playGame = (game: GameType) => {
    if (game.locked) {
      toast({
        title: "Jogo Bloqueado",
        description: "Complete as lições necessárias para desbloquear este jogo.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Jogo Iniciado",
      description: `Iniciando ${game.title}. Divirta-se!`,
    });
    // In a real app, navigate to game page
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Planet header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className={`w-24 h-24 ${planet.color} rounded-full flex items-center justify-center`}>
              {planet.icon}
            </div>
            <div className={`absolute inset-0 ${planet.color.replace('bg-', 'bg-')}/40 rounded-full blur-xl -z-10`}></div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{planet.name}</h1>
              <div className="flex items-center justify-center md:justify-start">
                <Badge variant="outline" className="text-yellow-300 border-yellow-300/30">
                  <Sun className="w-3 h-3 mr-1 fill-yellow-300" /> 
                  {planet.progress < 50 ? 'INICIANTE' : planet.progress < 80 ? 'INTERMEDIÁRIO' : 'AVANÇADO'}
                </Badge>
              </div>
            </div>
            
            <p className="mt-2 text-lg text-white/80">{planet.description}</p>
            
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-white/60">Progresso: {planet.progress}%</p>
                <div className="flex-1 max-w-md">
                  <Progress value={planet.progress} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="mt-12">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="lessons" onClick={() => setActiveTabIndex(0)}>Lições</TabsTrigger>
              <TabsTrigger value="games" onClick={() => setActiveTabIndex(1)}>Jogos</TabsTrigger>
              <TabsTrigger value="achievements" onClick={() => setActiveTabIndex(2)}>Conquistas</TabsTrigger>
            </TabsList>
            
            {/* Lessons tab */}
            <TabsContent value="lessons" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planet.lessons.map((lesson) => (
                  <Card key={lesson.id} className={`bg-card border-white/10 overflow-hidden ${lesson.locked ? 'opacity-70' : ''}`}>
                    <div className="relative">
                      <div className={`absolute right-3 top-3 z-10 ${lesson.completed ? 'text-green-500' : lesson.locked ? 'text-white/40' : 'text-white/70'}`}>
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
                        className={`w-full ${lesson.completed ? 'bg-green-600 hover:bg-green-700' : lesson.locked ? 'bg-gray-700 hover:bg-gray-800' : 'bg-space-purple hover:bg-space-purple/80'}`}
                        onClick={() => startLesson(lesson)}
                        disabled={lesson.locked}
                      >
                        {lesson.completed ? 'Revisar' : lesson.locked ? 'Bloqueado' : 'Iniciar Lição'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Games tab */}
            <TabsContent value="games" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planet.games.map((game) => (
                  <Card key={game.id} className={`bg-card border-white/10 overflow-hidden ${game.locked ? 'opacity-70' : ''}`}>
                    <div className="relative">
                      <div className={`absolute right-3 top-3 z-10 ${game.completed ? 'text-green-500' : game.locked ? 'text-white/40' : 'text-white/70'}`}>
                        {game.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : game.locked ? (
                          <LockIcon className="w-5 h-5" />
                        ) : null}
                      </div>
                      <div className="h-24 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-sky-500/20 flex items-center justify-center">
                        <RocketIcon className={`w-12 h-12 ${game.locked ? 'text-white/20' : 'text-white'}`} />
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-white">{game.title}</CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant={game.difficulty === 'easy' ? 'outline' : game.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                          {game.difficulty === 'easy' ? 'Fácil' : game.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                        </Badge>
                        <div className="flex items-center text-sm text-white/60">
                          <span>{game.xp} XP</span>
                          <Sun className="w-3 h-3 ml-1 fill-yellow-300 text-yellow-300" />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className={`w-full ${game.completed ? 'bg-green-600 hover:bg-green-700' : game.locked ? 'bg-gray-700 hover:bg-gray-800' : 'bg-space-blue hover:bg-space-blue/80'}`}
                        onClick={() => playGame(game)}
                        disabled={game.locked}
                      >
                        {game.completed ? 'Jogar Novamente' : game.locked ? 'Bloqueado' : 'Jogar'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Achievements tab */}
            <TabsContent value="achievements" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Achievement cards */}
                <Card className="bg-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Sun className="w-5 h-5 text-yellow-500" />
                      </div>
                      <span>Primeiro Passo</span>
                    </CardTitle>
                    <CardDescription>Complete sua primeira lição em {planet.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Progress value={100} className="h-2" />
                      <span className="ml-2 text-xs text-white/60">100%</span>
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
                    <CardDescription>Complete todos os jogos em {planet.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Progress value={50} className="h-2" />
                      <span className="ml-2 text-xs text-white/60">1/2</span>
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
                    <CardDescription>Termine 75% das lições em {planet.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Progress value={50} className="h-2" />
                      <span className="ml-2 text-xs text-white/60">50%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-white/10 opacity-50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <LockIcon className="w-5 h-5 text-green-500" />
                      </div>
                      <span>Mestre de {planet.name}</span>
                    </CardTitle>
                    <CardDescription>Complete todas as lições e jogos em {planet.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Progress value={33} className="h-2" />
                      <span className="ml-2 text-xs text-white/60">33%</span>
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
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              Voltar ao Sistema Solar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanetPage;
