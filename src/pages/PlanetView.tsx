
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PlanetPage from "@/components/PlanetPage";

// Mapping of planet IDs to Portuguese names
const planetNames = {
  algebra: "Álgebra",
  aritmetica: "Aritmética",
  estatistica: "Estatística",
  funcoes: "Funções",
  geometria: "Geometria"
};

const PlanetView = () => {
  const { planetId } = useParams<{ planetId: string }>();
  
  useEffect(() => {
    if (planetId && planetId in planetNames) {
      document.title = `NumiVerse - Explorar ${planetNames[planetId as keyof typeof planetNames]}`;
    } else {
      document.title = "NumiVerse - Explorar Planeta";
    }
  }, [planetId]);
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      {/* Space background */}
      <div className="space-stars"></div>
      
      <NavBar />
      
      <main className="flex-1">
        <PlanetPage />
      </main>
      
      <Footer />
    </div>
  );
};

export default PlanetView;
