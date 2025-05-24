import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { correctImages, incorrectImages } from "@/data/feedbackImages";
import Xp from "@/assets/nav/xp.png";
import { useEffect, useState } from "react";

interface ResultsPanelProps {
  results: {
    correct: number;
    total: number;
    xp: number;
  };
  onRetry: () => void;
  onFinish: () => void;
}

const ResultsPanel = ({ results, onRetry, onFinish }: ResultsPanelProps) => {
  const percentage = Math.round((results.correct / results.total) * 100);

  const [feedbackImage, setFeedbackImage] = useState<string>("");

  useEffect(() => {
    const allImages = [...correctImages, ...incorrectImages];
    const randomIndex = Math.floor(Math.random() * allImages.length);
    setFeedbackImage(allImages[randomIndex]);
  }, []);

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
    <div className="flex flex-col items-center w-full max-w-xl mx-auto poppins">
      <div className="mb-6 relative floating">
        <img
          src={feedbackImage}
          alt="Correto!"
          className="w-64 h-64 object-contain animate-scale-in"
        />
      </div>

      <h2 className="text-3xl font-bold text-center mb-8 text-space-purple">
        {motivationalMessage}
      </h2>

      <Card className="w-full mb-8 bg-card/80 backdrop-blur-md border font-bold border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span>Questões respondidas:</span>
              <span>{results.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Respostas corretas:</span>
              <span className="text-green-500">{results.correct}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Porcentagem de acertos:</span>
              <span>{percentage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>XP ganho:</span>
              <div className="flex items-center text-yellow-500">
                <img className="w-8 h-8 mr-2" src={Xp} alt="Xp" />
                {results.xp}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button
          onClick={onRetry}
          className="w-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
          variant="outline"
        >
          Tentar Novamente
        </Button>

        <Button
          onClick={onFinish}
          className="w-full bg-space-purple hover:bg-space-purple/80 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.8)] transition-all duration-300"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default ResultsPanel;
