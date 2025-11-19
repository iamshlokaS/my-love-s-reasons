import { useState, useEffect } from "react";
import { Heart, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MiniGameProps {
  gameType: "hearts" | "memory" | "click" | "match";
  onComplete: () => void;
  reasonNumber: number;
}

export const MiniGame = ({ gameType, onComplete, reasonNumber }: MiniGameProps) => {
  const [gameState, setGameState] = useState<any>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    initializeGame();
  }, [gameType]);

  const initializeGame = () => {
    switch (gameType) {
      case "hearts":
        setGameState({ collected: 0, target: 5 });
        break;
      case "memory":
        setGameState({ 
          cards: shuffleArray([...Array(4)].flatMap((_, i) => [i, i])),
          flipped: [],
          matched: []
        });
        break;
      case "click":
        setGameState({ clicks: 0, target: 10 });
        break;
      case "match":
        setGameState({ selected: null, pairs: generatePairs() });
        break;
    }
  };

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const generatePairs = () => {
    const icons = ["❤️", "💕", "💖", "💗", "💝"];
    return shuffleArray([...icons, ...icons]);
  };

  // Hearts Game
  const handleHeartClick = (index: number) => {
    if (gameType !== "hearts") return;
    
    const newCollected = gameState.collected + 1;
    setGameState({ ...gameState, collected: newCollected });
    setProgress((newCollected / gameState.target) * 100);
    
    if (newCollected >= gameState.target) {
      setTimeout(onComplete, 500);
    }
  };

  // Click Game
  const handleClickGame = () => {
    if (gameType !== "click") return;
    
    const newClicks = gameState.clicks + 1;
    setGameState({ ...gameState, clicks: newClicks });
    setProgress((newClicks / gameState.target) * 100);
    
    if (newClicks >= gameState.target) {
      setTimeout(onComplete, 500);
    }
  };

  // Memory Game
  const handleCardFlip = (index: number) => {
    if (gameType !== "memory") return;
    if (gameState.flipped.length >= 2 || gameState.flipped.includes(index)) return;
    
    const newFlipped = [...gameState.flipped, index];
    setGameState({ ...gameState, flipped: newFlipped });
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (gameState.cards[first] === gameState.cards[second]) {
        const newMatched = [...gameState.matched, first, second];
        setTimeout(() => {
          setGameState({ ...gameState, matched: newMatched, flipped: [] });
          setProgress((newMatched.length / gameState.cards.length) * 100);
          
          if (newMatched.length === gameState.cards.length) {
            setTimeout(onComplete, 500);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setGameState({ ...gameState, flipped: [] });
        }, 1000);
      }
    }
  };

  // Match Game
  const handleMatchClick = (index: number) => {
    if (gameType !== "match") return;
    
    if (gameState.selected === null) {
      setGameState({ ...gameState, selected: index });
    } else {
      if (gameState.pairs[gameState.selected] === gameState.pairs[index] && gameState.selected !== index) {
        setTimeout(onComplete, 500);
      } else {
        setGameState({ ...gameState, selected: null });
      }
    }
  };

  const renderGame = () => {
    switch (gameType) {
      case "hearts":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Catch the Floating Hearts!</h3>
              <p className="text-muted-foreground">Click {gameState.target} hearts to unlock</p>
              <p className="text-xl font-semibold text-primary">{gameState.collected} / {gameState.target}</p>
            </div>
            <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
              {[...Array(10)].map((_, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="h-20 w-20 hover:scale-125 transition-transform"
                  onClick={() => handleHeartClick(i)}
                  disabled={gameState.collected >= gameState.target}
                >
                  <Heart 
                    className="text-primary animate-float" 
                    size={40} 
                    fill="currentColor"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                </Button>
              ))}
            </div>
          </div>
        );

      case "click":
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Click the Glowing Heart!</h3>
              <p className="text-muted-foreground">Click {gameState.target} times</p>
              <p className="text-xl font-semibold text-primary">{gameState.clicks} / {gameState.target}</p>
            </div>
            <Button
              onClick={handleClickGame}
              size="lg"
              className="h-40 w-40 rounded-full animate-glow hover:scale-110 transition-transform bg-gradient-to-br from-primary to-secondary"
              disabled={gameState.clicks >= gameState.target}
            >
              <Heart size={80} fill="currentColor" />
            </Button>
          </div>
        );

      case "memory":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Memory Match!</h3>
              <p className="text-muted-foreground">Find all matching pairs</p>
            </div>
            <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
              {gameState.cards?.map((card: number, i: number) => (
                <Card
                  key={i}
                  className={`h-24 flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                    gameState.flipped.includes(i) || gameState.matched.includes(i)
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-muted"
                  }`}
                  onClick={() => handleCardFlip(i)}
                >
                  {(gameState.flipped.includes(i) || gameState.matched.includes(i)) ? (
                    <Heart size={40} fill="currentColor" />
                  ) : (
                    <span className="text-4xl">?</span>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );

      case "match":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Find the Matching Hearts!</h3>
              <p className="text-muted-foreground">Click two matching hearts</p>
            </div>
            <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
              {gameState.pairs?.map((emoji: string, i: number) => (
                <Card
                  key={i}
                  className={`h-24 flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                    gameState.selected === i ? "bg-primary border-4 border-accent" : "bg-card hover:bg-muted"
                  }`}
                  onClick={() => handleMatchClick(i)}
                >
                  <span className="text-5xl">{emoji}</span>
                </Card>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="p-8 max-w-3xl w-full bg-card/95 backdrop-blur-md shadow-2xl border-4 border-primary/20">
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="text-primary" size={20} />
              <span className="text-sm font-semibold text-primary">Reason #{reasonNumber}</span>
            </div>
          </div>
          
          {renderGame()}

          {progress > 0 && (
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
