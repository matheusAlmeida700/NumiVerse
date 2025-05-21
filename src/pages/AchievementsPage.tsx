import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  achievements,
  getAchievementsByCategory,
  Achievement,
} from "@/data/achievementsData";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useUserData } from "@/hooks/useUserData";

const LoadingPage = () => (
  <div className="min-h-screen flex flex-col bg-space-gradient">
    <div className="space-stars"></div>
    <NavBar />
    <main className="flex-1 pt-24 pb-16 container mx-auto px-4 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </main>
    <Footer />
  </div>
);

const AchievementsPage = () => {
  const [lessonAchievements, setLessonAchievements] = useState<Achievement[]>(
    []
  );
  const [streakAchievements, setStreakAchievements] = useState<Achievement[]>(
    []
  );
  const [explorationAchievements, setExplorationAchievements] = useState<
    Achievement[]
  >([]);
  const [masteryAchievements, setMasteryAchievements] = useState<Achievement[]>(
    []
  );
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { data: userData } = useUserData();

  useEffect(() => {
    document.title = "NumiVerse - Conquistas";

    const loadAchievements = () => {
      setLessonAchievements(getAchievementsByCategory("lesson"));
      setStreakAchievements(getAchievementsByCategory("streak"));
      setExplorationAchievements(getAchievementsByCategory("exploration"));
      setMasteryAchievements(getAchievementsByCategory("mastery"));

      setTotalCount(achievements.length);
    };

    loadAchievements();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!isLoading && userData?.achievements) {
      setUnlockedCount(userData.achievements.length);
    }
  }, [userData, isLoading]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-slate-500";
      case "rare":
        return "bg-blue-500";
      case "epic":
        return "bg-purple-500";
      case "legendary":
        return "bg-yellow-500";
      default:
        return "bg-slate-500";
    }
  };

  const isUnlocked = (achievementId: string) =>
    userData?.achievements.includes(achievementId);

  const renderAchievementCard = (achievement: Achievement) => {
    const unlocked = isUnlocked(achievement.id);

    return (
      <Card
        key={achievement.id}
        className={`bg-card/50 backdrop-blur-sm border ${
          unlocked ? "border-white/30" : "border-white/10 opacity-70"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                unlocked ? "" : "grayscale"
              }`}
            >
              {achievement.secret && !unlocked ? "?" : achievement.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-medium">
                  {achievement.secret && !unlocked ? "???" : achievement.title}
                </h3>
                <Badge className={`${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity.charAt(0).toUpperCase() +
                    achievement.rarity.slice(1)}
                </Badge>
              </div>

              <p className="text-sm text-white/70 mb-1">
                {achievement.secret && !unlocked
                  ? "Esta conquista está oculta. Continue explorando para descobrir."
                  : achievement.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      <div className="space-stars"></div>
      <NavBar />

      <main className="flex-1 pt-32 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Conquistas
          </h1>
          <p className="text-white/70 text-center mb-3">
            {unlockedCount} de {totalCount} conquistas desbloqueadas
          </p>

          <div className="w-full bg-white/10 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-space-purple to-space-blue h-full rounded-full"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>

          <Tabs defaultValue="lesson" className="mb-8">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="lesson">Lições</TabsTrigger>
              <TabsTrigger value="streak">Sequências</TabsTrigger>
              <TabsTrigger value="exploration">Exploração</TabsTrigger>
              <TabsTrigger value="mastery">Maestria</TabsTrigger>
            </TabsList>

            <TabsContent value="lesson" className="space-y-4">
              {lessonAchievements.map(renderAchievementCard)}
            </TabsContent>

            <TabsContent value="streak" className="space-y-4">
              {streakAchievements.map(renderAchievementCard)}
            </TabsContent>

            <TabsContent value="exploration" className="space-y-4">
              {explorationAchievements.map(renderAchievementCard)}
            </TabsContent>

            <TabsContent value="mastery" className="space-y-4">
              {masteryAchievements.map(renderAchievementCard)}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AchievementsPage;
