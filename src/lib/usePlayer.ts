import { useRef, useState } from "react";

type Song = {
  title: string;
  artist: string;
  coverUrl: string;
  musicUrl: string;
};

const songs: Song[] = [
  {
    title: "シャイニングスター",
    artist: "詩歩",
    coverUrl: "public/shining_star.jpg",
    musicUrl: "shining_star.mp3",
  },
  {
    title: "Burning Heart",
    artist: "KEI",
    coverUrl: "public/burning_heart.jpg",
    musicUrl: "burning_heart.mp3",
  },
  {
    title: "12345",
    artist: "Mary",
    coverUrl: "public/12345.jpg",
    musicUrl: "12345.mp3",
  },
  {
    title: "ハルジオン",
    artist: "KEI",
    coverUrl: "public/halzion.jpg",
    musicUrl: "halzion.mp3",
  },
  {
    title: "Bipolar Disorder Outside ver.",
    artist: "森田交一",
    coverUrl: "public/outside.jpg",
    musicUrl: "outside.mp3",
  },
];

export const usePayler = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = songs[currentSongIndex];

  const onPrevious = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(false);
  };

  const onNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false);
  };

  const onTogglePause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onChangeVolume = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  return {
    onPrevious,
    onNext,
    onTogglePause,
    onChangeVolume,
    currentSong,
    isPlaying,
    volume,
    audioRef
  }
}