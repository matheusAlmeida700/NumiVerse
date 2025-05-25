import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Trophy, Brain } from "lucide-react";

export interface LogicRiddlesGameProps {
  onComplete: (score: number) => void;
}

export interface Riddle {
  id: number;
  question: string;
  answer: string;
  hints: string[];
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

const LogicRiddlesGame = ({ onComplete }: LogicRiddlesGameProps) => {
  const { toast } = useToast();
  const [riddles] = useState<Riddle[]>([
    {
      id: 1,
      question:
        "Eu tenho cidades, mas não tenho casas. Tenho montanhas, mas não tenho árvores. Tenho água, mas não tenho peixes. O que sou eu?",
      answer: "mapa",
      hints: [
        "Sou usado para navegação",
        "Represento lugares reais, mas em menor escala",
        "Posso ser encontrado em livros de geografia",
      ],
      difficulty: "easy",
      category: "Objeto",
    },
    {
      id: 2,
      question:
        "Em um carro há quatro romanos e um inglês. Qual o nome da motorista?",
      answer: "Ivone",
      hints: [
        "Preste atenção nos idiomas envolvidos na pergunta",
        "Os números também são importantes",
        "Leia em voz alta os termos 'quatro romanos e um inglês'",
      ],
      difficulty: "hard",
      category: "Lógica",
    },
    {
      id: 3,
      question: "O que tem pés, mas não anda?",
      answer: "mesa",
      hints: ["Fica parada", "Tem quatro pés", "Está na sala de jantar"],
      difficulty: "easy",
      category: "Objeto",
    },
    {
      id: 4,
      question:
        "Há um pato entre dois patos, um pato atrás de um pato e um pato na frente de outro pato. De quantos patos estamos falando?",
      answer: "3",
      hints: [
        "Tente visualizar a posição dos patos",
        "A mesma ave pode estar em mais de uma posição descrita",
        "Não é necessário imaginar muitos patos",
      ],
      difficulty: "hard",
      category: "Matemática",
    },
    {
      id: 5,
      question:
        "Você está numa sala com três interruptores. Um deles controla uma lâmpada em outra sala. Você pode mexer nos interruptores quantas vezes quiser, mas só pode ir à outra sala uma vez. Como descobrir qual interruptor controla a lâmpada?",
      answer: "calor",
      hints: [
        "Use mais de um sentido",
        "Lâmpadas não produzem apenas luz",
        "O tempo é importante",
      ],
      difficulty: "medium",
      category: "Lógica",
    },
    {
      id: 6,
      question: "O que fica maior quanto mais você tira dele?",
      answer: "buraco",
      hints: [
        "É algo que você cria removendo material",
        "Quanto mais você remove, maior ele fica",
        "Pode ser encontrado no chão",
      ],
      difficulty: "easy",
      category: "Conceito",
    },
    {
      id: 7,
      question: "Quanto é 2 + 2 × 2?",
      answer: "6",
      hints: [
        "Siga a ordem das operações",
        "Multiplicação vem antes",
        "Não é 8",
      ],
      difficulty: "easy",
      category: "Matemática",
    },
    {
      id: 8,
      question: "O que sempre sobe, mas nunca desce?",
      answer: "idade",
      hints: ["Todos têm", "Aumenta com o tempo", "Não diminui"],
      difficulty: "easy",
      category: "Conceito",
    },
    {
      id: 9,
      question: "O que você quebra só de falar?",
      answer: "silêncio",
      hints: ["É invisível", "Depende de som", "Você ouve"],
      difficulty: "easy",
      category: "Conceito",
    },
    {
      id: 10,
      question: "Qual número falta: 1, 4, 9, 16, ?, 36",
      answer: "25",
      hints: ["Quadrados perfeitos", "5 ao quadrado", "Segue a sequência"],
      difficulty: "medium",
      category: "Matemática",
    },
    {
      id: 11,
      question: "Qual é o próximo número da sequência: 2, 3, 5, 9, 17, ?",
      answer: "33",
      hints: [
        "Observe a diferença entre os números",
        "A diferença entre os termos também está crescendo",
        "A sequência dobra e subtrai 1",
      ],
      difficulty: "medium",
      category: "Matemática",
    },
    {
      id: 12,
      question:
        "Estou cheio de buracos, mas ainda consigo segurar água. O que sou?",
      answer: "esponja",
      hints: ["Usado na pia", "Macio", "Absorve"],
      difficulty: "medium",
      category: "Objeto",
    },
    {
      id: 13,
      question:
        "O pai de Maria tem cinco filhas: Nana, Nene, Nini, Nono. Qual é o nome da quinta filha?",
      answer: "Maria",
      hints: [
        "Está na primeira frase",
        "A pergunta induz ao erro",
        "Leia com atenção",
      ],
      difficulty: "easy",
      category: "Pegadinha",
    },
    {
      id: 14,
      question:
        "Tenho chaves, mas não tranco nada. Tenho espaço, mas não há nada dentro. Posso te deixar preso, mas não sou uma cela. O que sou?",
      answer: "teclado",
      hints: [
        "É um objeto que você usa diariamente",
        "Tem letras, mas não escreve sozinho",
        "Está ligado a tecnologia",
      ],
      difficulty: "easy",
      category: "Objeto",
    },
    {
      id: 15,
      question:
        "Se você me tem, quer me compartilhar. Se me compartilha, não me tem. O que sou?",
      answer: "segredo",
      hints: ["É confidencial", "Só você sabe", "Pode ser contado"],
      difficulty: "medium",
      category: "Conceito",
    },
    {
      id: 16,
      question: "Tem asas, mas não voa sozinho. O que é?",
      answer: "avião",
      hints: ["É máquina", "Depende de piloto", "Não voa sozinho"],
      difficulty: "easy",
      category: "Objeto",
    },
    {
      id: 17,
      question: "O que tem linhas, mas não escreve?",
      answer: "zebra",
      hints: ["É animal", "Tem listras", "Corre rápido"],
      difficulty: "easy",
      category: "Animal",
    },
    {
      id: 17,
      question:
        "O Sr. Smith tem 4 filhas. Cada uma de suas filhas tem 1 irmão. Quantos filhos Sr. Smith tem ao todo?",
      answer: "5",
      hints: [
        "Todas as filhas compartilham o mesmo irmão",
        "Pense em filhos no total, não apenas filhas",
        "Não há um irmão para cada filha",
      ],
      difficulty: "easy",
      category: "Lógica",
    },
    {
      id: 18,
      question:
        "Caminhando ao fim da tarde, uma senhora contou 20 casas em uma rua à sua direita. No regresso, ela contou 20 casas à sua esquerda. Quantas casas ela viu no total?",
      answer: "20",
      hints: [
        "Considere o trajeto de ida e volta",
        "Ela passou pelas mesmas casas nos dois sentidos",
        "Os lados mudam conforme a direção do caminho",
      ],
      difficulty: "hard",
      category: "Lógica",
    },
    {
      id: 19,
      question:
        "No táxi que entrei havia 8 passageiros. Pouco depois, 3 pessoas desceram e duas entraram. Quantas pessoas há no táxi?",
      answer: "9",
      hints: [
        "Inclua o motorista na contagem",
        "Três saíram, dois entraram — ajuste o total",
        "A pergunta é sobre quantas pessoas estão no táxi agora",
      ],
      difficulty: "medium",
      category: "Lógica",
    },
    {
      id: 20,
      question:
        "Um pequeno caminhão pode carregar 50 sacos de areia ou 400 tijolos. Se foram colocados no caminhão 32 sacos de areia, quantos tijolos pode ainda ele carregar?",
      answer: "144",
      hints: [
        "A capacidade é proporcional: 50 sacos = 400 tijolos",
        "Descubra quantos tijolos equivalem a 1 saco de areia",
        "Subtraia esse valor proporcional da capacidade total em tijolos",
      ],
      difficulty: "hard",
      category: "Matemática",
    },
    {
      id: 21,
      question:
        "Quando eu tinha 8 anos, a minha irmã tinha a metade da minha idade. Agora que tenho 55 anos, com quantos anos minha irmã está?",
      answer: "51",
      hints: [
        "A diferença de idade permanece constante",
        "A diferença entre 8 e 4 é 4 anos",
        "Se você tem 55, ela tem 55 - 4",
      ],
      difficulty: "medium",
      category: "Matemática",
    },
    {
      id: 22,
      question:
        "Maria comprou um vaso de flores por 20 reais e o vendeu por 25 reais. Arrependida da venda, comprou o mesmo vaso por 35 reais, mas logo decidiu vendê-lo por 40 reais. No final, quanto ela lucrou?",
      answer: "10",
      hints: [
        "Separe as duas transações",
        "Na primeira venda, ela lucrou 5 reais",
        "Na segunda venda, também teve um lucro de 5 reais",
      ],
      difficulty: "medium",
      category: "Matemática",
    },
    {
      id: 23,
      question:
        "Tenho rabo, mas não sou cão, não tenho asas, mas sei voar. Se me largarem, não subo, mas saio ao vento a brincar. Quem sou eu?",
      answer: "pipa",
      hints: [
        "É comum nas brincadeiras ao ar livre",
        "Precisa de vento para funcionar",
        "Fica presa por uma linha e pode voar alto",
      ],
      difficulty: "hard",
      category: "Objeto",
    },
  ]);

  const [currentRiddle, setCurrentRiddle] = useState<Riddle | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isRiddleSolved, setIsRiddleSolved] = useState(false);
  const [riddlesSolved, setRiddlesSolved] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard" | "all"
  >("all");

  const getRandomRiddle = (
    difficulty: "easy" | "medium" | "hard" | "all",
    excludeRiddle?: Riddle
  ) => {
    const filteredRiddles =
      difficulty === "all"
        ? riddles
        : riddles.filter((r) => r.difficulty === difficulty);

    let newRiddle =
      filteredRiddles[Math.floor(Math.random() * filteredRiddles.length)];

    while (filteredRiddles.length > 1 && newRiddle.id === excludeRiddle?.id) {
      newRiddle =
        filteredRiddles[Math.floor(Math.random() * filteredRiddles.length)];
    }

    return newRiddle;
  };

  const startGame = (difficulty: "easy" | "medium" | "hard" | "all") => {
    const riddle = getRandomRiddle(difficulty);
    setSelectedDifficulty(difficulty);
    setCurrentRiddle(riddle);
    setUserAnswer("");
    setHintsRevealed(0);
    setIsGameStarted(true);
    setIsRiddleSolved(false);
    setRiddlesSolved(0);
    setTotalScore(0);
    setAttempts(0);
    setStartTime(Date.now());
  };

  const nextRiddle = () => {
    const riddle = getRandomRiddle(selectedDifficulty, currentRiddle);
    setCurrentRiddle(riddle);
    setUserAnswer("");
    setHintsRevealed(0);
    setIsRiddleSolved(false);
    setAttempts(0);
    setStartTime(Date.now());
  };

  const normalizeAnswer = (answer: string) => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, "");
  };

  const checkAnswer = () => {
    if (!currentRiddle) return;

    const userNormalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentRiddle.answer);

    if (
      userNormalized === correctNormalized ||
      userAnswer.toLowerCase().includes(currentRiddle.answer.toLowerCase())
    ) {
      setIsRiddleSolved(true);
      const finalTime = Date.now() - startTime;
      const timeBonus = Math.max(300 - Math.floor(finalTime / 1000), 0);
      const hintPenalty = hintsRevealed * 50;
      const attemptPenalty = attempts * 20;
      const difficultyMultiplier =
        currentRiddle.difficulty === "easy"
          ? 1
          : currentRiddle.difficulty === "medium"
          ? 1.5
          : 2;
      const riddleScore = Math.max(
        Math.floor(
          (40 + timeBonus * 0.2 - hintPenalty * 0.3 - attemptPenalty * 0.5) *
            difficultyMultiplier *
            0.3
        ),
        10
      );

      setTotalScore(totalScore + riddleScore);
      setRiddlesSolved(riddlesSolved + 1);

      toast({
        title: "Correto!",
        description: `Você ganhou ${riddleScore} pontos!`,
      });

      if (riddlesSolved + 1 >= 3) {
        onComplete(totalScore + riddleScore);
      }
    } else {
      setAttempts(attempts + 1);
      toast({
        title: "Resposta incorreta",
        description: "Tente novamente ou use uma dica!",
        variant: "destructive",
      });
    }
  };

  const getHint = () => {
    if (!currentRiddle || hintsRevealed >= currentRiddle.hints.length) return;
    setHintsRevealed(hintsRevealed + 1);
    toast({
      title: "Dica revelada!",
      description: currentRiddle.hints[hintsRevealed],
    });
  };

  useEffect(() => {
    if (isGameStarted && !isRiddleSolved && currentRiddle) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGameStarted, isRiddleSolved, startTime, currentRiddle]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer.trim()) {
      checkAnswer();
    }
  };

  if (!isGameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Enigmas Lógicos
          </h2>
          <p className="text-white/70">
            Desafie seu raciocínio com enigmas complexos!
          </p>
        </div>

        <div className="space-y-4 w-full">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Como Jogar:</h3>
            <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
              <li>Leia o enigma com atenção</li>
              <li>Digite sua resposta no campo de texto</li>
              <li>Use dicas se necessário (reduz pontuação)</li>
              <li>Resolva 3 enigmas para completar o jogo</li>
              <li>Pontuação baseada no tempo e tentativas</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => startGame("easy")}
              className="bg-green-500 hover:bg-green-600 w-full"
            >
              Fácil
            </Button>
            <Button
              onClick={() => startGame("medium")}
              className="bg-yellow-500 hover:bg-yellow-600 w-full"
            >
              Médio
            </Button>
            <Button
              onClick={() => startGame("hard")}
              className="bg-red-500 hover:bg-red-600 w-full"
            >
              Difícil
            </Button>
            <Button
              onClick={() => startGame("all")}
              className="bg-purple-500 hover:bg-purple-600 w-full"
            >
              Misto
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (riddlesSolved >= 3) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Parabéns!</h2>
          <p className="text-white/70">Você completou todos os enigmas!</p>
        </div>

        <div className="w-full bg-white/5 p-6 rounded-lg text-center mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-white/80 mb-1">Enigmas Resolvidos</p>
              <p className="text-2xl font-bold text-white">{riddlesSolved}</p>
            </div>
            <div>
              <p className="text-white/80 mb-1">Pontuação Total</p>
              <p className="text-2xl font-bold text-white">{totalScore}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setIsGameStarted(false)}
          className="bg-yellow-500 hover:bg-yellow-600 w-full"
        >
          Jogar Novamente
        </Button>
      </div>
    );
  }

  if (!currentRiddle) return null;

  return (
    <div className="flex flex-col items-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-white/20 max-w-4xl mx-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Badge className="bg-yellow-500 px-3 py-1">
            Enigma {riddlesSolved + 1}/3
          </Badge>
          <Badge
            className={`px-3 py-1 capitalize ${
              currentRiddle.difficulty === "easy"
                ? "bg-green-500"
                : currentRiddle.difficulty === "medium"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {currentRiddle.difficulty}
          </Badge>
          <Badge className="bg-blue-500 px-3 py-1">
            {formatTime(elapsedTime)}
          </Badge>
          <Badge className="bg-purple-500 px-3 py-1">
            Pontos: {totalScore}
          </Badge>
        </div>
      </div>

      <div className="w-full max-w-3xl mb-8">
        <div className="bg-white/5 p-6 rounded-lg mb-6">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-yellow-500 mr-2" />
            <span className="text-sm text-white/70 font-medium">
              {currentRiddle.category}
            </span>
          </div>
          <p className="text-white text-lg leading-relaxed">
            {currentRiddle.question}
          </p>
        </div>

        {hintsRevealed > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mb-6">
            <h3 className="text-blue-400 font-medium mb-2 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Dicas:
            </h3>
            {currentRiddle.hints.slice(0, hintsRevealed).map((hint, index) => (
              <p key={index} className="text-blue-300 text-sm mb-1">
                {index + 1}. {hint}
              </p>
            ))}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua resposta..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            disabled={isRiddleSolved}
          />
          <Button
            onClick={checkAnswer}
            disabled={!userAnswer.trim() || isRiddleSolved}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Verificar
          </Button>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={getHint}
            disabled={
              hintsRevealed >= currentRiddle.hints.length || isRiddleSolved
            }
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Dica ({currentRiddle.hints.length - hintsRevealed} restantes)
          </Button>

          {isRiddleSolved && riddlesSolved < 3 && (
            <Button
              onClick={nextRiddle}
              className="bg-green-500 hover:bg-green-600"
            >
              Próximo Enigma
            </Button>
          )}
        </div>

        {attempts > 0 && (
          <p className="text-center text-white/60 text-sm mt-4">
            Tentativas: {attempts}
          </p>
        )}
      </div>
    </div>
  );
};

export default LogicRiddlesGame;
