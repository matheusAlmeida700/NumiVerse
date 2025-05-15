
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LessonData, Question, Answer } from '@/types/lesson';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle, Award, Zap, Heart } from 'lucide-react';
import { lessonData, lessonToPlanetMap } from '@/data/lessonData';
import { completeLesson, isLessonCompleted, getLessonStats, getStreakDays } from '@/services/userService';

// Sons
const correctSound = new Audio('/sounds/correct.mp3');
const incorrectSound = new Audio('/sounds/incorrect.mp3');
const completionSound = new Audio('/sounds/completion.mp3');

const LessonPlayer = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);
  const [results, setResults] = useState<{
    correct: number;
    total: number;
    xp: number;
  }>({ correct: 0, total: 0, xp: 0 });
  const [completed, setCompleted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Mensagens de feedback
  const correctFeedbacks = [
    "Muito bem!",
    "Excelente!",
    "Incrível!",
    "Perfeito!",
    "Você é demais!",
    "Acertou!",
    "Sensacional!",
    "Continue assim!"
  ];
  
  const incorrectFeedbacks = [
    "Não foi dessa vez",
    "Quase lá!",
    "Tente novamente!",
    "Não desista!",
    "Você consegue!",
    "Continue tentando!"
  ];

  // Carregar a lição
  useEffect(() => {
    if (lessonId && lessonData[lessonId]) {
      setCurrentLesson(lessonData[lessonId]);
      document.title = `NumiVerse - ${lessonData[lessonId].title}`;
      
      // Check if lesson was already completed
      const wasAlreadyCompleted = isLessonCompleted(lessonId);
      
      // Load current streak from local storage
      const currentStreak = getStreakDays();
      setStreak(currentStreak);
      
    } else {
      toast({
        title: "Erro",
        description: "Lição não encontrada",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [lessonId, navigate]);

  // Questão atual
  const currentQuestion = currentLesson?.questions[currentQuestionIndex];

  // Verificar resposta
  const checkAnswer = () => {
    if (!currentQuestion) return;
    
    let correct = false;
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
      case 'fill-blank':
        correct = selectedAnswers[0] === currentQuestion.correctAnswer;
        break;
      case 'complete-number':
        correct = selectedAnswers[0] === currentQuestion.correctAnswer;
        break;
      case 'match':
        // Aqui verificamos se todas as correspondências estão corretas
        const matchPairs = (currentQuestion.correctAnswer as string[]);
        correct = matchPairs.every(pair => {
          const [a, b] = pair.split('=');
          return selectedAnswers.includes(`${a}=${b}`);
        }) && selectedAnswers.length === matchPairs.length;
        break;
      case 'drag-drop':
        // Verificar se a ordem está correta
        const correctOrder = currentQuestion.correctAnswer as string[];
        correct = JSON.stringify(selectedAnswers) === JSON.stringify(correctOrder);
        break;
      case 'tap-choice':
        // Verificar se todas as opções corretas foram selecionadas (e apenas elas)
        const correctTaps = currentQuestion.correctAnswer as string[];
        correct = 
          correctTaps.every(answer => selectedAnswers.includes(answer)) &&
          selectedAnswers.length === correctTaps.length;
        break;
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      correctSound.play();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setResults(prev => ({ ...prev, correct: prev.correct + 1 }));
      
      // Escolher mensagem aleatória de feedback positivo
      const randomIndex = Math.floor(Math.random() * correctFeedbacks.length);
      setFeedbackMessage(correctFeedbacks[randomIndex]);
      
      // Mostrar feedback de streak a cada 5 acertos
      if (newStreak % 5 === 0) {
        setShowStreak(true);
        setTimeout(() => setShowStreak(false), 2000);
      }
    } else {
      incorrectSound.play();
      setStreak(0);
      
      // Escolher mensagem aleatória de feedback negativo
      const randomIndex = Math.floor(Math.random() * incorrectFeedbacks.length);
      setFeedbackMessage(incorrectFeedbacks[randomIndex]);
    }
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  // Ir para próxima questão
  const nextQuestion = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setSelectedAnswers([]);
    setFeedbackMessage("");
    
    if (currentLesson && currentQuestionIndex < currentLesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => {
        const newIndex = prev + 1;
        setProgress(Math.round((newIndex / (currentLesson.questions.length - 1)) * 100));
        return newIndex;
      });
    } else {
      // Lição concluída
      completionSound.play();
      setCompleted(true);
      setProgress(100);
      
      if (currentLesson && lessonId) {
        const earnedXp = Math.round(currentLesson.xp * (results.correct / currentLesson.questions.length));
        
        // Save lesson completion data with real progress
        const updatedUserData = completeLesson(
          lessonId,
          results.correct,
          currentLesson.questions.length,
          earnedXp
        );
        
        setResults(prev => ({
          ...prev,
          total: currentLesson.questions.length,
          xp: earnedXp
        }));
        
        // Update local streak value to match the saved one
        setStreak(updatedUserData.streakDays);
      }
    }
  };

  // Gerenciar seleção de resposta
  const handleAnswerSelection = (answerId: string) => {
    if (showFeedback) return; // Não permitir alteração durante o feedback
    
    if (!currentQuestion) return;
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
      case 'fill-blank':
      case 'complete-number':
        setSelectedAnswers([answerId]);
        break;
      case 'tap-choice':
        setSelectedAnswers(prev => 
          prev.includes(answerId)
            ? prev.filter(id => id !== answerId)
            : [...prev, answerId]
        );
        break;
      case 'match':
        // Lógica para correspondência
        // Simplificação: assumimos que o usuário seleciona pares de respostas
        setSelectedAnswers(prev => [...prev, answerId]);
        break;
      case 'drag-drop':
        // Lógica para arrastar e soltar
        // Simplificação: assumimos que o usuário clica nas opções na ordem desejada
        setSelectedAnswers(prev => [...prev, answerId]);
        break;
    }
  };

  // Voltar para a página do planeta
  const handleFinish = () => {
    if (lessonId && lessonToPlanetMap[lessonId]) {
      navigate(`/planet/${lessonToPlanetMap[lessonId]}`);
    } else {
      navigate('/');
    }
  };

  // Tentar a mesma lição novamente
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setProgress(0);
    setResults({ correct: 0, total: 0, xp: 0 });
    setCompleted(false);
  };

  // Renderizar questão atual
  const renderCurrentQuestion = () => {
    if (!currentQuestion) return null;
    
    return (
      <div className="flex flex-col items-center w-full max-w-xl mx-auto">
        {/* Tipo de questão e instrução */}
        {currentQuestion.instruction && (
          <p className="text-sm text-white/60 mb-2">{currentQuestion.instruction}</p>
        )}
        
        {/* Questão */}
        <h3 className="text-xl md:text-2xl font-medium text-center mb-6">{currentQuestion.question}</h3>
        
        {/* Imagem (se existir) */}
        {currentQuestion.image && (
          <div className="w-full max-w-md mb-6">
            <img src={currentQuestion.image} alt="Questão" className="w-full rounded-lg" />
          </div>
        )}
        
        {/* Respostas */}
        <div className={`grid ${currentQuestion.type === 'match' ? 'grid-cols-2' : 'grid-cols-1'} gap-3 w-full`}>
          {currentQuestion.answers.map((answer) => (
            <Button
              key={answer.id}
              variant={
                showFeedback
                  ? (isCorrect && selectedAnswers.includes(answer.id)) || 
                    (isCorrect === false && answer.isCorrect)
                    ? "default"
                    : isCorrect === false && selectedAnswers.includes(answer.id)
                    ? "destructive"
                    : "outline"
                  : selectedAnswers.includes(answer.id)
                  ? "default"
                  : "outline"
              }
              className={`p-4 h-auto text-left justify-start transition-all ${
                currentQuestion.type === 'tap-choice' ? 'rounded-full' : ''
              } ${
                showFeedback && ((isCorrect && selectedAnswers.includes(answer.id)) || 
                (!isCorrect && answer.isCorrect)) ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => handleAnswerSelection(answer.id)}
              disabled={showFeedback}
            >
              {answer.text}
            </Button>
          ))}
          
          {/* Campo de entrada para questões numéricas */}
          {currentQuestion.type === 'complete-number' && (
            <div className="mt-4 w-full">
              <input
                type="text"
                className="w-full p-4 bg-background border border-border rounded-md text-center text-xl"
                placeholder="Digite sua resposta"
                value={selectedAnswers[0] || ''}
                onChange={(e) => setSelectedAnswers([e.target.value])}
                disabled={showFeedback}
              />
            </div>
          )}
        </div>
        
        {/* Botão verificar */}
        {!showFeedback && (
          <Button 
            onClick={checkAnswer}
            className="mt-6 w-full max-w-xs bg-space-purple hover:bg-space-purple/80"
            disabled={selectedAnswers.length === 0}
          >
            Verificar
          </Button>
        )}
        
        {/* Feedback visual */}
        {showFeedback && (
          <div className="mt-6 flex flex-col items-center justify-center w-full">
            {isCorrect ? (
              <div className="flex flex-col items-center text-green-500 animate-fade-in">
                <CheckCircle className="w-16 h-16 animate-bounce" />
                <p className="mt-2 text-lg font-medium">{feedbackMessage}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-red-500 animate-fade-in">
                <XCircle className="w-16 h-16 animate-bounce" />
                <p className="mt-2 text-lg font-medium">{feedbackMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Renderizar resultado final
  const renderResults = () => {
    const percentage = Math.round((results.correct / results.total) * 100);
    let motivationalMessage = "";
    
    if (percentage >= 90) {
      motivationalMessage = "Excelente! Você dominou este conteúdo!";
    } else if (percentage >= 70) {
      motivationalMessage = "Muito bom! Continue praticando para se aperfeiçoar!";
    } else if (percentage >= 50) {
      motivationalMessage = "Bom trabalho! Você está progredindo bem!";
    } else {
      motivationalMessage = "Continue tentando! A prática leva à perfeição!";
    }
    
    return (
      <div className="flex flex-col items-center w-full max-w-xl mx-auto">
        <div className="w-48 h-48 mb-8">
          <Award className={`w-full h-full ${percentage >= 80 ? 'text-yellow-400' : 'text-blue-400'} animate-pulse`} />
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-6">{motivationalMessage}</h2>
        
        <Card className="w-full mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span>Questões respondidas:</span>
                <span className="font-bold">{results.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Respostas corretas:</span>
                <span className="font-bold text-green-500">{results.correct}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Porcentagem de acertos:</span>
                <span className="font-bold">{percentage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>XP ganho:</span>
                <div className="flex items-center font-bold text-yellow-500">
                  {results.xp} <Zap className="ml-1 w-4 h-4 fill-yellow-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button 
            onClick={handleRetry} 
            className="w-full bg-blue-600 hover:bg-blue-700"
            variant="outline"
          >
            Tentar Novamente
          </Button>
          
          <Button 
            onClick={handleFinish} 
            className="w-full bg-space-purple hover:bg-space-purple/80"
          >
            Continuar
          </Button>
        </div>
      </div>
    );
  };

  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-16 px-4 bg-space-gradient">
      {/* Space background */}
      <div className="space-stars"></div>
      
      <div className="max-w-4xl mx-auto">
        {/* Barra de progresso */}
        <div className="mb-8 w-full">
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-white/60 text-right mt-1">
            {currentQuestionIndex + 1} de {currentLesson.questions.length}
          </p>
        </div>
        
        {/* Feedback de streak */}
        {showStreak && (
          <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500/90 text-white px-6 py-3 rounded-full animate-bounce z-50 flex items-center">
            <Heart className="w-5 h-5 mr-2 fill-white" /> {streak} acertos seguidos! Incrível!
          </div>
        )}
        
        {/* Conteúdo principal */}
        <div className="bg-card/80 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
          {completed ? renderResults() : renderCurrentQuestion()}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
