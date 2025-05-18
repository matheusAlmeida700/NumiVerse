import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import SolarSystem3D from "@/components/SolarSystem3D";

const SolarSystemPage = () => {
  useEffect(() => {
    document.title = "NumiVerse - Sistema Solar Matemático";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      <NavBar />

      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <SolarSystem3D />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mt-24 mb-6 relative z-10 text-glow">
          Explore os Planetas Matemáticos
        </h2>
      </main>
    </div>
  );
};

export default SolarSystemPage;
