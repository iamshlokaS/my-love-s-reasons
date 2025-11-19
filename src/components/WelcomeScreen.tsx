import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import doodlePattern from "@/assets/doodle-pattern.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${doodlePattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink/80 via-background/90 to-romantic-peach/80" />

      {/* Floating animated hearts */}
      {[...Array(20)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-primary/20 animate-float-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${15 + Math.random() * 30}px`,
            height: `${15 + Math.random() * 30}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
          fill="currentColor"
        />
      ))}

      <div className="text-center space-y-8 z-10 px-4 max-w-2xl">
        <div className="space-y-6 animate-fade-in">
          <div className="relative inline-block">
            <Heart
              className="mx-auto text-primary animate-glow drop-shadow-2xl"
              size={100}
              fill="currentColor"
            />
            <Sparkles className="absolute -top-4 -right-4 text-accent animate-pulse" size={32} />
            <Sparkles className="absolute -bottom-4 -left-4 text-secondary animate-pulse" size={24} style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground drop-shadow-lg" style={{ fontFamily: 'cursive' }}>
            Happy Men's Day, My Love ❤️
          </h1>
          
          <div className="bg-card/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-primary/30">
            <p className="text-xl md:text-2xl text-foreground mb-4">
              I made something special for you...
            </p>
            <p className="text-lg text-muted-foreground">
              Play fun mini-games to unlock 20 reasons why I love you 💕
            </p>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="animate-bounce-gentle text-xl px-12 py-8 bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 shadow-2xl hover:shadow-primary/50 transition-all border-4 border-white/50 hover:scale-105"
        >
          <Heart className="mr-3" fill="currentColor" size={28} />
          Start Playing ✨
        </Button>

        <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '1s' }}>
          Each game unlocks a special message with our photo 💝
        </p>
      </div>
    </div>
  );
};
