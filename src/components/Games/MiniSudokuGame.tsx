import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Lightbulb, RotateCcw, Trophy } from "lucide-react";

interface MiniSudokuGameProps {
  onComplete: (score: number) => void;
}

const MiniSudokuGame = ({ onComplete }: MiniSudokuGameProps) => {
  const { toast } = useToast();
  const [gridSize, setGridSize] = useState<4 | 6>(4);
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [initialBoard, setInitialBoard] = useState<(number | null)[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const generateSudoku = (size: 4 | 6) => {
    const newBoard = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    if (size === 4) {
      const solution = [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 1, 4, 3],
        [4, 3, 2, 1],
      ];

      const puzzle = solution.map((row) => [...row]);
      const cellsToRemove = 8;

      for (let i = 0; i < cellsToRemove; i++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        puzzle[row][col] = null;
      }

      return puzzle;
    } else {
      const solution = [
        [1, 2, 3, 4, 5, 6],
        [4, 5, 6, 1, 2, 3],
        [2, 3, 1, 6, 4, 5],
        [5, 6, 4, 2, 3, 1],
        [3, 1, 2, 5, 6, 4],
        [6, 4, 5, 3, 1, 2],
      ];

      const puzzle = solution.map((row) => [...row]);
      const cellsToRemove = 18;

      for (let i = 0; i < cellsToRemove; i++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        puzzle[row][col] = null;
      }

      return puzzle;
    }
  };

  const isValidMove = (
    board: (number | null)[][],
    row: number,
    col: number,
    num: number
  ): boolean => {
    for (let c = 0; c < gridSize; c++) {
      if (c !== col && board[row][c] === num) return false;
    }

    for (let r = 0; r < gridSize; r++) {
      if (r !== row && board[r][col] === num) return false;
    }

    const boxRows = gridSize === 4 ? 2 : 2;
    const boxCols = gridSize === 4 ? 2 : 3;
    const boxStartRow = Math.floor(row / boxRows) * boxRows;
    const boxStartCol = Math.floor(col / boxCols) * boxCols;

    for (let r = boxStartRow; r < boxStartRow + boxRows; r++) {
      for (let c = boxStartCol; c < boxStartCol + boxCols; c++) {
        if ((r !== row || c !== col) && board[r][c] === num) return false;
      }
    }

    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (!isGameStarted || isGameWon || initialBoard[row][col] !== null) return;
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || !isGameStarted || isGameWon) return;

    const { row, col } = selectedCell;
    const newBoard = board.map((r) => [...r]);

    if (isValidMove(newBoard, row, col, num)) {
      newBoard[row][col] = num;
      setBoard(newBoard);

      const isSolved = newBoard.every((row) =>
        row.every((cell) => cell !== null)
      );

      if (isSolved) {
        setIsGameWon(true);
        const finalTime = Date.now() - startTime;
        const score = Math.max(
          1000 - mistakes * 50 - hintsUsed * 25 - Math.floor(finalTime / 1000),
          100
        );
        toast({
          title: "Parabéns!",
          description: `Sudoku resolvido com ${mistakes} erros!`,
        });
        onComplete(score);
      }
    } else {
      setMistakes(mistakes + 1);
      toast({
        title: "Movimento inválido!",
        description: "Este número não pode ser colocado nesta posição.",
        variant: "destructive",
      });
    }

    setSelectedCell(null);
  };

  const getHint = () => {
    if (!isGameStarted || isGameWon || hintsUsed >= 3) return;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (board[row][col] === null) {
          for (let num = 1; num <= gridSize; num++) {
            if (isValidMove(board, row, col, num)) {
              const newBoard = board.map((r) => [...r]);
              newBoard[row][col] = num;
              setBoard(newBoard);
              setHintsUsed(hintsUsed + 1);
              toast({
                title: "Dica usada!",
                description: `Número ${num} colocado na posição (${row + 1}, ${
                  col + 1
                }).`,
              });
              return;
            }
          }
        }
      }
    }
  };

  const startGame = (size: 4 | 6) => {
    const newBoard = generateSudoku(size);
    setGridSize(size);
    setBoard(newBoard);
    setInitialBoard(newBoard.map((row) => [...row]));
    setSelectedCell(null);
    setIsGameStarted(true);
    setIsGameWon(false);
    setMistakes(0);
    setHintsUsed(0);
    setStartTime(Date.now());
  };

  const resetGame = () => {
    setBoard(initialBoard.map((row) => [...row]));
    setSelectedCell(null);
    setMistakes(0);
    setHintsUsed(0);
    setStartTime(Date.now());
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
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Puzzle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Mini Sudoku</h2>
          <p className="text-white/70">Resolva o quebra-cabeça lógico!</p>
        </div>

        <div className="space-y-4 w-full">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Como Jogar:</h3>
            <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
              <li>Preencha a grade com números</li>
              <li>Cada linha, coluna e região deve ter números únicos</li>
              <li>4x4: números de 1 a 4</li>
              <li>6x6: números de 1 a 6</li>
              <li>Use dicas quando necessário (máximo 3)</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => startGame(4)}
              className="bg-orange-500 hover:bg-orange-600 flex-1"
            >
              Sudoku 4x4
            </Button>
            <Button
              onClick={() => startGame(6)}
              className="bg-orange-600 hover:bg-orange-700 flex-1"
            >
              Sudoku 6x6
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
            Sudoku Resolvido!
          </h2>
          <p className="text-white/70">Excelente raciocínio lógico!</p>
        </div>

        <div className="w-full bg-white/5 p-6 rounded-lg text-center mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-white/80 mb-1">Tempo</p>
              <p className="text-2xl font-bold text-white">
                {formatTime(elapsedTime)}
              </p>
            </div>
            <div>
              <p className="text-white/80 mb-1">Erros</p>
              <p className="text-2xl font-bold text-white">{mistakes}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            onClick={() => startGame(gridSize)}
            className="bg-orange-500 hover:bg-orange-600 flex-1"
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
          <Badge className="bg-orange-500 px-3 py-1">
            {gridSize}x{gridSize}
          </Badge>
          <Badge className="bg-blue-500 px-3 py-1">
            {formatTime(elapsedTime)}
          </Badge>
          <Badge className="bg-red-500 px-3 py-1">Erros: {mistakes}</Badge>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={getHint}
            size="sm"
            variant="outline"
            className="border-white/20 hover:bg-white/10"
            disabled={hintsUsed >= 3}
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            Dica ({3 - hintsUsed})
          </Button>
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

      <div
        className={`grid gap-1 mb-6 ${
          gridSize === 4 ? "grid-cols-4" : "grid-cols-6"
        }`}
        style={{ width: gridSize === 4 ? "320px" : "480px" }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`
                w-20 h-20 border-2 flex items-center justify-center text-xl font-bold cursor-pointer transition-all
                ${
                  selectedCell?.row === rowIndex &&
                  selectedCell?.col === colIndex
                    ? "bg-orange-500/30 border-orange-500"
                    : "border-white/20 hover:border-white/40"
                }
                ${
                  initialBoard[rowIndex][colIndex] !== null
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : "bg-white/5 hover:bg-white/10 text-white"
                }
                ${
                  (gridSize === 4 &&
                    ((rowIndex < 2 && colIndex < 2) ||
                      (rowIndex < 2 && colIndex >= 2) ||
                      (rowIndex >= 2 && colIndex < 2) ||
                      (rowIndex >= 2 && colIndex >= 2))) ||
                  (gridSize === 6 &&
                    ((rowIndex < 2 && colIndex < 3) ||
                      (rowIndex < 2 && colIndex >= 3) ||
                      (rowIndex >= 2 && rowIndex < 4 && colIndex < 3) ||
                      (rowIndex >= 2 && rowIndex < 4 && colIndex >= 3) ||
                      (rowIndex >= 4 && colIndex < 3) ||
                      (rowIndex >= 4 && colIndex >= 3)))
                    ? rowIndex % 2 === 0 &&
                      colIndex % (gridSize === 4 ? 2 : 3) === 0
                      ? "border-r-4 border-b-4"
                      : rowIndex % 2 === 0
                      ? "border-b-4"
                      : colIndex % (gridSize === 4 ? 2 : 3) === 0
                      ? "border-r-4"
                      : ""
                    : ""
                }
              `}
            >
              {cell || ""}
            </div>
          ))
        )}
      </div>

      <div
        className={`grid gap-2 mb-4 ${
          gridSize === 4 ? "grid-cols-4" : "grid-cols-6"
        }`}
      >
        {Array.from({ length: gridSize }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white border border-white/20"
            disabled={!selectedCell}
          >
            {num}
          </Button>
        ))}
      </div>

      <p className="text-white/60 text-sm text-center">
        Clique numa célula vazia e escolha um número
      </p>
    </div>
  );
};

export default MiniSudokuGame;
