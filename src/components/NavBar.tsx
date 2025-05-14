
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Rocket } from 'lucide-react';

const NavBar = () => {
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(5);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-md border-b border-white/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-space-purple animate-pulse-glow"></div>
            <Star className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-white text-glow">NumiVerse</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/planets" className="text-white/80 hover:text-white transition">Planets</Link>
            <Link to="/missions" className="text-white/80 hover:text-white transition">Missions</Link>
            <Link to="/achievements" className="text-white/80 hover:text-white transition">Achievements</Link>
            <Link to="/community" className="text-white/80 hover:text-white transition">Community</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-card/50 py-1 px-3 rounded-full">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-yellow-100 text-sm font-medium">1,238</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 bg-space-blue/20 py-1 px-3 rounded-full">
              <Rocket className="w-4 h-4 text-space-blue" />
              <span className="text-space-blue text-sm font-medium">Streak: 7</span>
            </div>
            
            <div className="flex items-center gap-2 px-2 py-1 border border-white/20 rounded-lg">
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-space-purple to-space-blue"></div>
              <div className="flex flex-col">
                <div className="h-1.5 w-12 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-space-purple to-space-blue rounded-full" 
                    style={{ width: `${(xp % 1000) / 10}%` }}
                  ></div>
                </div>
                <span className="text-white/80 text-[10px]">Level {level}</span>
              </div>
            </div>
            
            <Avatar className="w-8 h-8 border border-space-purple">
              <AvatarImage src="" />
              <AvatarFallback className="bg-space-blue text-white text-xs">AV</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
