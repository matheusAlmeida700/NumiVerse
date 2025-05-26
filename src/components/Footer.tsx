import { Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card/70 backdrop-blur-md border-t border-white/10 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-white mb-4">NumiVerse</h4>
            <p className="text-sm text-white/60">
              Explore a matemática através de uma aventura interestelar.
              Aprenda, jogue e conquiste o universo dos números.
            </p>
          </div>

          <div>
            <h5 className="font-medium text-white mb-4">Explorar</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/planets"
                  className="text-white/60 hover:text-white transition"
                >
                  Planetas
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  className="text-white/60 hover:text-white transition"
                >
                  Jogos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-white mb-4">Recursos</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/achievements"
                  className="text-white/60 hover:text-white transition"
                >
                  Conquistas
                </Link>
              </li>
              <li>
                <Link
                  to="/ranking"
                  className="text-white/60 hover:text-white transition"
                >
                  Ranking
                </Link>
              </li>
              <li>
                <Link
                  to="/qanda"
                  className="text-white/60 hover:text-white transition"
                >
                  Dúvidas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-white mb-4">Conectar</h5>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-space-purple transition"
              >
                <Linkedin />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-space-purple transition"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-space-purple transition"
              >
                <Github />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} NumiVerse. Todos os direitos
            reservados.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              to="/privacy"
              className="text-sm text-white/40 hover:text-white/60 transition"
            >
              Privacidade
            </Link>
            <Link
              to="/terms"
              className="text-sm text-white/40 hover:text-white/60 transition"
            >
              Termos
            </Link>
            <Link
              to="/cookies"
              className="text-sm text-white/40 hover:text-white/60 transition"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
