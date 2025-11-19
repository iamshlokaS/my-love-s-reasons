import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export const FinalSurprise = () => {
  const [typedText, setTypedText] = useState("");
  const [showHeart, setShowHeart] = useState(false);
  
  const fullText = "Thank you for being the man you are. You make my world better. I'm lucky to love you. Happy Men's Day, my love.";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowHeart(true), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-8 overflow-hidden">
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent animate-pulse" />
      
      <div className="max-w-3xl mx-auto text-center space-y-8 z-10">
        <div className="min-h-[200px] flex items-center justify-center">
          <p className="text-2xl md:text-3xl text-white leading-relaxed font-light">
            {typedText}
            <span className="inline-block w-1 h-8 bg-primary ml-1 animate-pulse" />
          </p>
        </div>

        {showHeart && (
          <div className="animate-zoom-in">
            <Heart
              className="mx-auto text-primary animate-glow mb-6"
              size={120}
              fill="currentColor"
            />
          </div>
        )}

        {showHeart && (
          <p className="text-lg text-white/80 animate-fade-in">
            Come back anytime you forget how loved you are 💓
          </p>
        )}
      </div>
    </div>
  );
};
