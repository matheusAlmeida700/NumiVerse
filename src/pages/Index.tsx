import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "../assets/NumiVerse.png";
import ParticleBackground from "@/components/ParticleBackground";
import Rocket from "@/components/Rocket";
import { RocketIcon } from "lucide-react";
import NumiMath from "../assets/home/numi-math.png";
import Cellphones from "../assets/home/meteors.png";
import Cellphone from "../assets/home/cards-cellphone.png";
import NumiShip from "../assets/home/numi-ship.png";
import NumiCell from "../assets/home/cellphone.png";
import FeatureSection from "@/components/FeatureSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient relative">
      <ParticleBackground />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 px-4 flex items-center min-h-screen">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-14 font-bold">
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
                <Button className="text-md px-8 py-6 bg-space-purple hover:bg-space-purple/80 flex items-center gap-2">
                  <RocketIcon />
                  COMECE SUA JORNADA
                </Button>
              </Link>
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="text-md text-white px-8 py-6 border-white/20 hover:bg-white/5"
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
              <h2 className="text-2xl md:text-4xl mb-12 font-bold text-space-purple">
                Divertido, acessível e poderoso.
              </h2>
              <p className="text-xl text-white/80">
                Aprender matemática com o NumiVerse é como embarcar em uma
                aventura intergaláctica! Com desafios rápidos, lições
                envolventes e um mascote que te acompanha em cada passo, você
                aprende de um jeito leve e prático. Ganhe pontos, desbloqueie
                níveis e descubra que a matemática pode ser sua maior aliada.
              </p>
            </div>
          </div>

          <FeatureSection
            title="Divertido, acessível e poderoso."
            text="Aprender matemática com o NumiVerse é como embarcar em uma aventura intergaláctica! Com desafios rápidos, lições envolventes e um mascote que te acompanha em cada passo, você aprende de um jeito leve e prático. Ganhe pontos, desbloqueie níveis e descubra que a matemática pode ser sua maior aliada."
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
            title="Não perca o ritmo."
            text="Fica fácil manter o foco com lições rápidas, desafios divertidos e lembretes do nosso mascote intergaláctico, sempre pronto pra te motivar a continuar sua jornada matemática."
            image={NumiMath}
          />
          <FeatureSection
            title="Aprenda matemática com o NumiVerse."
            text=""
            image={NumiCell}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
