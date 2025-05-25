import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, Star } from "lucide-react";

interface EquationSolverGameProps {
  onComplete: (score: number) => void;
  difficulty?: "easy" | "medium" | "hard";
}

const EquationSolverGame = ({
  onComplete,
  difficulty = "medium",
}: EquationSolverGameProps) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [streak, setStreak] = useState(0);
  const [equation, setEquation] = useState<{
    problem: string;
    answer: number;
    options: number[];
  }>({
    problem: "",
    answer: 0,
    options: [],
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateEquation = () => {
    let a: number,
      b: number,
      c: number,
      x: number,
      problem: string,
      answer: number;

    switch (difficulty) {
      case "easy":
        x = Math.floor(Math.random() * 10) + 1;
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        problem = `${a}x + ${b} = ${a * x + b}`;
        answer = x;
        break;

      case "medium":
        x = Math.floor(Math.random() * 15) + 1;
        a = Math.floor(Math.random() * 8) + 1;
        b = Math.floor(Math.random() * 30) + 1;
        if (Math.random() > 0.5) {
          problem = `${a}x - ${b} = ${a * x - b}`;
        } else {
          problem = `${a}x + ${b} = ${a * x + b}`;
        }
        answer = x;
        break;

      case "hard":
        x = Math.floor(Math.random() * 20) + 1;
        a = Math.floor(Math.random() * 10) + 2;
        b = Math.floor(Math.random() * 40) + 1;
        c = Math.floor(Math.random() * 50) + 1;
        if (Math.random() > 0.5) {
          problem = `${a}x + ${b} = ${c}`;
          answer = Math.round((c - b) / a);
        } else {
          problem = `${a}x - ${b} = ${c}`;
          answer = Math.round((c + b) / a);
        }
        break;

      default:
        x = Math.floor(Math.random() * 10) + 1;
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        problem = `${a}x + ${b} = ${a * x + b}`;
        answer = x;
    }

    const options = [answer];
    while (options.length < 4) {
      const variation = Math.floor(Math.random() * 8) - 4;
      const option = answer + variation;
      if (!options.includes(option) && option > 0) {
        options.push(option);
      }
    }

    options.sort(() => Math.random() - 0.5);

    return { problem, answer, options };
  };

  const startGame = () => {
    setGameStarted(true);
    setEquation(generateEquation());
    setScore(0);
    setStreak(0);
    setTimeLeft(90);
    setIsGameOver(false);
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === equation.answer) {
      const points = 2 + streak;
      setScore(score + points);
      setStreak(streak + 1);
      toast({
        title: "Correto!",
        description: `+${points} pontos! Sequência: ${streak + 1}`,
        variant: "default",
      });
    } else {
      setStreak(0);
      toast({
        title: "Incorreto!",
        description: `A resposta correta era x = ${equation.answer}`,
        variant: "destructive",
      });
    }

    setEquation(generateEquation());
  };

  const endGame = () => {
    setIsGameOver(true);
    onComplete(score);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (gameStarted && !isGameOver) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameStarted, isGameOver]);

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Resolvedor de Equações
          </h2>
          <p className="text-white/70">
            Resolva o máximo de equações possível em 90 segundos!
          </p>
        </div>

        <div className="space-y-4 w-full">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Como Jogar:</h3>
            <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
              <li>Resolva equações encontrando o valor de x</li>
              <li>Escolha a resposta correta entre as opções</li>
              <li>Ganhe pontos extras por sequências corretas</li>
              <li>Complete o máximo de equações em 90 segundos</li>
            </ul>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">
              Dificuldade:{" "}
              {difficulty === "easy"
                ? "Fácil"
                : difficulty === "medium"
                ? "Médio"
                : "Difícil"}
            </h3>
            <p className="text-sm text-white/70">
              {difficulty === "easy"
                ? "Equações simples com números inteiros pequenos"
                : difficulty === "medium"
                ? "Equações com números positivos e negativos"
                : "Equações avançadas que requerem múltiplos passos"}
            </p>
          </div>
        </div>

        <Button
          onClick={startGame}
          className="mt-6 bg-blue-500 hover:bg-blue-600 w-full"
        >
          Começar Jogo
        </Button>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Jogo Finalizado!
          </h2>
          <p className="text-white/70">Parabéns pelo seu desempenho!</p>
        </div>

        <div className="w-full bg-white/5 p-6 rounded-lg text-center mb-6">
          <p className="text-lg text-white/80 mb-2">Sua Pontuação</p>
          <p className="text-5xl font-bold text-white mb-4">{score}</p>
          <p className="text-sm text-white/60">
            {score < 50
              ? "Continue praticando! Você vai melhorar."
              : score < 100
              ? "Bom trabalho! Você está progredindo."
              : score < 150
              ? "Excelente! Você domina equações básicas."
              : "Incrível! Você é um expert em álgebra!"}
          </p>
        </div>

        <Button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-600 w-full"
        >
          Jogar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-500 px-3 py-1">
            <Star className="w-4 h-4 mr-1" />
            {score}
          </Badge>
          {streak > 0 && (
            <Badge className="bg-green-500 px-3 py-1">
              Sequência: {streak}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white/70" />
          <span className="text-white font-medium">{timeLeft}s</span>
        </div>
      </div>

      <Progress value={(timeLeft / 90) * 100} className="w-full mb-8" />

      <div className="my-8 text-center">
        <p className="text-sm text-white/70 mb-2">Resolva para x:</p>
        <p className="text-4xl font-bold text-white mb-2">{equation.problem}</p>
        <p className="text-white/50">x = ?</p>
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        {equation.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-white/10 hover:bg-blue-500/50 text-white text-xl py-8 border border-white/20 hover:border-blue-400 transition-all"
          >
            x = {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EquationSolverGame;
