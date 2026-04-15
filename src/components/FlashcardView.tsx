import { useState } from "react";
import { Flashcard } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

const FlashcardView = ({ card }: { card: Flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  const difficultyColor = {
    EASY: "bg-success/15 text-success border-success/20",
    MEDIUM: "bg-warning/15 text-warning border-warning/20",
    HARD: "bg-destructive/15 text-destructive border-destructive/20",
  }[card.difficulty?.toUpperCase()] || "bg-muted text-muted-foreground";

  const reviewColor = {
    AGAIN: "bg-destructive/15 text-destructive border-destructive/20",
    GOOD: "bg-primary/15 text-primary border-primary/20",
    EASY: "bg-success/15 text-success border-success/20",
  }[card.lastReview?.toUpperCase()] || "bg-muted text-muted-foreground";

  return (
    <button
      onClick={() => setFlipped(!flipped)}
      className="w-full rounded-xl border bg-card p-6 text-left shadow-sm hover:shadow-md transition"
    >
      <div className="flex justify-between mb-3">

        <span className="text-xs text-muted-foreground">
          {flipped ? "Answer" : "Question"}
        </span>

        <div className="flex gap-2">

          {/* Difficulty */}
          <Badge className={difficultyColor}>
            {card.difficulty}
          </Badge>

          {/* Last Review */}
          <Badge className={reviewColor}>
            {card.lastReview || "NEW"}
          </Badge>

        </div>
      </div>

      <p>
        {flipped ? card.answer : card.question}
      </p>
    </button>
  );
};

export default FlashcardView;