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
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    loadDecks();
  }, [loadDecks]);

  const handleUploaded = (deck: Deck) => {
    setDecks((prev) => [deck, ...prev]);
  };

  // Search + Sort
  const filteredDecks = decks
    .filter((deck) =>
      deck.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime()
    );

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload PDFs and manage your flashcard decks.
        </p>
      </div>

      <UploadSection onUploaded={handleUploaded} />

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Your Decks
        </h2>

        {/* SEARCH INPUT */}
        <input
          placeholder="Search decks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 border rounded-lg px-3 py-2 text-sm"
        />

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="rounded-xl border bg-destructive/5 p-6 text-center text-sm text-destructive">
            {error}
          </div>
        ) : filteredDecks.length === 0 ? (
          <EmptyState
            title="No decks yet"
            description="Upload your first PDF to start learning smarter 🚀"
            icon={<Layers className="h-7 w-7 text-muted-foreground" />}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDecks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} onDelete={loadDecks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;