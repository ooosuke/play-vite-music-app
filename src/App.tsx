import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "./components/ui/slider";
import { usePayler } from "./lib/usePlayer";

function App() {
  const {
    onChangeVolume,
    onNext,
    onPrevious,
    onTogglePause,
    currentSong,
    volume,
    isPlaying,
    audioRef,
  } = usePayler();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">
        <CardContent className="p-6">
          <div className="relative aspect-square mb-6 overflow-hidden rounded-lg shadow-2xl">
            <img
              src={currentSong.coverUrl}
              alt="Cover"
              className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              {currentSong.title}
            </h2>
            <p className="text-gray-400">{currentSong.artist}</p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <SkipBack className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onTogglePause}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-6 flex items-center">
            <Volume2 className="h-4 w-4 text-gray-400 mr-2" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={onChangeVolume}
            />
          </div>
          <audio ref={audioRef} src={currentSong.musicUrl} onEnded={onNext} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
