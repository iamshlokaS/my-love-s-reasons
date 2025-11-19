import { useState, useEffect } from "react";
import { Heart, Sparkles, Trophy } from "lucide-react";
import couplePhoto from "@/assets/couple-photo.png";

interface FinalSurpriseProps {
  totalUnlocked: number;
}

export const FinalSurprise = ({ totalUnlocked }: FinalSurpriseProps) => {
  const [typedText, setTypedText] = useState("");
  const [showContent, setShowContent] = useState(false);
  
  const fullText = "Thank you for being the man you are. You make my world better. I'm lucky to love you. Happy Men's Day, my love.";

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-black via-primary/20 to-black">
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent animate-pulse" />
      
      {/* Floating hearts everywhere */}
      {[...Array(30)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-primary/20 animate-float-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${15 + Math.random() * 40}px`,
            height: `${15 + Math.random() * 40}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
          fill="currentColor"
        />
      ))}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-8 text-center">
          {showContent && (
            <>
              {/* Trophy celebration */}
              <div className="animate-zoom-in">
                <Trophy className="mx-auto text-accent mb-4 animate-bounce-gentle" size={80} />
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'cursive' }}>
                  You Did It! 🎉
                </h1>
                <p className="text-xl text-white/80">
                  All {totalUnlocked} reasons unlocked!
                </p>
              </div>

              {/* Photo with glow */}
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/30 blur-3xl animate-glow" />
                  <img
                    src={couplePhoto}
                    alt="Us"
                    className="relative w-full max-w-md mx-auto rounded-3xl border-4 border-primary/50 shadow-2xl"
                  />
                  
                  {/* Sparkles around photo */}
                  <Sparkles className="absolute -top-6 -left-6 text-accent animate-pulse" size={40} />
                  <Sparkles className="absolute -top-6 -right-6 text-secondary animate-pulse" size={32} style={{ animationDelay: '0.3s' }} />
                  <Sparkles className="absolute -bottom-6 -left-6 text-primary animate-pulse" size={36} style={{ animationDelay: '0.6s' }} />
                  <Sparkles className="absolute -bottom-6 -right-6 text-accent animate-pulse" size={28} style={{ animationDelay: '0.9s' }} />
                </div>
              </div>

              {/* Typed message */}
              <div 
                className="bg-card/90 backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto border-4 border-primary/30 shadow-2xl animate-fade-in"
                style={{ animationDelay: '1s' }}
              >
                <p className="text-2xl md:text-3xl text-foreground leading-relaxed" style={{ fontFamily: 'cursive' }}>
                  {typedText}
                  <span className="inline-block w-1 h-8 bg-primary ml-1 animate-pulse" />
                </p>
              </div>

              {/* Final heart */}
              <div className="animate-zoom-in" style={{ animationDelay: '1.5s' }}>
                <Heart
                  className="mx-auto text-primary animate-glow"
                  size={100}
                  fill="currentColor"
                />
              </div>

              {/* Closing message */}
              <p 
                className="text-lg text-white/80 animate-fade-in" 
                style={{ animationDelay: '2s', fontFamily: 'cursive' }}
              >
                Come back anytime you forget how loved you are 💓
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
