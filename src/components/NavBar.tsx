import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Rocket, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "/src/assets/numi/numi-ship.png";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";

const NavBar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { userProgress, userStreak } = useUserProgress();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Default values for if API isn't connected yet
  const xp = userProgress?.totalXp || 0;
  const level = userProgress?.level || 1;
  const streak = userStreak?.days || 0;
  const levelProgress = userProgress ? (userProgress.totalXp % 1000) / 10 : 0; // Convert to percentage (0-100)

  // Navigation links configuration
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/planetas", label: "Planetas" },
    { path: "/missoes", label: "Missões" },
    { path: "/conquistas", label: "Conquistas" },
  ];

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-md border-b border-white/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-12 h-12 rotate-6" />
          <span className="text-xl font-bold text-white text-glow">
            NumiVerse
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="text-white p-2">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-card/90 backdrop-blur-md border-white/10"
            >
              <div className="flex flex-col gap-6 pt-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-lg ${
                        isActive
                          ? "text-white font-medium"
                          : "text-white/70 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="border-t border-white/10 pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-300" />
                        <span className="text-yellow-100">{xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-space-blue" />
                        <span className="text-space-blue">
                          Sequência: {streak}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to="/auth"
                      className="bg-space-purple px-4 py-2 rounded-md text-white font-medium"
                    >
                      Entrar
                    </NavLink>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/80 hover:text-white transition"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* User Stats & Profile */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hidden sm:flex items-center gap-2 bg-card/50 py-1 px-3 rounded-full">
                        <Star className="w-4 h-4 text-yellow-300" />
                        <span className="text-yellow-100 text-sm font-medium">
                          {xp}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Experiência Total</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hidden sm:flex items-center gap-2 bg-space-blue/20 py-1 px-3 rounded-full">
                        <Rocket className="w-4 h-4 text-space-blue" />
                        <span className="text-space-blue text-sm font-medium">
                          Sequência: {streak}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Dias consecutivos de estudo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex items-center gap-2 px-2 py-1 border border-white/20 rounded-lg">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-space-purple to-space-blue"></div>
                  <div className="flex flex-col">
                    <div className="h-1.5 w-12 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-space-purple to-space-blue rounded-full"
                        style={{ width: `${levelProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-white/80 text-[10px]">
                      Nível {level}
                    </span>
                  </div>
                </div>
              </>
            )}

            <Link to={isAuthenticated ? "/perfil" : "/login"}>
              <Avatar className="w-8 h-8 border border-space-purple cursor-pointer">
                <AvatarImage src={user?.avatarUrl || ""} />
                <AvatarFallback className="bg-space-blue text-white text-xs">
                  {user?.name?.substring(0, 2).toUpperCase() || "NU"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
