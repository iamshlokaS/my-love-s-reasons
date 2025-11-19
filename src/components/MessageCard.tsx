import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import couplePhoto from "@/assets/couple-photo.png";
import reasons from "@/lib/reasons";
// Explicit imports for common 01..10 filenames (user provided). These act as
// a reliable fallback if the glob approach doesn't return assets at runtime.
import img01 from "@/assets/01.png";
import img02 from "@/assets/02.png";
import img03 from "@/assets/03.png";
import img04 from "@/assets/04.png";
import img05 from "@/assets/05.png";
import img06 from "@/assets/06.png";
import img07 from "@/assets/07.png";
import img08 from "@/assets/08.png";
import img09 from "@/assets/09.png";
import img10 from "@/assets/10.png";

// Safely load image assets from /src/assets using Vite's glob when available.
// Some environments (or test runners) may not expose `import.meta.globEager` —
// guard access so the module doesn't throw during evaluation and take down the
// whole app.
let assetList: { path: string; src: string }[] = [];
try {
  const globFn = (import.meta as any).globEager;
  if (typeof globFn === "function") {
    const assetModules = globFn('/src/assets/*.{png,jpg,jpeg,webp}') as Record<string, any>;
    assetList = Object.entries(assetModules)
      .map(([path, mod]) => ({ path, src: mod.default }))
      .filter((a) => !a.path.includes('couple-photo'))
      .sort((a, b) => a.path.localeCompare(b.path))
      .slice(0, reasons.length);
  }
} catch (e) {
  // If glob loading fails, leave assetList empty so we fall back to the bundled image.
  assetList = [];
}

// If glob didn't find assets, fall back to explicit imports in numeric order.
if (assetList.length === 0) {
  assetList = [
    { path: '/src/assets/01.png', src: img01 },
    { path: '/src/assets/02.png', src: img02 },
    { path: '/src/assets/03.png', src: img03 },
    { path: '/src/assets/04.png', src: img04 },
    { path: '/src/assets/05.png', src: img05 },
    { path: '/src/assets/06.png', src: img06 },
    { path: '/src/assets/07.png', src: img07 },
    { path: '/src/assets/08.png', src: img08 },
    { path: '/src/assets/09.png', src: img09 },
    { path: '/src/assets/10.png', src: img10 },
  ].slice(0, reasons.length);
}

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
            src={assetList[reason.id - 1]?.src || couplePhoto}
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
              <p className="text-sm">Reason #{reason.id} of {reasons.length}</p>
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
