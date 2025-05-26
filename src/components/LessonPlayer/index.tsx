import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Heart } from "lucide-react";
import { lessonData, lessonToPlanetMap } from "@/data/lessonData";
import { calculateXpForLesson } from "@/data/userProgressData";
import {
  useUpdateProgress,
  useUpdateUserXp,
  useUserData,
  useUpdateStreak,
} from "@/hooks/useUserData";
import LessonFeedback from "./LessonFeedback";
import SortableQuestion from "./SortableQuestion";
import StandardQuestion from "./StandardQuestion";
import ResultsPanel from "./ResultsPanel";

const correctSound = new Audio("/audio/correct.mp3");
const incorrectSound = new Audio("/audio/incorrect.mp3");
const completionSound = new Audio("/audio/completion.mp3");

const LessonPlayer = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const [currentLesson, setCurrentLesson] = useState<any | null>(null);
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
  const [sortableItems, setSortableItems] = useState<string[]>([]);

  const { data: userData, isLoading: isUserDataLoading } = useUserData();
  const updateProgress = useUpdateProgress();
  const updateXp = useUpdateUserXp();
  const updateStreak = useUpdateStreak();

  const correctFeedbacks = [
    "Muito bem!",
    "Excelente!",
    "Incrível!",
    "Perfeito!",
    "Você é demais!",
    "Acertou!",
    "Sensacional!",
    "Continue assim!",
  ];

  const incorrectFeedbacks = [
    "Não foi dessa vez",
    "Quase lá!",
    "Tente novamente!",
    "Não desista!",
    "Você consegue!",
    "Continue tentando!",
  ];

  useEffect(() => {
    if (lessonId && lessonData[lessonId]) {
      setCurrentLesson(lessonData[lessonId]);
      document.title = `NumiVerse - ${lessonData[lessonId].title}`;

      if (userData && userData.streak) {
        setStreak(userData.streak.current || 0);
      }
    } else {
      toast({
        title: "Erro",
        description: "Lição não encontrada",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [lessonId, navigate, userData]);

  useEffect(() => {
    if (currentQuestion?.type === "sort" && sortableItems.length === 0) {
      const shuffled = [...currentQuestion.answers]
        .map((answer) => answer.id)
        .sort(() => Math.random() - 0.5);
      setSortableItems(shuffled);
    } else if (currentQuestion?.type !== "sort") {
      setSortableItems([]);
    }
  }, [currentQuestionIndex, currentLesson]);

  const currentQuestion = currentLesson?.questions[currentQuestionIndex];

  const checkAnswer = () => {
    if (!currentQuestion) return;

    let correct = false;

    switch (currentQuestion.type) {
      case "multiple-choice":
      case "fill-blank":
      case "true-false":
        correct = selectedAnswers[0] === currentQuestion.correctAnswer;
        break;
      case "complete-number":
        correct = selectedAnswers[0] === currentQuestion.correctAnswer;
        break;
      case "sort":
        const correctOrder = currentQuestion.correctAnswer as string[];
        correct =
          JSON.stringify(sortableItems) === JSON.stringify(correctOrder);
        break;
      case "tap-choice":
        const correctTaps = currentQuestion.correctAnswer as string[];
        correct =
          correctTaps.every((answer) => selectedAnswers.includes(answer)) &&
          selectedAnswers.length === correctTaps.length;
        break;
      case "sequence":
        const correctSequence = currentQuestion.correctAnswer as string[];
        correct =
          JSON.stringify(selectedAnswers) === JSON.stringify(correctSequence);
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      correctSound.play();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setResults((prev) => ({ ...prev, correct: prev.correct + 1 }));

      const randomIndex = Math.floor(Math.random() * correctFeedbacks.length);
      setFeedbackMessage(correctFeedbacks[randomIndex]);
    } else {
      incorrectSound.play();
      setStreak(0);

      const randomIndex = Math.floor(Math.random() * incorrectFeedbacks.length);
      setFeedbackMessage(incorrectFeedbacks[randomIndex]);
    }

    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setSelectedAnswers([]);
    setSortableItems([]);
    setFeedbackMessage("");

    if (
      currentLesson &&
      currentQuestionIndex < currentLesson.questions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => {
        const newIndex = prev + 1;
        setProgress(
          Math.round((newIndex / (currentLesson.questions.length - 1)) * 100)
        );
        return newIndex;
      });
    } else {
      completionSound.play();
      setCompleted(true);
      setProgress(100);

      if (currentLesson && lessonId) {
        const earnedXp = calculateXpForLesson(
          results.correct,
          currentLesson.questions.length,
          currentLesson.xp
        );

        handleLessonCompletion(
          lessonId,
          results.correct,
          currentLesson.questions.length,
          earnedXp
        );

        setResults((prev) => ({
          ...prev,
          total: currentLesson.questions.length,
          xp: earnedXp,
        }));
      }
    }
  };

  const handleLessonCompletion = async (
    lessonId: string,
    correctAnswers: number,
    totalQuestions: number,
    earnedXp: number
  ) => {
    if (!userData?._id) return;

    try {
      updateXp.mutate({ userId: userData._id, xpToAdd: earnedXp });
      updateProgress.mutate({ userId: userData._id, lessonId });
      updateStreak.mutate({ userId: userData._id });
    } catch (error) {
      console.error("Error updating user data:", error);

      toast({
        title: "Atenção",
        description: "Sincronização com o servidor falhou.",
        variant: "destructive",
      });
    }
  };

  const handleAnswerSelection = (answerId: string) => {
    if (showFeedback) return;

    if (!currentQuestion) return;

    switch (currentQuestion.type) {
      case "multiple-choice":
      case "fill-blank":
      case "complete-number":
      case "true-false":
        setSelectedAnswers([answerId]);
        break;
      case "tap-choice":
        setSelectedAnswers((prev) =>
          prev.includes(answerId)
            ? prev.filter((id) => id !== answerId)
            : [...prev, answerId]
        );
        break;
      case "match":
        setSelectedAnswers((prev) => [...prev, answerId]);
        break;
      case "drag-drop":
      case "sequence":
        setSelectedAnswers((prev) => [...prev, answerId]);
        break;
      case "connect-dots":
        if (selectedAnswers.length % 2 === 0) {
          setSelectedAnswers((prev) => [...prev, answerId]);
        } else {
          const prevPoint = selectedAnswers[selectedAnswers.length - 1];
          const connection = `${prevPoint}-${answerId}`;
          setSelectedAnswers((prev) => [...prev, answerId, connection]);
        }
        break;
    }
  };

  const moveItemInSortList = (index: number, direction: "up" | "down") => {
    if (!currentQuestion || currentQuestion.type !== "sort") return;

    const newOrder = [...sortableItems];
    if (direction === "up" && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [
        newOrder[index - 1],
        newOrder[index],
      ];
    } else if (direction === "down" && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [
        newOrder[index + 1],
        newOrder[index],
      ];
    }

    setSortableItems(newOrder);
  };

  const handleFinish = () => {
    if (lessonId && lessonToPlanetMap[lessonId]) {
      navigate(`/planet/${lessonToPlanetMap[lessonId]}`);
    } else {
      navigate("/");
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setProgress(0);
    setResults({ correct: 0, total: 0, xp: 0 });
    setCompleted(false);
  };

  const renderCurrentQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <div className="flex flex-col items-center w-full max-w-xl mx-auto">
        {currentQuestion.instruction && (
          <p className="text-sm text-white/60 mb-2">
            {currentQuestion.instruction}
          </p>
        )}

        <h3 className="text-xl md:text-2xl font-medium text-center mb-6">
          {currentQuestion.question}
        </h3>

        {currentQuestion.image && (
          <div className="w-full max-w-md mb-6">
            <img
              src={currentQuestion.image}
              alt="Questão"
              className="w-full rounded-lg"
            />
          </div>
        )}

        {currentQuestion.type === "sort" ? (
          <SortableQuestion
            answers={currentQuestion.answers}
            sortableItems={sortableItems}
            moveItemInSortList={moveItemInSortList}
            showFeedback={showFeedback}
          />
        ) : (
          <StandardQuestion
            answers={currentQuestion.answers}
            selectedAnswers={selectedAnswers}
            handleAnswerSelection={handleAnswerSelection}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            questionType={currentQuestion.type}
          />
        )}

        {!showFeedback && (
          <Button
            onClick={checkAnswer}
            className="mt-6 w-full max-w-xs bg-space-purple hover:bg-space-purple/80"
            disabled={
              currentQuestion.type !== "sort" && selectedAnswers.length === 0
            }
          >
            Verificar
          </Button>
        )}

        <LessonFeedback
          isCorrect={isCorrect}
          feedbackMessage={feedbackMessage}
          explanation={currentQuestion.explanation}
          showFeedback={showFeedback}
        />
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
      <div className="space-stars"></div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 w-full">
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-white/60 text-right mt-1">
            {currentQuestionIndex + 1} de {currentLesson.questions.length}
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 shadow-lg shadow-purple-500/10">
          {completed ? (
            <ResultsPanel
              results={results}
              onRetry={handleRetry}
              onFinish={handleFinish}
            />
          ) : (
            renderCurrentQuestion()
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
