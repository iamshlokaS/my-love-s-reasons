import { useState, useEffect } from "react";
import { Heart, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ReasonSection } from "@/components/ReasonSection";
import { HeartCounter } from "@/components/HeartCounter";
import { FinalSurprise } from "@/components/FinalSurprise";
import { FloatingHearts } from "@/components/FloatingHearts";

const heartReasons = [
  "I feel safe with you",
  "You understand me without explanations",
  "You care even when you're tired",
  "Your love feels like home",
  "You listen to my heart, not just my words",
];

const treatmentReasons = [
  "You make me laugh at the right moment",
  "You hold my hand like you mean it",
  "You never make me feel alone",
  "You remember the little things that matter to me",
  "You make every day feel special",
];

const sillyReasons = [
  "Your goofy laugh makes my day",
  "Your dramatic storytelling",
  "Your chaotic humour at 1 AM",
  "The way you dance when nobody's watching",
  "Your terrible dad jokes that I secretly love",
];

const manReasons = [
  "You inspire me",
  "You're hardworking",
  "You protect and support me",
  "Your strength when facing challenges",
  "The way you never give up on your dreams",
];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [unlockedReasons, setUnlockedReasons] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const totalReasons = heartReasons.length + treatmentReasons.length + sillyReasons.length + manReasons.length;

  useEffect(() => {
    if (started) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [started]);

  const handleReasonClick = (e: React.MouseEvent) => {
    setUnlockedReasons((prev) => Math.min(prev + 1, totalReasons));
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newHeart = { id: Date.now(), x, y };
    setFloatingHearts((prev) => [...prev, newHeart]);
    
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  const getRandomReason = () => {
    const allReasons = [...heartReasons, ...treatmentReasons, ...sillyReasons, ...manReasons];
    const randomReason = allReasons[Math.floor(Math.random() * allReasons.length)];
    alert(`💖 Random Reason: ${randomReason}`);
  };

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />;
  }

  if (showSurprise) {
    return <FinalSurprise />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-pink via-background to-romantic-peach relative overflow-x-hidden">
      <FloatingHearts />
      
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-card/80 backdrop-blur-sm hover:bg-card"
        onClick={() => setMusicPlaying(!musicPlaying)}
      >
        {musicPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>

      <HeartCounter unlocked={unlockedReasons} total={totalReasons} />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Reasons I Love You
          </h1>
          <p className="text-lg text-muted-foreground">
            Every reason is a piece of my heart 💕
          </p>
        </div>

        <div className="space-y-16">
          <ReasonSection
            title="Reasons I Love Your Heart ❤️"
            reasons={heartReasons}
            animation="slide-in-left"
            onReasonClick={handleReasonClick}
          />

          <ReasonSection
            title="Reasons I Love How You Treat Me 💗"
            reasons={treatmentReasons}
            animation="zoom-in"
            onReasonClick={handleReasonClick}
          />

          <ReasonSection
            title="Reasons I Love Your Silly Side 😂"
            reasons={sillyReasons}
            animation="pop-in"
            onReasonClick={handleReasonClick}
          />

          <ReasonSection
            title="Reasons I Love The Man You Are 💙"
            reasons={manReasons}
            animation="slide-in-right"
            onReasonClick={handleReasonClick}
          />
        </div>

        <div className="text-center mt-16 space-y-6">
          <Button
            onClick={getRandomReason}
            variant="outline"
            size="lg"
            className="animate-bounce-gentle hover:scale-105 transition-transform"
          >
            <Heart className="mr-2 h-5 w-5" />
            Shake for a Random Reason
          </Button>

          <Button
            onClick={() => setShowSurprise(true)}
            size="lg"
            className="animate-glow text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            Tap For Your Final Surprise 💝
          </Button>
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground animate-fade-in">
          Come back anytime you forget how loved you are 💓
        </div>
      </div>
    </div>
  );
};

export default Index;
