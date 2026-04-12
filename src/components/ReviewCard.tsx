import { useState } from "react";
import { Flashcard, submitReview } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X, ThumbsUp, Rocket } from "lucide-react";

interface ReviewCardProps {
  card: Flashcard;
  onNext: () => void;
}

const ReviewCard = ({ card, onNext }: ReviewCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRating = async (rating: "again" | "good" | "easy") => {
    setSubmitting(true);
    try {
      await submitReview(card.id, rating);
      setFlipped(false);
      onNext();
    } catch {
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg animate-fade-in">
      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full rounded-xl border bg-card p-8 text-left shadow-sm transition-all hover:shadow-md min-h-[200px] flex flex-col justify-center"
      >
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
          {flipped ? "Answer" : "Question"}
        </span>
        <p className="text-lg text-foreground leading-relaxed">
          {flipped ? card.answer : card.question}
        </p>
        {!flipped && (
          <p className="mt-6 text-xs text-muted-foreground">Tap to reveal answer</p>
        )}
      </button>

      {flipped && (
        <div className="mt-6 flex justify-center gap-3 animate-fade-in">
          <Button
            variant="outline"
            onClick={() => handleRating("again")}
            disabled={submitting}
            className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4" /> Again
          </Button>
          <Button
            variant="outline"
            onClick={() => handleRating("good")}
            disabled={submitting}
            className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <ThumbsUp className="h-4 w-4" /> Good
          </Button>
          <Button
            variant="outline"
            onClick={() => handleRating("easy")}
            disabled={submitting}
            className="gap-2 border-success/30 text-success hover:bg-success/10"
          >
            <Rocket className="h-4 w-4" /> Easy
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
