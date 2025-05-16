import { Link } from "react-router-dom";
import Logo from "/src/assets/numi/numi-ship.png";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-md border-b border-white/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-12 h-12 rotate-6" />
          <span className="text-xl font-bold text-white text-glow">
            NumiVerse
          </span>
        </Link>

        <Button className="flex items-center space-x-6">
          <Link
            to="/auth"
            className="text-white/80 hover:text-white transition"
          >
            COMECE AGORA
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Header;
