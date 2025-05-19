import { useState, useEffect, useRef } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover?: string;
  duration: number;
}

const tracks: Track[] = [
  {
    id: "1",
    title: "Rainy Lofi City",
    artist: "Kaveesha Senanayake",
    url: "/audio/songs/rainy-lofi-city.mp3",
    cover: "/covers/rainy-lofi-city-cover.jpg",
    duration: 240,
  },
  {
    id: "2",
    title: "Rainy Lofi City",
    artist: "Kaveesha Senanayake",
    url: "/audio/songs/rainy-lofi-city.mp3",
    cover: "/covers/rainy-lofi-city-cover.jpg",
    duration: 240,
  },
  {
    id: "3",
    title: "Rainy Lofi City",
    artist: "Kaveesha Senanayake",
    url: "/audio/songs/rainy-lofi-city.mp3",
    cover: "/covers/rainy-lofi-city-cover.jpg",
    duration: 240,
  },
  {
    id: "4",
    title: "Rainy Lofi City",
    artist: "Kaveesha Senanayake",
    url: "/audio/songs/rainy-lofi-city.mp3",
    cover: "/covers/rainy-lofi-city-cover.jpg",
    duration: 240,
  },
  {
    id: "5",
    title: "Rainy Lofi City",
    artist: "Kaveesha Senanayake",
    url: "/audio/songs/rainy-lofi-city.mp3",
    cover: "/covers/rainy-lofi-city-cover.jpg",
    duration: 240,
  },
  {
    id: "6",
    title: "Rainy Lofi City",
    artist: "Kaveesha Senanayake",
    url: "/audio/songs/rainy-lofi-city.mp3",
    cover: "/covers/rainy-lofi-city-cover.jpg",
    duration: 240,
  },
];

export const useAudio = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume;

    const updateProgress = () => {
      if (audio && !audio.paused) {
        setProgress(audio.currentTime);
      }
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const currentTrack = tracks[currentTrackIndex];

    if (currentTrack) {
      audio.src = currentTrack.url;
      audio.load();

      if (isPlaying) {
        audio.play().catch((err) => console.error("Failed to play:", err));
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setProgress(audio.currentTime);
      }, 1000) as unknown as number;

      const handleEnded = () => {
        nextTrack();
      };

      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Failed to play:", err));
    }

    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex < tracks.length - 1 ? prevIndex + 1 : 0
    );
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : tracks.length - 1
    );
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const setTrack = (index: number) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentTrackIndex(index);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return {
    tracks,
    currentTrack: tracks[currentTrackIndex],
    isPlaying,
    progress,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    setTrack,
    formatTime,
  };
};
