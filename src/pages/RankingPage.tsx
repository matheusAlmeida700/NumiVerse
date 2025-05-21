import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/api";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star, Award } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserRankingDisplay {
  id: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  streak?: {
    current: number;
    lastUpdate: string;
  };
  rank: number;
}

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

const RankingPage = () => {
  const [usersRanking, setUsersRanking] = useState<UserRankingDisplay[]>([]);
  const [currentUserRank, setCurrentUserRank] =
    useState<UserRankingDisplay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const { data: allUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
  });

  console.log(allUsers);

  useEffect(() => {
    document.title = "NumiVerse - Classificação";

    if (allUsers) {
      const sortedUsers = [...allUsers]
        .map((userData) => ({
          id: userData.id,
          name: userData.name || "Astronauta",
          avatarUrl: userData.avatarUrl,
          xp: userData.xp || 0,
          streak: userData.streak,
        }))
        .sort((a, b) => b.xp - a.xp);

      const rankedUsers = sortedUsers.map((user, index) => ({
        ...user,
        rank: index + 1,
      }));

      setUsersRanking(rankedUsers);

      if (user) {
        const currentUser = rankedUsers.find((u) => u.id === user.id);
        if (currentUser) {
          setCurrentUserRank(currentUser);
        }
      }

      setIsLoading(false);
    }
  }, [allUsers, user]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold">{rank}</span>;
    }
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
          <div className="flex items-center justify-center mb-8">
            <Award className="w-8 h-8 text-yellow-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Classificação</h1>
          </div>

          {currentUserRank && (
            <div className="mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-space-purple/20 to-space-blue/20 z-0 animate-pulse"></div>
              <Card className="bg-card/50 backdrop-blur-md border border-white/30">
                <CardContent className="p-4 flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center mr-4">
                    {getRankIcon(currentUserRank.rank)}
                  </div>

                  <Avatar className="h-12 w-12 mr-4 border-2 border-white/30">
                    <AvatarImage
                      src={
                        currentUserRank.avatarUrl ||
                        "/assets/nav/user-profile.png"
                      }
                    />
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-bold">{currentUserRank.name}</span>
                      <Badge className="ml-2 bg-space-purple">
                        {currentUserRank.streak?.current || 0} dias
                      </Badge>
                    </div>
                    <div className="text-sm text-white/70">
                      Sua posição atual
                    </div>
                  </div>

                  <div className="text-xl font-bold flex items-center">
                    {currentUserRank.xp} XP
                    <Star className="h-5 w-5 ml-1 text-yellow-400 fill-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-xl font-semibold mb-4">Top Alunos</h2>

            {usersRanking.slice(0, 20).map((user) => (
              <Card
                key={user.id}
                className={`bg-card/50 backdrop-blur-md ${
                  user.id === currentUserRank?.id
                    ? "border-white/60 ring-2 ring-space-purple/30"
                    : "border-white/10 hover:border-white/30"
                } transition-all`}
              >
                <CardContent className="p-4 flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center mr-4">
                    {getRankIcon(user.rank)}
                  </div>

                  <Avatar
                    className={`h-10 w-10 mr-4 ${
                      user.rank <= 3 ? "border-2 border-yellow-400" : ""
                    }`}
                  >
                    <AvatarImage
                      src={user.avatarUrl || "/assets/nav/user-profile.png"}
                    />
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-bold">{user.name}</span>
                      {user.streak?.current > 0 && (
                        <Badge className="ml-2 bg-blue-500/80">
                          {user.streak.current} dias
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-lg font-bold flex items-center">
                    {user.xp} XP
                    <Star
                      className={`h-4 w-4 ml-1 ${
                        user.rank <= 3
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/50"
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RankingPage;
