import { CheckCircle, XCircle } from "lucide-react";

interface LessonFeedbackProps {
  isCorrect: boolean | null;
  feedbackMessage: string;
  explanation?: string;
  showFeedback: boolean;
}

const correctImages = [
  "images/feedback/correct1.png",
  "images/feedback/correct2.png",
  "images/feedback/correct3.png",
];

const incorrectImages = [
  "images/feedback/incorrect1.png",
  "images/feedback/incorrect2.png",
];

const LessonFeedback = ({
  isCorrect,
  feedbackMessage,
  explanation,
  showFeedback,
}: LessonFeedbackProps) => {
  if (!showFeedback) return null;

  const images = isCorrect ? correctImages : incorrectImages;
  const randomImageIndex = Math.floor(Math.random() * images.length);
  const feedbackImage = images[randomImageIndex];

  return (
    <div className="mt-6 flex flex-col items-center justify-center w-full">
      {isCorrect ? (
        <div className="flex flex-col items-center text-green-500 animate-fade-in">
          <div className="relative">
            <CheckCircle className="w-16 h-16 animate-bounce" />
            <img
              src={feedbackImage}
              alt="Correct!"
              className="w-32 h-32 object-contain mt-2 animate-scale-in"
              onError={() =>
                console.log("Erro ao carregar imagem:", feedbackImage)
              }
            />
          </div>
          <p className="mt-2 text-lg font-medium">{feedbackMessage}</p>
          {explanation && (
            <p className="mt-4 text-sm text-white/80 p-3 bg-green-500/10 rounded-lg">
              {explanation}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center text-red-500 animate-fade-in">
          <div className="relative">
            <XCircle className="w-16 h-16 animate-bounce" />
            <img
              src={feedbackImage}
              alt="Incorrect!"
              className="w-32 h-32 object-contain mt-2 animate-scale-in"
            />
          </div>
          <p className="mt-2 text-lg font-medium">{feedbackMessage}</p>
          {explanation && (
            <p className="mt-4 text-sm text-white/80 p-3 bg-red-500/10 rounded-lg">
              {explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonFeedback;
