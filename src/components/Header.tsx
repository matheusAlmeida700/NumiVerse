import { Link } from "react-router-dom";
import Logo from "/src/assets/numi/numi-ship.png";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

const Header = () => {
  return (
    <nav className="fixed poppins top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-md border-b border-white/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-4 hover:scale-110 transition-transform"
        >
          <img src={Logo} alt="Logo" className="w-16 h-16 rotate-6" />
          <span className="text-2xl font-bold text-white text-glow">
            NumiVerse
          </span>
        </Link>

        <Link to="/auth">
          <Button className="relative group px-6 py-2 bg-space-purple text-white rounded-xl flex items-center gap-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
            <div className="absolute inset-0 z-0 blur-md opacity-20 bg-gradient-to-r from-space-purple via-pink-500 to-space-purple transition-all duration-700 group-hover:opacity-50" />
            <ArrowUpRight className="relative z-10 transform transition-transform duration-500 group-hover:rotate-[45deg]" />
            <span className="relative z-10">COMECE AGORA</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
