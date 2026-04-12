import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchReviewSession, fetchDecks, Flashcard, Deck } from "@/lib/api";
import ReviewCard from "@/components/ReviewCard";
import Spinner from "@/components/Spinner";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const Review = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    if (deckId) {
      fetchReviewSession(deckId)
        .then(setCards)
        .catch(() => setError("Failed to load review session."))
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Review</h1>
        <p className="text-muted-foreground">Select a deck to start reviewing.</p>
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
                to={`/review/${deck.id}`}
                className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30 animate-fade-in"
              >
                <h3 className="font-semibold text-foreground">{deck.name}</h3>
                {deck.cardCount !== undefined && (
                  <p className="text-sm text-muted-foreground mt-1">{deck.cardCount} cards</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const done = currentIndex >= cards.length && cards.length > 0;

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/review">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Review Session</h1>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="rounded-xl border bg-destructive/5 p-6 text-center text-sm text-destructive">{error}</div>
      ) : cards.length === 0 ? (
        <EmptyState title="No cards to review" description="All caught up! Check back later." />
      ) : done ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <CheckCircle2 className="h-16 w-16 text-success mb-4" />
          <h2 className="text-2xl font-bold text-foreground">Session Complete!</h2>
          <p className="text-muted-foreground mt-2">You reviewed {cards.length} cards.</p>
          <Link to={`/progress/${deckId}`} className="mt-6">
            <Button>View Progress</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="text-center text-sm text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </div>
          <ReviewCard card={cards[currentIndex]} onNext={() => setCurrentIndex((i) => i + 1)} />
        </>
      )}
    </div>
  );
};

export default Review;
