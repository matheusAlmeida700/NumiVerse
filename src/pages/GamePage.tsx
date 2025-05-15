import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EquationGame from "@/components/EquationGame";

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { toast } = useToast();

  useEffect(() => {
    document.title = `NumiVerse - ${gameId?.replace(/-/g, " ")}`;
  }, [gameId]);

  const handleGameComplete = (score: number) => {
    toast({
      title: "Game Complete!",
      description: `You earned ${score} XP and unlocked a new achievement.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      {/* Space background */}
      <div className="space-stars"></div>

      <NavBar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {gameId
                ?.split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
          </div>

          <div className="mb-12">
            <EquationGame onComplete={handleGameComplete} difficulty="medium" />
          </div>

          <div className="flex justify-center">
            <Link to={`/planet/algebra`}>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                Voltar
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
