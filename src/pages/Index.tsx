import { useState, useEffect } from "react";
import { Heart, Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { MiniGame } from "@/components/MiniGame";
import { MessageCard } from "@/components/MessageCard";
import { GameProgress } from "@/components/GameProgress";
import { FinalSurprise } from "@/components/FinalSurprise";
import doodlePattern from "@/assets/doodle-pattern.png";
import reasons from "@/lib/reasons";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [unlockedReasons, setUnlockedReasons] = useState<number[]>([]);
  const [showSurprise, setShowSurprise] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const currentReason = reasons[currentReasonIndex];
  const allUnlocked = unlockedReasons.length === reasons.length;

  const handleStart = () => {
    setStarted(true);
    setShowGame(true);
  };

  const handleGameComplete = () => {
    setShowGame(false);
    setShowMessage(true);
    setUnlockedReasons([...unlockedReasons, currentReason.id]);
  };

  const handleNextReason = () => {
    setShowMessage(false);
    if (currentReasonIndex < reasons.length - 1) {
      setCurrentReasonIndex(currentReasonIndex + 1);
      setShowGame(true);
    } else {
      setShowSurprise(true);
    }
  };

  if (!started) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (showSurprise) {
    return <FinalSurprise totalUnlocked={unlockedReasons.length} />;
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${doodlePattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div className="relative z-10">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-card/90 backdrop-blur-sm hover:bg-card shadow-lg border-2 border-primary/20"
          onClick={() => setMusicPlaying(!musicPlaying)}
        >
          {musicPlaying ? (
            <Volume2 className="h-5 w-5 text-primary" />
          ) : (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
          )}
        </Button>

        <GameProgress
          current={currentReasonIndex + 1}
          total={reasons.length}
          unlocked={unlockedReasons.length}
        />

        {showGame && (
          <MiniGame
            gameType={currentReason.gameType}
            onComplete={handleGameComplete}
            reasonNumber={currentReasonIndex + 1}
          />
        )}

        {showMessage && (
          <MessageCard
            reason={currentReason}
            onNext={handleNextReason}
            isLast={currentReasonIndex === reasons.length - 1}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
