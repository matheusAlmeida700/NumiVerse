import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getPlanetById } from "@/data/planetsData";
import PlanetContent from "@/components/PlanetContent";

const PlanetView = () => {
  const { planetId } = useParams<{ planetId: string }>();

  useEffect(() => {
    const planet = getPlanetById(planetId || "");
    if (planet) {
      document.title = `NumiVerse - Explorar ${planet.name}`;
    } else {
      document.title = "NumiVerse - Explorar Planeta";
    }
  }, [planetId]);

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      {/* Space background */}
      <div className="space-stars"></div>

      <NavBar />

      <main className="flex-1 pt-20 pb-16">
        <PlanetContent planetId={planetId || ""} />
      </main>

      <Footer />
    </div>
  );
};

export default PlanetView;
