import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Target, RotateCcw, Trophy } from "lucide-react";

interface SumPuzzleGameProps {
  onComplete: (score: number) => void;
}

const SumPuzzleGame = ({ onComplete }: SumPuzzleGameProps) => {
  const { toast } = useToast();
  const [gridSize] = useState(4);
  const [board, setBoard] = useState<number[][]>([]);
  const [targets, setTargets] = useState<{ rows: number[]; cols: number[] }>({
    rows: [],
    cols: [],
  });
  const [currentSums, setCurrentSums] = useState<{
    rows: number[];
    cols: number[];
  }>({ rows: [], cols: [] });
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  const generatePuzzle = (difficulty: "easy" | "medium" | "hard") => {
    const size = 4;
    const maxNum = difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 10;

    const solution = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => Math.floor(Math.random() * maxNum) + 1)
      );

    const rowTargets = solution.map((row) =>
      row.reduce((sum, num) => sum + num, 0)
    );
    const colTargets = Array(size)
      .fill(0)
      .map((_, colIndex) =>
        solution.reduce((sum, row) => sum + row[colIndex], 0)
      );

    const allNumbers = solution.flat();
    const shuffledNumbers = [...allNumbers].sort(() => Math.random() - 0.5);

    return {
      targets: { rows: rowTargets, cols: colTargets },
      availableNumbers: shuffledNumbers,
      solution,
    };
  };

  const calculateCurrentSums = (board: number[][]) => {
    const rows = board.map((row) =>
      row.reduce((sum, num) => sum + (num || 0), 0)
    );
    const cols = Array(gridSize)
      .fill(0)
      .map((_, colIndex) =>
        board.reduce((sum, row) => sum + (row[colIndex] || 0), 0)
      );
    return { rows, cols };
  };

  const handleCellClick = (row: number, col: number) => {
    if (!isGameStarted || isGameWon || !selectedNumber) return;

    const newBoard = board.map((r) => [...r]);

    if (newBoard[row][col] === 0) {
      newBoard[row][col] = selectedNumber;
      setBoard(newBoard);
      setMoves(moves + 1);

      const newAvailable = [...availableNumbers];
      const numIndex = newAvailable.indexOf(selectedNumber);
      if (numIndex > -1) {
        newAvailable.splice(numIndex, 1);
        setAvailableNumbers(newAvailable);
      }

      setSelectedNumber(null);

      const newSums = calculateCurrentSums(newBoard);
      setCurrentSums(newSums);

      if (newAvailable.length === 0) {
        const isCorrect =
          newSums.rows.every((sum, index) => sum === targets.rows[index]) &&
          newSums.cols.every((sum, index) => sum === targets.cols[index]);

        if (isCorrect) {
          setIsGameWon(true);
          const finalTime = Date.now() - startTime;
          const difficultyMultiplier =
            difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2;
          const score = Math.max(
            Math.floor(
              (1000 - moves * 10 - Math.floor(finalTime / 1000)) *
                difficultyMultiplier
            ),
            100
          );
          toast({
            title: "Parabéns!",
            description: `Quebra-cabeça resolvido em ${moves} movimentos!`,
          });
          onComplete(score);
        } else {
          toast({
            title: "Quase lá!",
            description: "Algumas somas não estão corretas. Continue tentando!",
            variant: "destructive",
          });
        }
      }
    } else {
      const removedNumber = newBoard[row][col];
      newBoard[row][col] = 0;
      setBoard(newBoard);
      setAvailableNumbers(
        [...availableNumbers, removedNumber].sort((a, b) => a - b)
      );

      const newSums = calculateCurrentSums(newBoard);
      setCurrentSums(newSums);
    }
  };

  const startGame = (selectedDifficulty: "easy" | "medium" | "hard") => {
    const puzzle = generatePuzzle(selectedDifficulty);
    setDifficulty(selectedDifficulty);
    setBoard(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(0))
    );
    setTargets(puzzle.targets);
    setAvailableNumbers(puzzle.availableNumbers);
    setCurrentSums({
      rows: Array(gridSize).fill(0),
      cols: Array(gridSize).fill(0),
    });
    setSelectedNumber(null);
    setMoves(0);
    setIsGameStarted(true);
    setIsGameWon(false);
    setStartTime(Date.now());
  };

  const resetGame = () => {
    setBoard(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(0))
    );
    setCurrentSums({
      rows: Array(gridSize).fill(0),
      cols: Array(gridSize).fill(0),
    });
    setSelectedNumber(null);
    setMoves(0);
    setStartTime(Date.now());
    const puzzle = generatePuzzle(difficulty);
    setAvailableNumbers(puzzle.availableNumbers);
  };

  useEffect(() => {
    if (isGameStarted && !isGameWon) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
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
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Quebra-cabeça Numérico
          </h2>
          <p className="text-white/70">
            Organize os números para atingir as somas!
          </p>
        </div>

        <div className="space-y-4 w-full">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Como Jogar:</h3>
            <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
              <li>Selecione um número disponível e clique numa célula vazia</li>
              <li>Cada linha e coluna deve somar o valor indicado</li>
              <li>Clique numa célula preenchida para remover o número</li>
              <li>Complete o tabuleiro com todas as somas corretas</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => startGame("easy")}
              className="bg-green-500 hover:bg-green-600 w-full"
            >
              Fácil (números 1-6)
            </Button>
            <Button
              onClick={() => startGame("medium")}
              className="bg-yellow-500 hover:bg-yellow-600 w-full"
            >
              Médio (números 1-8)
            </Button>
            <Button
              onClick={() => startGame("hard")}
              className="bg-red-500 hover:bg-red-600 w-full"
            >
              Difícil (números 1-10)
            </Button>
          </div>
        </div>
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
            Quebra-cabeça Resolvido!
          </h2>
          <p className="text-white/70">Excelente planejamento lógico!</p>
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

        <div className="flex gap-2 w-full">
          <Button
            onClick={() => startGame(difficulty)}
            className="bg-red-500 hover:bg-red-600 flex-1"
          >
            Jogar Novamente
          </Button>
          <Button
            onClick={() => setIsGameStarted(false)}
            variant="outline"
            className="border-white/20 hover:bg-white/10 flex-1"
          >
            Novo Jogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Badge className="bg-red-500 px-3 py-1 capitalize">
            {difficulty}
          </Badge>
          <Badge className="bg-blue-500 px-3 py-1">
            {formatTime(elapsedTime)}
          </Badge>
          <Badge className="bg-green-500 px-3 py-1">Movimentos: {moves}</Badge>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={resetGame}
            size="sm"
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-8 mb-24">
        <div className="relative">
          <div className="grid grid-cols-4 gap-1">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    w-16 h-16 border-2 flex items-center justify-center text-xl font-bold cursor-pointer transition-all
                    ${
                      cell === 0
                        ? "bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10"
                        : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                    }
                    ${selectedNumber ? "hover:bg-red-500/20" : ""}
                  `}
                >
                  {cell !== 0 && cell}
                </div>
              ))
            )}
          </div>

          <div className="absolute -right-16 top-0 flex flex-col gap-1">
            {targets.rows.map((target, index) => (
              <div
                key={`row-${index}`}
                className={`
                  w-12 h-16 flex items-center justify-center text-sm font-bold rounded border-2
                  ${
                    currentSums.rows[index] === target
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "bg-white/5 border-white/20 text-white/70"
                  }
                `}
              >
                {target}
              </div>
            ))}
          </div>

          <div className="absolute -bottom-16 left-0 flex gap-1">
            {targets.cols.map((target, index) => (
              <div
                key={`col-${index}`}
                className={`
                  w-16 h-12 flex items-center justify-center text-sm font-bold rounded border-2
                  ${
                    currentSums.cols[index] === target
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "bg-white/5 border-white/20 text-white/70"
                  }
                `}
              >
                {target}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-white/70 text-sm mb-2 text-center">
          Números Disponíveis:
        </p>
        <div className="flex flex-wrap gap-2 justify-center max-w-md">
          {availableNumbers.map((num, index) => (
            <Button
              key={`${num}-${index}`}
              onClick={() =>
                setSelectedNumber(selectedNumber === num ? null : num)
              }
              className={`
                w-12 h-12 text-white border border-white/20
                ${
                  selectedNumber === num
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-white/10 hover:bg-white/20"
                }
              `}
            >
              {num}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-white/60 text-sm text-center">
        {selectedNumber
          ? `Número ${selectedNumber} selecionado - clique numa célula vazia`
          : "Selecione um número e clique numa célula vazia"}
      </p>
    </div>
  );
};

export default SumPuzzleGame;
