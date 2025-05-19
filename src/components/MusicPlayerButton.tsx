import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAudio } from "@/hooks/useAudio";

const MusicPlayerButton = () => {
  const [expanded, setExpanded] = useState(false);
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    togglePlay,
    prevTrack,
    nextTrack,
    setVolume,
    seek,
    formatTime,
  } = useAudio();

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <div className="relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full bg-card/80 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 ${
                  expanded ? "rotate-90" : ""
                }`}
                onClick={() => setExpanded(!expanded)}
              >
                <Music
                  className={`h-5 w-5 ${
                    isPlaying ? "text-space-purple" : "text-white"
                  }`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{expanded ? "Fechar player" : "Abrir player"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div
          className={`absolute bottom-full right-0 mb-4 w-72 bg-card/90 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden transition-all duration-300 origin-bottom-right ${
            expanded
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0 pointer-events-none"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 bg-white/5 rounded-md overflow-hidden flex-shrink-0 shadow-inner animate-pulse">
                {currentTrack?.cover && (
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">
                  {currentTrack?.title || "Sem música"}
                </p>
                <p className="text-xs text-white/60 truncate">
                  {currentTrack?.artist || "Desconhecido"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-white/60">
                {formatTime(progress)}
              </span>
              <Slider
                value={[progress]}
                max={currentTrack?.duration || 100}
                step={1}
                className="flex-1"
                onValueChange={(value) => seek(value[0])}
              />
              <span className="text-xs text-white/60">
                {formatTime(currentTrack?.duration || 0)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTrack}
                disabled={!currentTrack}
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  isPlaying
                    ? "bg-space-purple hover:bg-space-purple/80"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                onClick={togglePlay}
                disabled={!currentTrack}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextTrack}
                disabled={!currentTrack}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-white/60">Vol</span>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={(value) => setVolume(value[0] / 100)}
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto border-t border-white/10"></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerButton;
