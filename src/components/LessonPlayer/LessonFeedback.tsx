import { correctImages, incorrectImages } from "@/data/feedbackImages";

interface LessonFeedbackProps {
  isCorrect: boolean | null;
  feedbackMessage: string;
  explanation?: string;
  showFeedback: boolean;
}

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
          <div className="relative floating">
            <img
              src={feedbackImage}
              alt="Correto!"
              className="w-64 h-64 object-contain mt-2 animate-scale-in"
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
