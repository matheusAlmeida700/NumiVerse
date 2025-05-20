import { Typewriter } from "react-simple-typewriter";
import NavBar from "@/components/NavBar";
import SolarSystem3D from "@/components/SolarSystem3D";
import { useState, useEffect } from "react";

const SolarSystemPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      <NavBar />

      <main className="flex-1 relative">
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

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-20"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite ${
                  Math.random() * 5
                }s`,
              }}
            />
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-blue-900/15 rounded-full blur-[150px] pointer-events-none"></div>
      </main>
    </div>
  );
};

export default SolarSystemPage;
