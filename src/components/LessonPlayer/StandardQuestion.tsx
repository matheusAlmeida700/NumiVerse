import { Button } from "@/components/ui/button";
import { Answer } from "@/types/lesson";

interface StandardQuestionProps {
  answers: Answer[];
  selectedAnswers: string[];
  handleAnswerSelection: (answerId: string) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
  questionType: string;
}

const StandardQuestion = ({
  answers,
  selectedAnswers,
  handleAnswerSelection,
  showFeedback,
  isCorrect,
  questionType,
}: StandardQuestionProps) => {
  return (
    <div
      className={`grid ${
        questionType === "match" ? "grid-cols-2" : "grid-cols-1"
      } gap-3 w-full`}
    >
      {answers.map((answer) => (
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
            questionType === "tap-choice" ? "rounded-full" : ""
          } ${
            showFeedback &&
            ((isCorrect && selectedAnswers.includes(answer.id)) ||
              (!isCorrect && answer.isCorrect))
              ? "ring-2 ring-green-500"
              : ""
          }`}
          onClick={() => handleAnswerSelection(answer.id)}
          disabled={showFeedback}
        >
          {answer.imageUrl && (
            <img
              src={answer.imageUrl}
              alt={answer.text}
              className="w-8 h-8 mr-2 object-contain"
            />
          )}
          {answer.text}
        </Button>
      ))}

      {questionType === "complete-number" && (
        <div className="mt-4 w-full">
          <input
            type="text"
            className="w-full p-4 bg-background border border-border rounded-md text-center text-xl"
            placeholder="Digite sua resposta"
            value={selectedAnswers[0] || ""}
            onChange={(e) => handleAnswerSelection(e.target.value)}
            disabled={showFeedback}
          />
        </div>
      )}
    </div>
  );
};

export default StandardQuestion;
