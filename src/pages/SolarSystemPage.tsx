import { Typewriter } from "react-simple-typewriter";
import NavBar from "@/components/NavBar";
import SolarSystem3D from "@/components/SolarSystem3D";
import { useState, useEffect } from "react";

const SolarSystemPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      <NavBar />

      <main className="flex-1 relative">
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        <div className="absolute inset-0">
          <SolarSystem3D />
        </div>

        <div
          className={`transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mt-32 mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-space-purple via-purple-600 to-purple-700 drop-shadow-[0_0_20px_rgba(255,255,255,0.45)] tracking-wide glow-font">
            <Typewriter
              words={[
                "Bem-vindo ao NumiVerse.",
                "Escolha um astro para começar sua jornada.",
                "Cada órbita guarda um desafio lógico.",
                "Prepare-se para uma aventura intergaláctica!",
              ]}
              loop={1}
              cursor
              cursorStyle="|"
              cursorColor="rgba(255,255,255,0.25)"
              cursorBlinking={false}
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2500}
            />
          </h2>
        </div>
      </main>
    </div>
  );
};

export default SolarSystemPage;
