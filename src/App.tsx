import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlanetView from "./pages/PlanetView";
import GamePage from "./pages/GamePage";
import LessonView from "./pages/LessonView";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./contexts/AuthContext";
import SolarSystemPage from "./pages/SolarSystemPage";
import AchievementsPage from "./pages/AchievementsPage";
import MusicPlayerButton from "./components/MusicPlayerButton";
import RankingPage from "./pages/RankingPage";
import QandAListPage from "./pages/QandA/QandAListPage";
import QandADetailPage from "./pages/QandA/QandADetailPage";
import GamesPage from "./pages/GamesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/solar" element={<SolarSystemPage />} />
            <Route path="/planet/:planetId" element={<PlanetView />} />
            <Route path="/game/:gameId" element={<GamePage />} />
            <Route path="/lesson/:lessonId" element={<LessonView />} />
            <Route path="/qanda" element={<QandAListPage />} />
            <Route path="/qanda/:id" element={<QandADetailPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/game/:gameId" element={<GamePage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
    <MusicPlayerButton />
  </QueryClientProvider>
);

export default App;
