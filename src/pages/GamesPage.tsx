import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gamepad2,
  Calculator,
  Grid3X3,
  Brain,
  Puzzle,
  Target,
  Lightbulb,
} from "lucide-react";

const GamesPage = () => {
  useEffect(() => {
    document.title = "NumiVerse - Jogos";
  }, []);

  const games = [
    {
      id: "equation-solver",
      title: "Resolvedor de Equações",
      description:
        "Resolva equações algébricas em tempo limitado para ganhar pontos",
      icon: Calculator,
      difficulty: "Médio",
      category: "Álgebra",
      color: "bg-blue-500",
    },
    {
      id: "sliding-puzzle",
      title: "Quebra-cabeça Deslizante",
      description:
        "Organize os números de 1 a 15 deslizando as peças no tabuleiro 4x4",
      icon: Grid3X3,
      difficulty: "Médio",
      category: "Lógica",
      color: "bg-green-500",
    },
    {
      id: "memory-math",
      title: "Memória Matemática",
      description:
        "Encontre pares combinando expressões matemáticas com seus resultados",
      icon: Brain,
      difficulty: "Fácil",
      category: "Memória",
      color: "bg-purple-500",
    },
    {
      id: "mini-sudoku",
      title: "Mini Sudoku",
      description:
        "Sudoku simplificado em grades 4x4 e 6x6 com validação em tempo real",
      icon: Puzzle,
      difficulty: "Médio",
      category: "Lógica",
      color: "bg-orange-500",
    },
    {
      id: "sum-puzzle",
      title: "Quebra-cabeça Numérico",
      description:
        "Organize números para que cada linha e coluna atinja valores específicos",
      icon: Target,
      difficulty: "Difícil",
      category: "Estratégia",
      color: "bg-red-500",
    },
    {
      id: "logic-riddles",
      title: "Enigmas Lógicos",
      description:
        "Resolva enigmas complexos com dicas progressivas para desenvolver raciocínio",
      icon: Lightbulb,
      difficulty: "Difícil",
      category: "Raciocínio",
      color: "bg-yellow-500",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800";
      case "Médio":
        return "bg-yellow-100 text-yellow-800";
      case "Difícil":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient poppins">
      <div className="space-stars"></div>

      <NavBar />

      <main className="flex-1 pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Gamepad2 className="w-12 h-12 mr-3 text-space-purple" />
              <h1 className="text-4xl font-bold text-white">Jogos</h1>
            </div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Desenvolva suas habilidades matemáticas através de jogos
              divertidos e desafiadores. Cada jogo foi projetado para fortalecer
              diferentes aspectos do aprendizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => {
              const IconComponent = game.icon;
              return (
                <Card
                  key={game.id}
                  className="bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-12 h-12 ${game.color} rounded-lg flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-white">{game.title}</CardTitle>
                    <CardDescription className="text-white/70">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-white/20 text-white/80"
                      >
                        {game.category}
                      </Badge>
                      <Link to={`/game/${game.id}`}>
                        <Button className="bg-space-purple hover:bg-space-purple/80">
                          Jogar
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GamesPage;
