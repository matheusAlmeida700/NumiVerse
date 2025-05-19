import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Rocket, Menu, X, Flame } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Logo from "/src/assets/numi/numi-ship.png";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { planets } from "@/data/planetsData";

const NavBar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const { data: userData, refetch } = useUserData();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: "/solar", label: "Sistema Solar" },
    { path: "/achievements", label: "Conquistas" },
  ];

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

                {/* Mobile Planets Menu */}
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-white/50 uppercase">
                    Planetas
                  </h3>
                  {planets.map((planet) => (
                    <NavLink
                      key={planet.id}
                      to={`/planet/${planet.id}`}
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg ${
                          isActive
                            ? "text-white font-medium"
                            : "text-white/70 hover:text-white"
                        }`
                      }
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${planet.color}`}
                      ></div>
                      {planet.name}
                    </NavLink>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-300" />
                        <span className="text-yellow-100">
                          {userData?.xp} XP
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-space-blue" />
                        <span className="text-space-blue">
                          Sequência: {userData?.streak?.current ?? 0}
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

            {/* Planets Navigation Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white/80 hover:text-white bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10">
                    Planetas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[400px] bg-card/95 backdrop-blur-md">
                      {planets.map((planet) => (
                        <Link
                          key={planet.id}
                          to={`/planet/${planet.id}`}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 transition-all group"
                        >
                          <div
                            className={`w-8 h-8 rounded-full ${planet.color} flex items-center justify-center`}
                          >
                            {planet.icon && planet.icon()}
                          </div>
                          <span className="font-medium group-hover:text-white transition-colors">
                            {planet.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Stats & Profile */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hidden sm:flex items-center gap-2 bg-yellow-700/20 py-2 px-3 rounded-full">
                        <Star className="w-6 h-6 text-yellow-300" />
                        <span className="text-yellow-100 font-bold">
                          {userData?.xp}XP
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
                      <div className="hidden sm:flex items-center gap-2 bg-space-purple/20 py-2 px-3 rounded-full">
                        <Flame className="w-6 h-6 text-space-purple" />
                        <span className="font-bold">
                          {userData?.streak?.current ?? 0}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Dias consecutivos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            <Link to={isAuthenticated ? "/perfil" : "/login"}>
              <Avatar className="w-8 h-8 border border-space-purple cursor-pointer hover:ring-2 hover:ring-space-purple/50 transition-all">
                <AvatarImage src={userData?.avatarUrl || ""} />
                <AvatarFallback className="bg-space-blue text-white text-xs">
                  {userData?.name?.substring(0, 2).toUpperCase() || "NU"}
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
