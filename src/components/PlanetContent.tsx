import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Star, Sparkles } from "lucide-react";
import { getPlanetById } from "@/data/planetsData";
import { getLessonsByPlanet } from "@/data/lessonData";
import { isLessonCompleted, useUserData } from "@/hooks/useUserData";

interface PlanetContentProps {
  planetId: string;
}

const PlanetContent: React.FC<PlanetContentProps> = ({ planetId }) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const { data: userData } = useUserData();

  const planet = useMemo(() => getPlanetById(planetId), [planetId]);
  const lessons = useMemo(() => getLessonsByPlanet(planetId), [planetId]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };

  const checkLessonCompleted = (lessonId: string): boolean => {
    return userData?.progress
      ? isLessonCompleted(userData.progress, lessonId)
      : false;
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "iniciante":
        return "bg-green-500/80";
      case "intermediário":
        return "bg-yellow-500/80";
      case "avançado":
        return "bg-red-500/80";
      default:
        return "bg-blue-500/80";
    }
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

  const completedLessonsCount = lessons.filter((lesson) =>
    checkLessonCompleted(lesson.id)
  ).length;

  return (
    <div className="container mx-auto px-4 poppins">
      <div
        className={`mb-10 text-center transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 pt-12 pb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
          {planet.name}
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          {planet.description}
        </p>
        <div className="relative w-full max-w-md mx-auto mt-8 h-1">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-space-purple to-transparent"></div>
        </div>
      </div>

      <div className="mb-12">
        <div
          className={`flex items-center justify-between mb-6 transition-all duration-700 delay-100 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" /> Lições
          </h2>
          <div className="text-white/60 flex flex-col md:flex-row md:items-center gap-2">
            <span>
              {completedLessonsCount} de {lessons.length} completadas
            </span>
            <Progress
              value={(completedLessonsCount / lessons.length) * 100}
              className="w-full md:w-32 h-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = checkLessonCompleted(lesson.id);
            return (
              <Card
                key={lesson.id}
                className={`bg-card/50 backdrop-blur-sm transform transition-all delay-${
                  index * 100
                } hover:shadow-lg border ${
                  isCompleted ? "border-green-500/30" : "border-white/10"
                } ${
                  loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-6 relative overflow-hidden h-full flex flex-col justify-between">
                  <div
                    className={`absolute inset-0 opacity-10 ${
                      isCompleted ? "bg-green-500" : "bg-blue-500"
                    } filter blur-md`}
                  ></div>

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
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">{lesson.title}</h3>
                      {lesson.difficulty && (
                        <span
                          className={`text-sm px-2 py-1 rounded-full mr-4 text-white ${getDifficultyColor(
                            lesson.difficulty
                          )}`}
                        >
                          {lesson.difficulty}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
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
                      <div className="flex justify-between text-sm text-white/60 mb-2">
                        <span>Precisão</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-end">
                      <img
                        className="w-8 h-8 text-yellow-400 mr-2"
                        src="/images/nav/xp.png"
                        alt="Coin"
                      />
                      <span className="text-md text-white/80 font-bold">
                        {lesson.xp} XP
                      </span>
                    </div>

                    <Button
                      onClick={() => handleStartLesson(lesson.id)}
                      variant="default"
                      className={`transition-all duration-300 ${
                        isCompleted
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
    </div>
  );
};

export default PlanetContent;
