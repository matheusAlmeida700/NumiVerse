
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Triangle, Square, Circle, Compass, Planet, CheckCircle, LockIcon, RocketIcon } from 'lucide-react';
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
  arithmetic: {
    name: "Arithmetica",
    description: "Master the fundamentals of numbers, operations, and counting",
    color: "bg-amber-500",
    icon: <Circle className="w-6 h-6" />,
    progress: 85,
    lessons: [
      {
        id: "arithmetic-1",
        title: "Numbers and Counting",
        description: "Learn to count and understand the number system.",
        duration: 10,
        xp: 100,
        completed: true,
        locked: false
      },
      {
        id: "arithmetic-2",
        title: "Addition and Subtraction",
        description: "Master the art of adding and subtracting numbers.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "arithmetic-3",
        title: "Multiplication Tables",
        description: "Memorize multiplication tables and understand their patterns.",
        duration: 20,
        xp: 200,
        completed: false,
        locked: false
      },
      {
        id: "arithmetic-4",
        title: "Division Principles",
        description: "Learn to divide numbers and understand remainders.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: true
      }
    ],
    games: [
      {
        id: "arithmetic-game-1",
        title: "Number Blast",
        description: "Race against time to solve simple arithmetic problems.",
        difficulty: "easy",
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "arithmetic-game-2",
        title: "Calculation Station",
        description: "Practice arithmetic operations in a fun space station setting.",
        difficulty: "medium",
        xp: 300,
        completed: false,
        locked: false
      }
    ]
  },
  algebra: {
    name: "Algebros",
    description: "Explore the world of equations, variables, and problem-solving",
    color: "bg-space-blue",
    icon: <Square className="w-6 h-6" />,
    progress: 60,
    lessons: [
      {
        id: "algebra-1",
        title: "Introduction to Variables",
        description: "Learn how letters can represent numbers in equations.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "algebra-2",
        title: "Solving Simple Equations",
        description: "Master the techniques to find the value of variables.",
        duration: 20,
        xp: 200,
        completed: true,
        locked: false
      },
      {
        id: "algebra-3",
        title: "Linear Equations and Graphs",
        description: "Visualize equations using coordinate planes and graphs.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "algebra-4",
        title: "Quadratic Equations",
        description: "Solve equations with squared variables and factoring.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: true
      }
    ],
    games: [
      {
        id: "algebra-game-1",
        title: "Equation Explorer",
        description: "Navigate through a space maze by solving algebraic equations.",
        difficulty: "medium",
        xp: 250,
        completed: true,
        locked: false
      },
      {
        id: "algebra-game-2",
        title: "Variable Voyage",
        description: "Collect variables and form correct equations in this adventure game.",
        difficulty: "hard",
        xp: 400,
        completed: false,
        locked: false
      }
    ]
  },
  geometry: {
    name: "Geometria",
    description: "Discover shapes, dimensions, and spatial relationships",
    color: "bg-green-500",
    icon: <Triangle className="w-6 h-6" />,
    progress: 40,
    lessons: [
      {
        id: "geometry-1",
        title: "Basic Shapes",
        description: "Learn about circles, triangles, squares, and other polygons.",
        duration: 15,
        xp: 150,
        completed: true,
        locked: false
      },
      {
        id: "geometry-2",
        title: "Area and Perimeter",
        description: "Calculate the area and perimeter of various shapes.",
        duration: 20,
        xp: 200,
        completed: true,
        locked: false
      },
      {
        id: "geometry-3",
        title: "3D Objects and Volume",
        description: "Explore three-dimensional shapes and calculate their volumes.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "geometry-4",
        title: "Geometric Transformations",
        description: "Learn about reflections, rotations, and translations of shapes.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: true
      }
    ],
    games: [
      {
        id: "geometry-game-1",
        title: "Shape Shifter",
        description: "Transform shapes to solve puzzling challenges in space.",
        difficulty: "easy",
        xp: 200,
        completed: true,
        locked: false
      },
      {
        id: "geometry-game-2",
        title: "Cosmic Constructor",
        description: "Build structures using geometric principles to reach distant stars.",
        difficulty: "medium",
        xp: 350,
        completed: false,
        locked: false
      }
    ]
  },
  trigonometry: {
    name: "Trigonia",
    description: "Navigate angles, triangles, and circular functions",
    color: "bg-space-purple",
    icon: <Compass className="w-6 h-6" />,
    progress: 15,
    lessons: [
      {
        id: "trig-1",
        title: "Introduction to Angles",
        description: "Learn about degrees, radians, and angle measurements.",
        duration: 20,
        xp: 200,
        completed: true,
        locked: false
      },
      {
        id: "trig-2",
        title: "Sine, Cosine, and Tangent",
        description: "Understand the fundamental trigonometric functions.",
        duration: 25,
        xp: 250,
        completed: false,
        locked: false
      },
      {
        id: "trig-3",
        title: "Trigonometric Identities",
        description: "Explore relationships between trigonometric functions.",
        duration: 30,
        xp: 300,
        completed: false,
        locked: true
      },
      {
        id: "trig-4",
        title: "Applied Trigonometry",
        description: "Use trigonometry to solve real-world problems.",
        duration: 35,
        xp: 350,
        completed: false,
        locked: true
      }
    ],
    games: [
      {
        id: "trig-game-1",
        title: "Angle Astronaut",
        description: "Navigate through space using precise angle calculations.",
        difficulty: "medium",
        xp: 300,
        completed: false,
        locked: false
      },
      {
        id: "trig-game-2",
        title: "Sine Wave Surfer",
        description: "Ride trigonometric waves to collect cosmic treasures.",
        difficulty: "hard",
        xp: 450,
        completed: false,
        locked: true
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
    return <div className="flex items-center justify-center h-[80vh]">Planet not found</div>;
  }
  
  const planet = planetsData[planetId as keyof typeof planetsData];
  
  const startLesson = (lesson: LessonType) => {
    if (lesson.locked) {
      toast({
        title: "Lesson Locked",
        description: "Complete previous lessons to unlock this one.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Lesson Started",
      description: `Starting ${lesson.title}. Good luck!`,
    });
    // In a real app, navigate to lesson page
  };
  
  const playGame = (game: GameType) => {
    if (game.locked) {
      toast({
        title: "Game Locked",
        description: "Complete required lessons to unlock this game.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Game Started",
      description: `Starting ${game.title}. Have fun!`,
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
                  <Star className="w-3 h-3 mr-1 fill-yellow-300" /> 
                  {planet.progress < 50 ? 'BEGINNER' : planet.progress < 80 ? 'INTERMEDIATE' : 'ADVANCED'}
                </Badge>
              </div>
            </div>
            
            <p className="mt-2 text-lg text-white/80">{planet.description}</p>
            
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-white/60">Progress: {planet.progress}%</p>
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
              <TabsTrigger value="lessons" onClick={() => setActiveTabIndex(0)}>Lessons</TabsTrigger>
              <TabsTrigger value="games" onClick={() => setActiveTabIndex(1)}>Games</TabsTrigger>
              <TabsTrigger value="achievements" onClick={() => setActiveTabIndex(2)}>Achievements</TabsTrigger>
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
                          <Star className="w-3 h-3 ml-1 fill-yellow-300 text-yellow-300" />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className={`w-full ${lesson.completed ? 'bg-green-600 hover:bg-green-700' : lesson.locked ? 'bg-gray-700 hover:bg-gray-800' : 'bg-space-purple hover:bg-space-purple/80'}`}
                        onClick={() => startLesson(lesson)}
                        disabled={lesson.locked}
                      >
                        {lesson.completed ? 'Review' : lesson.locked ? 'Locked' : 'Start Lesson'}
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
                          {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                        </Badge>
                        <div className="flex items-center text-sm text-white/60">
                          <span>{game.xp} XP</span>
                          <Star className="w-3 h-3 ml-1 fill-yellow-300 text-yellow-300" />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className={`w-full ${game.completed ? 'bg-green-600 hover:bg-green-700' : game.locked ? 'bg-gray-700 hover:bg-gray-800' : 'bg-space-blue hover:bg-space-blue/80'}`}
                        onClick={() => playGame(game)}
                        disabled={game.locked}
                      >
                        {game.completed ? 'Play Again' : game.locked ? 'Locked' : 'Play Game'}
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
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                      <span>First Step</span>
                    </CardTitle>
                    <CardDescription>Complete your first lesson in {planet.name}</CardDescription>
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
                      <span>Game Master</span>
                    </CardTitle>
                    <CardDescription>Complete all games on {planet.name}</CardDescription>
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
                      <span>Knowledge Explorer</span>
                    </CardTitle>
                    <CardDescription>Finish 75% of lessons on {planet.name}</CardDescription>
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
                      <span>{planet.name} Master</span>
                    </CardTitle>
                    <CardDescription>Complete all lessons and games on {planet.name}</CardDescription>
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
              Return to Solar System
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanetPage;
