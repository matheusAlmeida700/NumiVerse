
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface EquationGameProps {
  onComplete: (score: number) => void;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const EquationGame = ({ onComplete, difficulty = 'medium' }: EquationGameProps) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [equation, setEquation] = useState<{ problem: string; answer: number; options: number[] }>({
    problem: '',
    answer: 0,
    options: []
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Generate a random algebraic equation based on difficulty
  const generateEquation = () => {
    let a: number, b: number, c: number, x: number, problem: string, answer: number;
    
    switch (difficulty) {
      case 'easy':
        x = Math.floor(Math.random() * 10);
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 20);
        problem = `${a}x + ${b} = ${a * x + b}`;
        answer = x;
        break;
      
      case 'medium':
        x = Math.floor(Math.random() * 12);
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 20);
        if (Math.random() > 0.5) {
          problem = `${a}x - ${b} = ${a * x - b}`;
        } else {
          problem = `${a}x + ${b} = ${a * x + b}`;
        }
        answer = x;
        break;
      
      case 'hard':
        x = Math.floor(Math.random() * 15);
        a = Math.floor(Math.random() * 8) + 1;
        b = Math.floor(Math.random() * 20);
        c = Math.floor(Math.random() * 30);
        if (Math.random() > 0.5) {
          problem = `${a}x + ${b} = ${c}`;
          answer = (c - b) / a;
        } else {
          problem = `${a}x - ${b} = ${c}`;
          answer = (c + b) / a;
        }
        answer = Number(answer.toFixed(0));
        break;
        
      default:
        x = Math.floor(Math.random() * 10);
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 20);
        problem = `${a}x + ${b} = ${a * x + b}`;
        answer = x;
    }
    
    // Generate options (including the correct answer)
    const options = [answer];
    while (options.length < 4) {
      const option = answer + Math.floor(Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1);
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    return { problem, answer, options };
  };
  
  const startGame = () => {
    setGameStarted(true);
    setEquation(generateEquation());
    setScore(0);
    setTimeLeft(60);
    setIsGameOver(false);
  };
  
  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === equation.answer) {
      // Correct answer
      setScore(score + 10);
      toast({
        title: "Correct!",
        variant: "default",
      });
    } else {
      // Wrong answer
      toast({
        title: "Not quite!",
        description: `The correct answer was ${equation.answer}`,
        variant: "destructive",
      });
    }
    
    // Generate new equation
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
      <div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl border border-white/10 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Equation Explorer</h2>
          <p className="text-white/70 mt-2">Solve algebraic equations to navigate through space!</p>
        </div>
        
        <div className="space-y-4 w-full">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">How to Play:</h3>
            <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
              <li>Solve equations by finding the value of x</li>
              <li>Choose from multiple answers</li>
              <li>Score points for correct answers</li>
              <li>Complete as many equations as possible in 60 seconds</li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h3>
            <p className="text-sm text-white/70">
              {difficulty === 'easy' ? 'Simple equations with whole numbers' : 
               difficulty === 'medium' ? 'More complex equations with positive and negative numbers' : 
               'Advanced equations requiring multiple steps to solve'}
            </p>
          </div>
        </div>
        
        <Button onClick={startGame} className="mt-6 bg-space-blue hover:bg-space-blue/80 w-full">
          Start Game
        </Button>
      </div>
    );
  }
  
  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl border border-white/10 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Game Over!</h2>
          <p className="text-white/70 mt-2">You've completed the Equation Explorer challenge.</p>
        </div>
        
        <div className="w-full bg-white/5 p-6 rounded-lg text-center">
          <p className="text-lg text-white/80 mb-2">Your Score</p>
          <p className="text-4xl font-bold text-white mb-4">{score}</p>
          <p className="text-sm text-white/60">
            {score < 30 ? "Keep practicing! You'll improve with time." : 
             score < 60 ? "Good job! You're getting better at this." : 
             "Excellent work! You're a natural equation solver!"}
          </p>
        </div>
        
        <div className="mt-6 space-x-4">
          <Button onClick={startGame} className="bg-space-purple hover:bg-space-purple/80">
            Play Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center p-8 bg-card rounded-xl border border-white/10 max-w-md mx-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="bg-white/10 px-3 py-1 rounded-full">
          <p className="text-sm font-medium text-white">Score: {score}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-white/70 mb-1">Time Left</p>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${timeLeft > 20 ? 'bg-green-500' : timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="my-8 text-center">
        <p className="text-sm text-white/70 mb-1">Solve for x</p>
        <p className="text-3xl font-bold text-white">{equation.problem}</p>
      </div>
      
      <div className="w-full grid grid-cols-2 gap-4">
        {equation.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-white/10 hover:bg-white/20 text-white text-xl py-6"
          >
            x = {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EquationGame;
