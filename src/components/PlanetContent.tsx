import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Star } from "lucide-react";
import { getPlanetById } from "@/data/planetsData";
import { getLessonsByPlanet } from "@/data/lessonData";
import { isLessonCompleted, useUserData } from "@/hooks/useUserData";

interface PlanetContentProps {
  planetId: string;
}

const PlanetContent: React.FC<PlanetContentProps> = ({ planetId }) => {
  const navigate = useNavigate();
  const [planet, setPlanet] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);

  const { data: userData } = useUserData();

  useEffect(() => {
    const planetData = getPlanetById(planetId);
    setPlanet(planetData);

    const planetLessons = getLessonsByPlanet(planetId);
    setLessons(planetLessons);
  }, [planetId]);

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };

  const checkLessonCompleted = (
    progress: [string],
    lessonId: string
  ): boolean => {
    if (userData && userData.progress) {
      return isLessonCompleted(progress, lessonId);
    }
    return false;
  };

  if (!planet) {
    return (
      <div className="container mx-auto px-4 pt-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-white/80">Planeta não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Planet Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          {planet.name}
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          {planet.description}
        </p>
      </div>

      {/* Lessons List */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Lições</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = checkLessonCompleted(lesson.id);
            const isLocked =
              index > 0 && !checkLessonCompleted(lessons[index - 1].id);

            return (
              <Card
                key={lesson.id}
                className={`bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:scale-102 hover:shadow-lg border ${
                  isCompleted ? "border-green-500/30" : "border-white/10"
                }`}
              >
                <CardContent className="p-6 relative overflow-hidden">
                  {/* Animated background glow */}
                  <div
                    className={`absolute inset-0 opacity-10 ${
                      isCompleted
                        ? "bg-green-500"
                        : isLocked
                        ? "bg-gray-500"
                        : "bg-blue-500"
                    } filter blur-md`}
                  ></div>

                  {/* Star particles for completed lessons */}
                  {isCompleted && (
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-twinkle"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <h3 className="text-xl font-medium">{lesson.title}</h3>
                    <div className="flex items-center">
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-white/40" />
                      ) : (
                        <Star className="w-6 h-6 text-yellow-400 animate-pulse-glow" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-white/70 mb-4 relative z-10">
                    {lesson.description}
                  </p>

                  {isCompleted && (
                    <div className="mb-4 relative z-10">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Precisão</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-white/80">
                        {lesson.xp} XP
                      </span>
                    </div>

                    <Button
                      onClick={() => handleStartLesson(lesson.id)}
                      variant={isLocked ? "outline" : "default"}
                      disabled={isLocked}
                      className={`transition-all duration-300 ${
                        isLocked
                          ? "opacity-50"
                          : isCompleted
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-space-purple hover:bg-space-purple/80 hover:shadow-glow-purple"
                      }`}
                    >
                      {isCompleted ? "Refazer" : "Iniciar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Games Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Jogos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:scale-102 hover:shadow-lg">
            <CardContent className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 animate-pulse-glow"></div>
              <h3 className="text-xl font-medium mb-2 relative z-10">
                Equações Mágicas
              </h3>
              <p className="text-sm text-white/70 mb-4 relative z-10">
                Resolva equações em tempo real e salve o planeta da invasão!
              </p>
              <Button
                onClick={() => navigate(`/game/equation-game`)}
                className="bg-space-blue hover:bg-space-blue/80 transition-all duration-300 hover:shadow-glow-blue relative z-10"
              >
                Jogar
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:scale-102">
            <CardContent className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-slate-500/5"></div>
              <h3 className="text-xl font-medium mb-2 relative z-10">
                Quebra-Cabeças Numéricos
              </h3>
              <p className="text-sm text-white/70 mb-4 relative z-10">
                Organize os números em ordem para resolver o enigma estelar.
              </p>
              <Button
                disabled
                variant="outline"
                className="opacity-50 relative z-10"
              >
                Em breve
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlanetContent;
