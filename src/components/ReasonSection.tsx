import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ReasonSectionProps {
  title: string;
  reasons: string[];
  animation: string;
  onReasonClick: (e: React.MouseEvent) => void;
}

export const ReasonSection = ({
  title,
  reasons,
  animation,
  onReasonClick,
}: ReasonSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center animate-fade-in">
        {title}
      </h2>
      <div className="grid gap-4">
        {reasons.map((reason, index) => (
          <Card
            key={index}
            className={cn(
              "p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 hover:bg-romantic-glow/10 border-2 border-border relative overflow-hidden group",
              `animate-${animation}`
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={onReasonClick}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-lg text-foreground relative z-10">{reason}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
