import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "../assets/NumiVerse.png";
import Rocket from "@/components/Rocket";
import { RocketIcon } from "lucide-react";
import NumiMath from "@/assets/home/numi-math.png";
import Cellphones from "@/assets/home/meteors.png";
import Cellphone from "@/assets/home/cards-cellphone.png";
import NumiShip from "@/assets/home/numi-ship.png";
import NumiCell from "@/assets/home/cellphone-end.png";
import Numi from "@/assets/home/numi-cellphone-end.png";
import FeatureSection from "@/components/FeatureSection";
import ParticleBackground from "@/components/ParticleBackground.jsx";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient relative">
      <ParticleBackground />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 px-4 flex items-center min-h-screen">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-14 font-bold poppins">
              Explore o universo da matemática! Aprenda, jogue e conquiste
              planetas em uma jornada cósmica cheia de desafios.
            </h1>
            <img
              src={Hero}
              alt="NumiVerse"
              className="mx-auto mb-12 animate-float px-6"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button className="relative group px-8 py-6 text-md bg-space-purple text-white rounded-xl flex items-center gap-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
                  <div className="absolute inset-0 z-0 blur-md opacity-20 bg-gradient-to-r from-space-purple via-pink-500 to-space-purple transition-all duration-700 group-hover:opacity-50" />
                  <RocketIcon className="relative z-10 transform transition-transform duration-500 group-hover:rotate-[20deg]" />
                  <span className="relative z-10">COMECE SUA JORNADA</span>
                </Button>
              </Link>
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="text-md text-white px-8 py-6 border-white/20 hover:bg-white/5 hover:scale-105 hover:shadow-lg border-2 transition-all"
                >
                  JÁ TENHO UMA CONTA
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto">
          <div className="relative flex flex-col md:flex-row items-center justify-center md:h-[750px]">
            <div className="w-full md:flex-1 h-full">
              <Rocket />
            </div>
            <div className="w-full md:flex-1 flex flex-col justify-center px-6 md:px-10 md:pr-24 max-w-md md:max-w-none">
              <h2 className="text-2xl md:text-3xl mb-12 font-bold text-space-purple">
                Divertido, acessível e poderoso.
              </h2>
              <p className="text-lg text-white/80">
                Aprender matemática com o NumiVerse é como embarcar em uma
                aventura intergaláctica! Com desafios rápidos, lições
                envolventes e um mascote que te acompanha em cada passo, você
                aprende de um jeito leve e prático. Ganhe pontos, desbloqueie
                níveis e descubra que a matemática pode ser sua maior aliada.
              </p>
            </div>
          </div>

          <FeatureSection
            title="Mantenha sua ofensiva ativa!"
            text="No NumiVerse, cada dia de estudo conta. Ao completar lições diariamente, você mantém sua ofensiva ativa e acumula pontos continuamente. Quanto mais constante for, mais recompensas e conteúdos você desbloqueia. Não perca o ritmo — a jornada espacial do conhecimento continua todos os dias!"
            image={Cellphone}
            reverse
          />
          <FeatureSection
            title="Tudo pelo seu aprendizado!"
            text="Utilizamos metodologias comprovadas e práticas envolventes para criar cursos eficazes que desenvolvem habilidades essenciais em cálculo, raciocínio lógico, resolução de problemas e interpretação matemática!"
            image={NumiShip}
          />
          <FeatureSection
            title="Não perca o ritmo."
            text="Fica fácil manter o foco com lições rápidas, desafios divertidos e lembretes do nosso mascote intergaláctico, sempre pronto pra te motivar a continuar sua jornada matemática."
            image={Cellphones}
            reverse
          />
          <FeatureSection
            title="Pensado para todos aprenderem com leveza."
            text="O NumiVerse foi criado com carinho, cuidado e atenção aos detalhes, para que todas as pessoas possam aprender matemática de forma acessível, divertida e eficaz. Cada lição, animação e mecânica foi pensada para facilitar o entendimento, respeitando diferentes ritmos e estilos de aprendizado."
            image={NumiMath}
          />
        </section>

        <div className="relative h-screen text-center mt-24 flex flex-col md:flex-row items-center justify-center">
          <img
            className="absolute bottom-0 z-0"
            src="/bg-purple.png"
            alt="Purple Background"
          />
          <div className="w-full z-10 md:flex-1 flex flex-col justify-center px-6 md:px-8 max-w-md md:max-w-none">
            <h2 className="text-2xl md:text-4xl font-bold text-space-purple">
              a
            </h2>
            <p className="text-xl">a</p>
          </div>
          <div className="w-full z-10 md:flex-1 flex justify-center items-center">
            <img
              src={NumiCell}
              alt="Numi Cellphone"
              className="w-full md:min-w-[900px]"
            />
          </div>
          <div className="w-full z-10 md:flex-1 flex flex-col justify-center px-6 md:px-8 max-w-md md:max-w-none">
            <h2 className="text-2xl md:text-4xl font-bold text-space-purple">
              a
            </h2>
            <p className="text-xl">a</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
