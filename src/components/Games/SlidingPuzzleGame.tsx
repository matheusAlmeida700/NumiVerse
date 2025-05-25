import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, Trophy, Shuffle } from "lucide-react";

interface SlidingPuzzleGameProps {
  onComplete: (score: number) => void;
}

const SlidingPuzzleGame = ({ onComplete }: SlidingPuzzleGameProps) => {
  const { toast } = useToast();
  const [board, setBoard] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const winningBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

  const initializeBoard = () => {
    let newBoard = [...winningBoard];
    for (let i = 0; i < 1000; i++) {
      const emptyIndex = newBoard.indexOf(0);
      const validMoves = getValidMoves(emptyIndex);
      if (validMoves.length > 0) {
        const randomMove =
          validMoves[Math.floor(Math.random() * validMoves.length)];
        [newBoard[emptyIndex], newBoard[randomMove]] = [
          newBoard[randomMove],
          newBoard[emptyIndex],
        ];
      }
    }
    setBoard(newBoard);
  };

  const getValidMoves = (emptyIndex: number) => {
    const validMoves = [];
    const row = Math.floor(emptyIndex / 4);
    const col = emptyIndex % 4;

    if (row > 0) validMoves.push(emptyIndex - 4);
    if (row < 3) validMoves.push(emptyIndex + 4);
    if (col > 0) validMoves.push(emptyIndex - 1);
    if (col < 3) validMoves.push(emptyIndex + 1);

    return validMoves;
  };

  const handleTileClick = (index: number) => {
    if (!isGameStarted || isGameWon) return;

    const emptyIndex = board.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);

    if (validMoves.includes(index)) {
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[index]] = [
        newBoard[index],
        newBoard[emptyIndex],
      ];
      setBoard(newBoard);
      setMoves(moves + 1);

      if (JSON.stringify(newBoard) === JSON.stringify(winningBoard)) {
        setIsGameWon(true);
        const finalTime = Date.now() - startTime;
        const score = Math.max(
          1000 - moves * 5 - Math.floor(finalTime / 1000),
          100
        );
        toast({
          title: "Parabéns!",
          description: `Puzzle resolvido em ${moves} movimentos!`,
        });
        onComplete(score);
      }
    }
  };

  const startGame = () => {
    initializeBoard();
    setMoves(0);
    setIsGameStarted(true);
    setIsGameWon(false);
    setStartTime(Date.now());
  };

  const resetGame = () => {
    initializeBoard();
    setMoves(0);
  };

  useEffect(() => {
    if (isGameStarted && !isGameWon) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isGameStarted, isGameWon, startTime]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  if (!isGameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3X3 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Quebra-cabeça Deslizante
          </h2>
          <p className="text-white/70">
            Organize os números de 1 a 15 na ordem correta!
          </p>
        </div>

        <div className="space-y-4 w-full">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Como Jogar:</h3>
            <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
              <li>Clique nas peças adjacentes ao espaço vazio para movê-las</li>
              <li>Organize os números de 1 a 15 em ordem</li>
              <li>O espaço vazio deve ficar no canto inferior direito</li>
              <li>Tente resolver com o menor número de movimentos possível</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={startGame}
          className="mt-6 bg-green-500 hover:bg-green-600 w-full"
        >
          Começar Jogo
        </Button>
      </div>
    );
  }

  if (isGameWon) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Puzzle Resolvido!
          </h2>
          <p className="text-white/70">Excelente trabalho!</p>
        </div>

        <div className="w-full bg-white/5 p-6 rounded-lg text-center mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-white/80 mb-1">Movimentos</p>
              <p className="text-2xl font-bold text-white">{moves}</p>
            </div>
            <div>
              <p className="text-white/80 mb-1">Tempo</p>
              <p className="text-2xl font-bold text-white">
                {formatTime(elapsedTime)}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 w-full"
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
          <Badge className="bg-green-500 px-3 py-1">Movimentos: {moves}</Badge>
          <Badge className="bg-blue-500 px-3 py-1">
            {formatTime(elapsedTime)}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={resetGame}
            size="sm"
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 w-80 h-80 mb-4">
        {board.map((tile, index) => (
          <div
            key={index}
            onClick={() => handleTileClick(index)}
            className={`
              flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer transition-all
              ${
                tile === 0
                  ? "bg-transparent"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
              }
            `}
          >
            {tile !== 0 && tile}
          </div>
        ))}
      </div>

      <p className="text-white/60 text-sm text-center">
        Clique nas peças adjacentes ao espaço vazio para movê-las
      </p>
    </div>
  );
};

export default SlidingPuzzleGame;
