
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "NumiVerse - Página não encontrada";
    console.error(
      "404 Error: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-gradient">
      <div className="space-stars"></div>
      <div className="text-center p-6 bg-card/80 backdrop-blur-md border border-white/10 rounded-xl max-w-md">
        <h1 className="text-5xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-xl text-white mb-8">Ops! Página não encontrada</p>
        <p className="text-white/80 mb-8">A página que você está procurando pode ter sido removida ou não existe.</p>
        <Link to="/">
          <Button className="bg-space-purple hover:bg-space-purple/80">
            Voltar para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
