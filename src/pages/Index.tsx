import { useState, useEffect } from "react";
import { Heart, Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { MiniGame } from "@/components/MiniGame";
import { MessageCard } from "@/components/MessageCard";
import { GameProgress } from "@/components/GameProgress";
import { FinalSurprise } from "@/components/FinalSurprise";
import doodlePattern from "@/assets/doodle-pattern.png";

interface Reason {
  id: number;
  category: string;
  emoji: string;
  text: string;
  gameType: "hearts" | "memory" | "click" | "match";
}

const reasons: Reason[] = [
  { id: 1, category: "Heart", emoji: "❤️", text: "I feel safe with you", gameType: "hearts" },
  { id: 2, category: "Heart", emoji: "❤️", text: "You understand me without explanations", gameType: "memory" },
  { id: 3, category: "Heart", emoji: "❤️", text: "You care even when you're tired", gameType: "click" },
  { id: 4, category: "Heart", emoji: "❤️", text: "Your love feels like home", gameType: "match" },
  { id: 5, category: "Heart", emoji: "❤️", text: "You listen to my heart, not just my words", gameType: "hearts" },
  
  { id: 6, category: "Treatment", emoji: "💗", text: "You make me laugh at the right moment", gameType: "memory" },
  { id: 7, category: "Treatment", emoji: "💗", text: "You hold my hand like you mean it", gameType: "click" },
  { id: 8, category: "Treatment", emoji: "💗", text: "You never make me feel alone", gameType: "match" },
  { id: 9, category: "Treatment", emoji: "💗", text: "You remember the little things", gameType: "hearts" },
  { id: 10, category: "Treatment", emoji: "💗", text: "You make every day special", gameType: "memory" },
  
  { id: 11, category: "Silly", emoji: "😂", text: "Your goofy laugh makes my day", gameType: "click" },
  { id: 12, category: "Silly", emoji: "😂", text: "Your dramatic storytelling", gameType: "match" },
  { id: 13, category: "Silly", emoji: "😂", text: "Your chaotic humour at 1 AM", gameType: "hearts" },
  { id: 14, category: "Silly", emoji: "😂", text: "The way you dance when nobody's watching", gameType: "memory" },
  { id: 15, category: "Silly", emoji: "😂", text: "Your terrible dad jokes I secretly love", gameType: "click" },
  
  { id: 16, category: "Man", emoji: "💙", text: "You inspire me", gameType: "match" },
  { id: 17, category: "Man", emoji: "💙", text: "You're hardworking", gameType: "hearts" },
  { id: 18, category: "Man", emoji: "💙", text: "You protect and support me", gameType: "memory" },
  { id: 19, category: "Man", emoji: "💙", text: "Your strength when facing challenges", gameType: "click" },
  { id: 20, category: "Man", emoji: "💙", text: "You never give up on your dreams", gameType: "match" },
];

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
