import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EquationSolverGame from "@/components/Games/EquationSolverGame";
import SlidingPuzzleGame from "@/components/Games/SlidingPuzzleGame";
import MemoryMathGame from "@/components/Games/MemoryMathGame";
import MiniSudokuGame from "@/components/Games/MiniSudokuGame";
import SumPuzzleGame from "@/components/Games/SumPuzzleGame";
import LogicRiddlesGame from "@/components/Games/LogicRiddlesGame";

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { toast } = useToast();

  useEffect(() => {
    document.title = `NumiVerse - ${gameId?.replace(/-/g, " ")}`;
  }, [gameId]);

  const handleGameComplete = (score: number) => {
    toast({
      title: "Jogo Concluído!",
      description: `Você ganhou ${score} pontos de XP!`,
    });
  };

  const renderGame = () => {
    switch (gameId) {
      case "equation-solver":
        return (
          <EquationSolverGame
            onComplete={handleGameComplete}
            difficulty="medium"
          />
        );
      case "sliding-puzzle":
        return <SlidingPuzzleGame onComplete={handleGameComplete} />;
      case "memory-math":
        return <MemoryMathGame onComplete={handleGameComplete} />;
      case "mini-sudoku":
        return <MiniSudokuGame onComplete={handleGameComplete} />;
      case "sum-puzzle":
        return <SumPuzzleGame onComplete={handleGameComplete} />;
      case "logic-riddles":
        return <LogicRiddlesGame onComplete={handleGameComplete} />;
      default:
        return (
          <div className="text-center p-8 bg-card/50 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Jogo não encontrado
            </h3>
            <p className="text-white/70">
              O jogo solicitado não foi encontrado.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      <div className="space-stars"></div>

      <NavBar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto pt-32">
          <div className="mb-12">{renderGame()}</div>

          <div className="flex justify-center">
            <Link to="/games">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                Voltar aos Jogos
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GamePage;
