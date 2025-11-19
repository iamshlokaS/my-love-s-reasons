import { Heart, Trophy } from "lucide-react";

interface GameProgressProps {
  current: number;
  total: number;
  unlocked: number;
}

export const GameProgress = ({ current, total, unlocked }: GameProgressProps) => {
  return (
    <div className="fixed top-4 left-4 z-50 space-y-2">
      <div className="bg-card/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border-2 border-primary/20">
        <div className="flex items-center gap-3">
          <Trophy className="text-accent animate-pulse" size={24} />
          <div className="text-sm">
            <div className="font-semibold text-foreground">Game {current} of {total}</div>
            <div className="text-muted-foreground text-xs">
              {unlocked} reasons unlocked 💖
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border-2 border-primary/20">
        <div className="flex gap-1">
          {[...Array(total)].map((_, i) => (
            <Heart
              key={i}
              size={12}
              className={`transition-all ${
                i < unlocked
                  ? "text-primary"
                  : "text-muted-foreground/30"
              }`}
              fill={i < unlocked ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
