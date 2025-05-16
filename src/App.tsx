import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import PlanetView from "./pages/PlanetView";
import GamePage from "./pages/GamePage";
import LessonView from "./pages/LessonView";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./contexts/AuthContext";
import SolarSystemPage from "./pages/SolarSystemPage";

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
            <Route path="/auth" element={<AuthPage />} />

            <Route path="/" element={<Index />} />
            <Route path="/solar" element={<SolarSystemPage />} />
            <Route path="/planet/:planetId" element={<PlanetView />} />
            <Route path="/game/:gameId" element={<GamePage />} />
            <Route path="/lesson/:lessonId" element={<LessonView />} />

            <Route
              path="/missoes"
              element={
                <div className="min-h-screen pt-24 pb-12 px-4">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">
                      Missões (Em Desenvolvimento)
                    </h1>
                    <p className="text-center text-white/70">
                      Esta funcionalidade estará disponível em breve.
                    </p>
                  </div>
                </div>
              }
            />
            <Route
              path="/conquistas"
              element={
                <div className="min-h-screen pt-24 pb-12 px-4">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">
                      Conquistas (Em Desenvolvimento)
                    </h1>
                    <p className="text-center text-white/70">
                      Esta funcionalidade estará disponível em breve.
                    </p>
                  </div>
                </div>
              }
            />
            <Route
              path="/perfil"
              element={
                <div className="min-h-screen pt-24 pb-12 px-4">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">
                      Perfil do Usuário
                    </h1>
                    <p className="text-center text-white/70">
                      Detalhes completos do perfil estarão disponíveis em breve.
                    </p>
                  </div>
                </div>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
