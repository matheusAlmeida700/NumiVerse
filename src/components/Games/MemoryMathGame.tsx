import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Brain, Star } from "lucide-react";

interface Card {
  id: number;
  content: string;
  isExpression: boolean;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMathGameProps {
  onComplete: (score: number) => void;
}

const MemoryMathGame = ({ onComplete }: MemoryMathGameProps) => {
  const { toast } = useToast();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [score, setScore] = useState(0);

  const expressions = [
    { expr: "5 + 3", value: 8 },
    { expr: "12 - 4", value: 8 },
    { expr: "2 × 6", value: 12 },
    { expr: "15 ÷ 3", value: 5 },
    { expr: "7 + 8", value: 15 },
    { expr: "20 - 5", value: 15 },
    { expr: "4 × 3", value: 12 },
    { expr: "25 ÷ 5", value: 5 },
  ];

  const initializeGame = () => {
    const gameCards: Card[] = [];
    let id = 0;

    expressions.forEach((item) => {
      gameCards.push({
        id: id++,
        content: item.expr,
        isExpression: true,
        value: item.value,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: id++,
        content: item.value.toString(),
        isExpression: false,
        value: item.value,
        isFlipped: false,
        isMatched: false,
      });
    });

    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const handleCardClick = (cardId: number) => {
    if (!isGameStarted || isGameWon) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2)
      return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card state
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);

      // Check for match after a short delay
      setTimeout(() => {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = cards.find((c) => c.id === firstId);
        const secondCard = cards.find((c) => c.id === secondId);

        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          // Match found
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatches(matches + 1);

          const newScore = score + (100 - moves * 5);
          setScore(newScore);

          toast({
            title: "Par encontrado!",
            description: `+${100 - moves * 5} pontos`,
          });

          if (matches + 1 === expressions.length) {
            setIsGameWon(true);
            onComplete(newScore);
          }
        } else {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
        }

        setFlippedCards([]);
      }, 1000);
    }
  };

  const startGame = () => {
    initializeGame();
    setMoves(0);
    setMatches(0);
    setScore(0);
    setFlippedCards([]);
    setIsGameStarted(true);
    setIsGameWon(false);
  };

  if (!isGameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Memória Matemática
          </h2>
          <p className="text-white/70">
            Encontre pares combinando expressões com seus resultados!
          </p>
        </div>

        <div className="space-y-4 w-full">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Como Jogar:</h3>
            <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
              <li>Clique em duas cartas para virá-las</li>
              <li>Encontre pares que se combinam (expressão + resultado)</li>
              <li>Exemplo: "5 + 3" combina com "8"</li>
              <li>Complete todos os pares para vencer</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={startGame}
          className="mt-6 bg-purple-500 hover:bg-purple-600 w-full"
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
            <Star className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Parabéns!</h2>
          <p className="text-white/70">Você encontrou todos os pares!</p>
        </div>

        <div className="w-full bg-white/5 p-6 rounded-lg text-center mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/80 mb-1">Pontuação</p>
              <p className="text-3xl font-bold text-white">{score}</p>
            </div>
            <div>
              <p className="text-white/80 mb-1">Tentativas</p>
              <p className="text-3xl font-bold text-white">{moves}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={startGame}
          className="bg-purple-500 hover:bg-purple-600 w-full"
        >
          Jogar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Badge className="bg-purple-500 px-3 py-1">
            <Star className="w-4 h-4 mr-1" />
            {score}
          </Badge>
          <Badge className="bg-blue-500 px-3 py-1">Tentativas: {moves}</Badge>
          <Badge className="bg-green-500 px-3 py-1">
            Pares: {matches}/{expressions.length}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-lg">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all
              text-sm font-bold border border-white/20
              ${
                card.isFlipped || card.isMatched
                  ? card.isExpression
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                  : "bg-white/10 hover:bg-white/20 text-transparent"
              }
              ${card.isMatched ? "opacity-60" : ""}
            `}
          >
            {(card.isFlipped || card.isMatched) && card.content}
          </div>
        ))}
      </div>

      <p className="text-white/60 text-sm text-center mt-4">
        Encontre pares que se combinam: expressão matemática + resultado
      </p>
    </div>
  );
};

export default MemoryMathGame;
