import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProgress, fetchDecks, Progress as ProgressType, Deck } from "@/lib/api";
import Spinner from "@/components/Spinner";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, BookOpen, Clock, Layers } from "lucide-react";

const statConfig = [
  { key: "total", label: "Total", icon: Layers, color: "text-primary" },
  { key: "mastered", label: "Mastered", icon: CheckCircle2, color: "text-success" },
  { key: "learning", label: "Learning", icon: BookOpen, color: "text-warning" },
  { key: "due", label: "Due", icon: Clock, color: "text-destructive" },
] as const;

const ProgressPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [progress, setProgress] = useState<ProgressType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    if (deckId) {
      fetchProgress(deckId)
        .then(setProgress)
        .catch(() => setError("Failed to load progress."))
        .finally(() => setLoading(false));
    } else {
      fetchDecks()
        .then(setDecks)
        .catch(() => setError("Failed to load decks."))
        .finally(() => setLoading(false));
    }
  }, [deckId]);

  if (!deckId) {
    return (
      <div className="container py-8 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Progress</h1>
        <p className="text-muted-foreground">Select a deck to view progress.</p>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-xl border bg-destructive/5 p-6 text-center text-sm text-destructive">{error}</div>
        ) : decks.length === 0 ? (
          <EmptyState title="No decks" description="Create a deck first from the dashboard." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {decks.map((deck) => (
              <Link
                key={deck.id}
                to={`/progress/${deck.id}`}
                className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30 animate-fade-in"
              >
<h3
  className="font-semibold text-foreground truncate max-w-[200px]"
  title={deck.name}
>
  {deck.name}
</h3>              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/progress">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Progress</h1>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="rounded-xl border bg-destructive/5 p-6 text-center text-sm text-destructive">{error}</div>
      ) : !progress ? (
        <EmptyState title="No data" description="No progress data available." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statConfig.map(({ key, label, icon: Icon, color }) => (
              <div key={key} className="rounded-xl border bg-card p-5 shadow-sm animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{label}</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{progress[key]}</p>
              </div>
            ))}
          </div>

          {progress.total > 0 && (
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4 animate-fade-in">
              <h3 className="font-semibold text-foreground">Breakdown</h3>
              {[
                { label: "Mastered", value: progress.mastered, color: "bg-success" },
                { label: "Learning", value: progress.learning, color: "bg-warning" },
                { label: "Due", value: progress.due, color: "bg-destructive" },
              ].map(({ label, value, color }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-foreground">{value} / {progress.total}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${(value / progress.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProgressPage;
