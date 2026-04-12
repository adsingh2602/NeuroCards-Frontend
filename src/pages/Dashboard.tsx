import { useState, useEffect, useCallback } from "react";
import { fetchDecks, Deck } from "@/lib/api";
import UploadSection from "@/components/UploadSection";
import DeckCard from "@/components/DeckCard";
import EmptyState from "@/components/EmptyState";
import Spinner from "@/components/Spinner";
import { Layers } from "lucide-react";

const Dashboard = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDecks = useCallback(async () => {
    try {
      const data = await fetchDecks();
      setDecks(data);
      setError("");
    } catch {
      setError("Could not load decks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDecks(); }, [loadDecks]);

  const handleUploaded = (deck: Deck) => {
    setDecks((prev) => [deck, ...prev]);
  };

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Upload PDFs and manage your flashcard decks.</p>
      </div>

      <UploadSection onUploaded={handleUploaded} />

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Decks</h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-xl border bg-destructive/5 p-6 text-center text-sm text-destructive">{error}</div>
        ) : decks.length === 0 ? (
          <EmptyState
            title="No decks yet"
            description="Upload a PDF to create your first flashcard deck."
            icon={<Layers className="h-7 w-7 text-muted-foreground" />}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
