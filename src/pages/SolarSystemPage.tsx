import { Typewriter } from "react-simple-typewriter";
import NavBar from "@/components/NavBar";
import SolarSystem3D from "@/components/SolarSystem3D";
import MusicPlayer from "@/components/MusicPlayer";

const SolarSystemPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      <NavBar />

      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <SolarSystem3D />
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mt-24 mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-space-purple via-purple-600 to-purple-700 drop-shadow-[0_0_20px_rgba(255,255,255,0.45)] tracking-wide glow-font">
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

        <div className="absolute bottom-12 left-12">
          <MusicPlayer />
        </div>
      </main>
    </div>
  );
};

export default SolarSystemPage;
