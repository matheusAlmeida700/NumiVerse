
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PlanetPage from "@/components/PlanetPage";

const PlanetView = () => {
  const { planetId } = useParams<{ planetId: string }>();
  
  useEffect(() => {
    document.title = `NumiVerse - Explore ${planetId?.charAt(0).toUpperCase() + (planetId?.slice(1) || '')}`;
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
