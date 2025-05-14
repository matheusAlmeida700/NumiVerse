
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planet/:planetId" element={<PlanetView />} />
          <Route path="/planets" element={<Navigate to="/" />} />
          <Route path="/game/:gameId" element={<GamePage />} />
          <Route path="/lesson/:lessonId" element={<LessonView />} />
          <Route path="/missoes" element={<h1 className="p-8 text-center">Missões (Em Desenvolvimento)</h1>} />
          <Route path="/conquistas" element={<h1 className="p-8 text-center">Conquistas (Em Desenvolvimento)</h1>} />
          <Route path="/comunidade" element={<h1 className="p-8 text-center">Comunidade (Em Desenvolvimento)</h1>} />
          <Route path="/register" element={<h1 className="p-8 text-center">Página de Registro (Em Desenvolvimento)</h1>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
