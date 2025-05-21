import { CheckCircle, XCircle } from "lucide-react";

interface LessonFeedbackProps {
  isCorrect: boolean | null;
  feedbackMessage: string;
  explanation?: string;
  showFeedback: boolean;
}

const correctImages = [
  "/images/feedback/correct1.png",
  "/images/feedback/correct2.png",
  "/images/feedback/correct3.png",
  "/images/feedback/correct4.png",
  "/images/feedback/correct5.png",
  "/images/feedback/correct6.png",
  "/images/feedback/correct7.png",
  "/images/feedback/correct8.png",
  "/images/feedback/correct9.png",
  "/images/feedback/correct10.png",
  "/images/feedback/correct11.png",
  "/images/feedback/correct12.png",
  "/images/feedback/correct13.png",
  "/images/feedback/correct15.png",
];

const incorrectImages = [
  "/images/feedback/incorrect1.png",
  "/images/feedback/incorrect2.png",
  "/images/feedback/incorrect3.png",
  "/images/feedback/incorrect4.png",
  "/images/feedback/incorrect5.png",
  "/images/feedback/incorrect6.png",
  "/images/feedback/incorrect7.png",
  "/images/feedback/incorrect8.png",
  "/images/feedback/incorrect9.png",
  "/images/feedback/incorrect10.png",
  "/images/feedback/incorrect11.png",
  "/images/feedback/incorrect12.png",
  "/images/feedback/incorrect13.png",
  "/images/feedback/incorrect14.png",
  "/images/feedback/incorrect15.png",
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
    <div className="mt-8 flex flex-col items-center justify-center w-full">
      {isCorrect ? (
        <div className="flex flex-col items-center text-green-500 animate-fade-in">
          <div className="relative">
            <img
              src={feedbackImage}
              alt="Correto!"
              className="w-64 h-64 object-contain mt-2 animate-scale-in"
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
          <div className="relative floating">
            <img
              src={feedbackImage}
              alt="Incorreto!"
              className="w-64 h-64 object-contain mt-2 animate-scale-in"
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
