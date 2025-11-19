import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import couplePhoto from "@/assets/couple-photo.png";

interface MessageCardProps {
  reason: {
    id: number;
    category: string;
    emoji: string;
    text: string;
  };
  onNext: () => void;
  isLast: boolean;
}

export const MessageCard = ({ reason, onNext, isLast }: MessageCardProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-2xl w-full bg-card shadow-2xl border-4 border-primary/30 animate-zoom-in overflow-hidden">
        {/* Photo Section */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={couplePhoto}
            alt="Us together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {/* Floating hearts on photo */}
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-primary/40 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                width: `${20 + Math.random() * 15}px`,
                height: `${20 + Math.random() * 15}px`,
                animationDelay: `${i * 0.3}s`,
              }}
              fill="currentColor"
            />
          ))}
        </div>

        {/* Message Section */}
        <div className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-2xl">{reason.emoji}</span>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                {reason.category}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in" style={{ fontFamily: 'cursive' }}>
              {reason.text}
            </h2>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles size={16} className="animate-pulse" />
              <p className="text-sm">Reason #{reason.id} of 20</p>
              <Sparkles size={16} className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          <Button
            onClick={onNext}
            size="lg"
            className="w-full text-lg py-6 bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all group"
          >
            {isLast ? (
              <>
                <Heart className="mr-2" fill="currentColor" />
                See Final Surprise 💝
              </>
            ) : (
              <>
                Next Game
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};
