import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDeck, Flashcard } from "@/lib/api";
import FlashcardView from "@/components/FlashcardView";
import Spinner from "@/components/Spinner";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

const DeckDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchDeck(id)
      .then(setCards)
      .catch(() => setError("Failed to load flashcards."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Deck Details</h1>
        </div>
        <Link to={`/review/${id}`}>
          <Button className="gap-2">
            <BookOpen className="h-4 w-4" /> Start Review
          </Button>
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="rounded-xl border bg-destructive/5 p-6 text-center text-sm text-destructive">{error}</div>
      ) : cards.length === 0 ? (
        <EmptyState title="No cards" description="This deck has no flashcards." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <FlashcardView key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckDetails;
