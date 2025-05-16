
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
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";

// Create query client with default options
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />

          {/* Main routes */}
          <Route path="/" element={<Index />} />
          <Route path="/planetas" element={<Navigate to="/" replace />} />
          <Route path="/planet/:planetId" element={<PlanetView />} />
          <Route path="/game/:gameId" element={<GamePage />} />
          <Route path="/lesson/:lessonId" element={<LessonView />} />
          
          {/* Additional routes */}
          <Route
            path="/missoes"
            element={
              <div className="min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-center mb-8">Missões (Em Desenvolvimento)</h1>
                  <p className="text-center text-white/70">Esta funcionalidade estará disponível em breve.</p>
                </div>
              </div>
            }
          />
          <Route
            path="/conquistas"
            element={
              <div className="min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-center mb-8">Conquistas (Em Desenvolvimento)</h1>
                  <p className="text-center text-white/70">Esta funcionalidade estará disponível em breve.</p>
                </div>
              </div>
            }
          />
          <Route
            path="/perfil"
            element={
              <div className="min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl font-bold text-center mb-8">Perfil do Usuário</h1>
                  <p className="text-center text-white/70">Detalhes completos do perfil estarão disponíveis em breve.</p>
                </div>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
