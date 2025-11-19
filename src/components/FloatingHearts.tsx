import { Heart } from "lucide-react";

export const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-primary/30 animate-float"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: `${15 + Math.random() * 20}px`,
            height: `${15 + Math.random() * 20}px`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
};
