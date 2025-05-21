import { Award, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="w-48 h-48 mb-8 relative">
        <Award
          className={`w-full h-full ${
            percentage >= 80 ? "text-yellow-400" : "text-blue-400"
          } animate-pulse`}
        />
        {percentage >= 90 && (
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 w-32 h-32 animate-pulse" />
        )}
      </div>

      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        {motivationalMessage}
      </h2>

      <Card className="w-full mb-8 bg-card/80 backdrop-blur-md border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 z-0"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span>Questões respondidas:</span>
              <span className="font-bold">{results.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Respostas corretas:</span>
              <span className="font-bold text-green-500">
                {results.correct}
              </span>
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
