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
    <div className="min-h-screen flex flex-col bg-space-gradient">
      <div className="space-stars"></div>

      <div className="absolute top-1/2 left-2 w-[400px] h-[400px] rounded-full blur-[150px] opacity-20"></div>
      <div className="absolute bottom-1/2 right-2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-20 "></div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${
                Math.random() * 5
              }s`,
            }}
          />
        ))}
      </div>

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
