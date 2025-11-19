import { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import reasons from "@/lib/reasons";
import { MiniGame } from "@/components/MiniGame";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

const GamePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reasonId = Number(id || 0);

  const reasonIndex = useMemo(() => reasons.findIndex((r) => r.id === reasonId), [reasonId]);
  const reason = reasons[reasonIndex];

  if (!reason) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl">Game not found.</p>
          <Link to="/" className="text-primary underline mt-4 block">Go home</Link>
        </div>
      </div>
    );
  }

  const goTo = (idx: number) => {
    const next = reasons[idx];
    if (next) navigate(`/game/${next.id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-background flex flex-col items-center gap-6">
      <div className="w-full max-w-3xl flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Game #{reasonIndex + 1}</div>
          <div className="text-2xl font-bold">{reason.emoji} {reason.text}</div>
          <div className="text-sm text-muted-foreground">Type: {reason.gameType}</div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate(-1)} variant="ghost">Back</Button>
          <Button onClick={() => navigate("/")}>Home</Button>
        </div>
      </div>

      <MiniGame gameType={reason.gameType} onComplete={() => {}} reasonNumber={reasonIndex + 1} />

      <div className="w-full max-w-3xl flex items-center justify-between">
        <div className="flex gap-2">
          <Button onClick={() => goTo(reasonIndex - 1)} disabled={reasonIndex <= 0}>Prev</Button>
          <Button onClick={() => goTo(reasonIndex + 1)} disabled={reasonIndex >= reasons.length - 1}>Next</Button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Jump to:</label>
          <select
            value={reasonId}
            onChange={(e) => navigate(`/game/${e.target.value}`)}
            className="px-3 py-2 rounded-md bg-card border"
          >
            {reasons.map((r) => (
              <option key={r.id} value={r.id}>{r.id}. {r.category} — {r.text}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
