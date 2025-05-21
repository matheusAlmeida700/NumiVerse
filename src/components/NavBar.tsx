import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { planets } from "@/data/planetsData";
import Logo from "@/assets/numi/numi-ship.png";
import Streak from "@/assets/nav/streak.png";
import Xp from "@/assets/nav/xp.png";
import UserProfile from "@/assets/nav/user-profile.png";

const NavBar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const { data: userData, refetch } = useUserData();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: "/solar", label: "SISTEMA SOLAR" },
    { path: "/achievements", label: "CONQUISTAS" },
    { path: "/ranking", label: "RANKING" },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed poppins top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-md border-b border-white/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-4 hover:scale-110 transition-transform"
        >
          <img src={Logo} alt="Logo" className="w-14 h-14 rotate-6" />
          <span className="text-2xl font-bold text-white text-glow">
            NumiVerse
          </span>
        </Link>

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
              <div className="flex flex-col gap-6 pt-6 poppins font-bold">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-purple-500"
                          : "text-white/70 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="mt-4 space-y-2">
                  <h3 className="text-md font-semibold text-white/70 uppercase">
                    ASTROS
                  </h3>
                  {planets.map((planet) => (
                    <NavLink
                      key={planet.id}
                      to={`/planet/${planet.id}`}
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg ${
                          isActive
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                        }`
                      }
                    >
                      <div className="w-8 h-8 rounded-full">
                        {planet.icon && planet.icon()}
                      </div>
                      {planet.name}
                    </NavLink>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <img src={Xp} className="w-8 h-8" alt="" />
                        <span className="text-xl">{userData?.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={Streak} className="w-8 h-8" alt="XP" />
                        <span className="text-xl">{userData?.xp} dias</span>
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
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-bold ${
                    isActive
                      ? "text-purple-500"
                      : "text-white/80 hover:text-white transition"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-md font-bold text-white/80 hover:text-white bg-transparent hover:bg-white/10 data-[state=open]:bg-white/10">
                    ASTROS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[400px] text-sm bg-card/95 backdrop-blur-md">
                      {planets.map((planet) => (
                        <Link
                          key={planet.id}
                          to={`/planet/${planet.id}`}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 transition-all group"
                        >
                          <div
                            className={`w-12 aspect-square rounded-full ${planet.color} flex items-center justify-center`}
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

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hidden sm:flex items-end gap-2 rounded-full hover:scale-110 transition-all">
                        <img src={Xp} className="w-8 h-8" alt="XP" />
                        <span className="font-bold">{userData?.xp}XP</span>
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
                      <div className="hidden sm:flex items-end gap-2 px-3 rounded-full hover:scale-110 transition-all">
                        <img
                          src={Streak}
                          className="rounded-full w-8 h-8"
                          alt="Dias consecutivos"
                        />
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
              <Avatar className="w-10 h-10 cursor-pointer hover:scale-110 hover:ring-space-purple transition-all">
                <AvatarImage src={UserProfile || ""} />
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
