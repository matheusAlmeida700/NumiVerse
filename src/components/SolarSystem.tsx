
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Planet, PlanetCircle, Star, Triangle, Square, Circle, Compass } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PlanetType {
  id: string;
  name: string;
  description: string;
  color: string;
  glowColor: string;
  size: number;
  icon: React.ReactNode;
  position: { x: number; y: number; };
  unlocked: boolean;
  progress: number;
  orbitSpeed: number;
}

const SolarSystem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeId, setActiveId] = useState<string | null>(null);

  const planets: PlanetType[] = [
    {
      id: "arithmetic",
      name: "Arithmetica",
      description: "Master the fundamentals of numbers, operations, and counting",
      color: "bg-amber-500",
      glowColor: "bg-amber-500/40",
      size: 60,
      icon: <Circle className="w-6 h-6" />,
      position: { x: -150, y: -150 },
      unlocked: true,
      progress: 85,
      orbitSpeed: 30,
    },
    {
      id: "algebra",
      name: "Algebros",
      description: "Explore the world of equations, variables, and problem-solving",
      color: "bg-space-blue",
      glowColor: "bg-space-blue/40",
      size: 80,
      icon: <Square className="w-6 h-6" />,
      position: { x: 150, y: -150 },
      unlocked: true,
      progress: 60,
      orbitSpeed: 50,
    },
    {
      id: "geometry",
      name: "Geometria",
      description: "Discover shapes, dimensions, and spatial relationships",
      color: "bg-green-500",
      glowColor: "bg-green-500/40",
      size: 70,
      icon: <Triangle className="w-6 h-6" />,
      position: { x: 200, y: 100 },
      unlocked: true,
      progress: 40,
      orbitSpeed: 40,
    },
    {
      id: "trigonometry",
      name: "Trigonia",
      description: "Navigate angles, triangles, and circular functions",
      color: "bg-space-purple",
      glowColor: "bg-space-purple/40",
      size: 90,
      icon: <Compass className="w-6 h-6" />,
      position: { x: -200, y: 150 },
      unlocked: true,
      progress: 15,
      orbitSpeed: 60,
    },
    {
      id: "calculus",
      name: "Calculon",
      description: "Journey through limits, derivatives, and integrals",
      color: "bg-red-500",
      glowColor: "bg-red-500/40",
      size: 100,
      icon: <Star className="w-6 h-6" />,
      position: { x: 0, y: 250 },
      unlocked: false,
      progress: 0,
      orbitSpeed: 70,
    },
    {
      id: "statistics",
      name: "Statistica",
      description: "Analyze data, probability, and statistical methods",
      color: "bg-purple-400",
      glowColor: "bg-purple-400/40",
      size: 75,
      icon: <Planet className="w-6 h-6" />,
      position: { x: -100, y: 200 },
      unlocked: false,
      progress: 0,
      orbitSpeed: 45,
    },
  ];

  const handlePlanetClick = (planet: PlanetType) => {
    if (!planet.unlocked) {
      toast({
        title: "Planet Locked",
        description: `Complete previous planets to unlock ${planet.name}!`,
        variant: "destructive",
      });
      return;
    }
    
    setActiveId(activeId === planet.id ? null : planet.id);
  };

  const handleExplore = (planetId: string) => {
    navigate(`/planet/${planetId}`);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Central star */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-300 rounded-full animate-pulse-glow z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-400 rounded-full blur-sm"></div>
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-500 opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Star className="w-12 h-12 text-yellow-100" />
          </div>
        </div>
      </div>
      
      {/* Orbit paths */}
      {planets.map((planet, index) => (
        <div 
          key={`orbit-${planet.id}`}
          className="planet-orbit"
          style={{ 
            width: `${450 + index * 150}px`, 
            height: `${450 + index * 150}px`,
            left: `calc(50% - ${(450 + index * 150) / 2}px)`,
            top: `calc(50% - ${(450 + index * 150) / 2}px)`,
          }}
        ></div>
      ))}
      
      {/* Planets */}
      {planets.map((planet, index) => (
        <div
          key={planet.id}
          className="absolute left-1/2 top-1/2"
          style={{ 
            animation: `orbit ${planet.orbitSpeed}s linear infinite${activeId ? ' paused' : ''}`,
            transform: `rotate(${index * (360 / planets.length)}deg) translateX(${225 + index * 75}px) rotate(-${index * (360 / planets.length)}deg)`,
          }}
        >
          <div 
            className={`planet group ${planet.unlocked ? 'hover:scale-110' : 'opacity-60 grayscale'}`}
            style={{ width: `${planet.size}px`, height: `${planet.size}px` }}
            onClick={() => handlePlanetClick(planet)}
          >
            <div className={`absolute inset-0 ${planet.glowColor} rounded-full blur-xl -z-10 opacity-70`}></div>
            <div className={`absolute inset-0 ${planet.color} rounded-full overflow-hidden`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVCbGVuZCBtb2RlPSJzb2Z0LWxpZ2h0IiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJub2lzZSIgcmVzdWx0PSJtaXgiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] bg-center opacity-30"></div>
              
              {/* Progress indicator */}
              {planet.progress > 0 && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                  <div 
                    className="h-full bg-white"
                    style={{ width: `${planet.progress}%` }}
                  ></div>
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center text-white">
                {planet.icon}
              </div>
            </div>
            
            {/* Name tooltip */}
            <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-card/70 backdrop-blur-md rounded text-xs text-white whitespace-nowrap transition-opacity">
              {planet.name}
            </div>
          </div>
        </div>
      ))}
      
      {/* Planet details panel */}
      {activeId && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/70 backdrop-blur-md border border-white/10 rounded-xl p-6 animate-fade-in z-20">
          {planets.filter(p => p.id === activeId).map(planet => (
            <div key={`details-${planet.id}`} className="flex flex-col items-center">
              <div className="flex items-center space-x-4">
                <div 
                  className={`w-12 h-12 ${planet.color} rounded-full flex items-center justify-center`}
                >
                  {planet.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{planet.name}</h3>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${planet.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <p className="mt-3 text-sm text-white/80 text-center">{planet.description}</p>
              
              <div className="mt-4 grid grid-cols-3 gap-4 w-full">
                <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
                  <span className="text-lg font-bold text-white">{planet.progress}%</span>
                  <span className="text-xs text-white/60">Complete</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
                  <span className="text-lg font-bold text-white">12</span>
                  <span className="text-xs text-white/60">Lessons</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
                  <span className="text-lg font-bold text-white">3</span>
                  <span className="text-xs text-white/60">Games</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleExplore(planet.id)}
                className="mt-5 w-full bg-space-purple hover:bg-space-purple/80"
              >
                Explore {planet.name}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SolarSystem;
