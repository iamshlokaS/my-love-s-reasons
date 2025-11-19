import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-romantic-pink via-background to-romantic-peach overflow-hidden">
      {/* Floating hearts in background */}
      {[...Array(15)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-primary/20 animate-float-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
          fill="currentColor"
        />
      ))}

      <div className="text-center space-y-8 z-10 px-4">
        <div className="space-y-4 animate-fade-in">
          <Heart
            className="mx-auto text-primary animate-glow mb-6"
            size={80}
            fill="currentColor"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Happy Men's Day, My Love ❤️
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-md mx-auto">
            I made something special for you
          </p>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="animate-bounce-gentle text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transition-all"
        >
          <Heart className="mr-2" fill="currentColor" />
          Tap to Begin
        </Button>
      </div>
    </div>
  );
};
