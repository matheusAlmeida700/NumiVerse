import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getPlanetById } from "@/data/planetsData";
import PlanetContent from "@/components/PlanetContent";

const PlanetView = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const planet = getPlanetById(planetId || "");
    if (planet) {
      document.title = `NumiVerse - ${planet.name}`;
    } else {
      document.title = "NumiVerse - Explorar Planeta";
    }

    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [planetId]);

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient overflow-x-hidden">
      <div className="space-stars"></div>

      <NavBar />

      <main
        className={`flex-1 pt-20 pb-16 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <PlanetContent planetId={planetId || ""} />
      </main>

      <Footer />
    </div>
  );
};

export default PlanetView;
