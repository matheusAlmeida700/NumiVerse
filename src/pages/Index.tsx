import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Rocket } from "lucide-react";
import Hero from "../assets/numiVerse.png";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient relative h-screen">
      {/* Space background */}
      <ParticleBackground />

      <Header />

      <main className="flex-1">
        {/* Hero section */}
        <section className="pt-32 pb-20 px-4 relative">
          <div className="max-w-6xl mx-auto text-center">
            <div>
              <h1 className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 font-bold">
                Explore o universo da matemática! Aprenda, jogue e conquiste
                planetas em uma jornada cósmica cheia de desafios.
              </h1>
              <img className="mx-auto mb-12 animate-float" src={Hero} alt="" />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button className="text-md px-8 py-6 bg-space-purple hover:bg-space-purple/80 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    COMECE SUA JORNADA
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="text-md px-8 py-6 border-white/20 hover:bg-white/5"
                  >
                    JÁ TENHO UMA CONTA
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div id="introduction" className="about-content container">
          <div data-aos="zoom-in" data-aos-delay="100">
            <img
              src="https://www.lendo.org/wp-content/uploads/2023/08/introducao-trabalho-1.jpg"
              alt=""
            />
          </div>

          <div
            data-aos="zoom-out-left"
            data-aos-delay="250"
            className="about-description"
          >
            <h2></h2>
            <p></p>
            <p></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

{
  /* Features section */
}
// <section className="py-20 px-4 relative">
//   <div className="max-w-6xl mx-auto">
//     <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
//       Por que o NumiVerse?
//     </h2>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//       <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
//         <div className="w-16 h-16 rounded-full bg-space-purple/30 flex items-center justify-center mb-4">
//           <Star className="w-8 h-8 text-space-purple" />
//         </div>
//         <h3 className="text-xl font-bold text-white mb-3">
//           Aprendizado Gamificado
//         </h3>
//         <p className="text-white/70 text-center">
//           Ganhe XP, conquiste conquistas e suba de nível ao concluir
//           lições e desafios.
//         </p>
//       </div>

//       <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
//         <div className="w-16 h-16 rounded-full bg-space-blue/30 flex items-center justify-center mb-4">
//           <Rocket className="w-8 h-8 text-space-blue" />
//         </div>
//         <h3 className="text-xl font-bold text-white mb-3">
//           Conteúdo Interativo
//         </h3>
//         <p className="text-white/70 text-center">
//           Interaja com modelos 3D, visualizações e jogos que dão vida
//           aos conceitos matemáticos.
//         </p>
//       </div>

//       <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
//         <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center mb-4">
//           <svg
//             className="w-8 h-8 text-green-500"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M12 4V20M4 12H20"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//         <h3 className="text-xl font-bold text-white mb-3">
//           Domínio Progressivo
//         </h3>
//         <p className="text-white/70 text-center">
//           Comece pelos fundamentos e avance gradualmente por conceitos
//           cada vez mais complexos no seu próprio ritmo.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>
