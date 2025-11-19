import { Heart } from "lucide-react";

interface HeartCounterProps {
  unlocked: number;
  total: number;
}

export const HeartCounter = ({ unlocked, total }: HeartCounterProps) => {
  return (
    <div className="fixed top-4 left-4 z-50 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-border">
      <div className="flex items-center gap-2">
        <Heart className="text-primary animate-pulse" size={20} fill="currentColor" />
        <span className="font-semibold text-foreground">
          {unlocked}/{total} reasons 💖
        </span>
      </div>
    </div>
  );
};
