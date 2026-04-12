import { useState } from "react";
import { Flashcard } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

const FlashcardView = ({ card }: { card: Flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  // 🎨 Difficulty color
  const difficultyColor = {
    EASY: "bg-success/15 text-success border-success/20",
    MEDIUM: "bg-warning/15 text-warning border-warning/20",
    HARD: "bg-destructive/15 text-destructive border-destructive/20",
  }[card.difficulty?.toUpperCase()] || "bg-muted text-muted-foreground";

  // 🎨 Last Review color
  const reviewColor = {
    AGAIN: "bg-destructive/15 text-destructive border-destructive/20",
    GOOD: "bg-warning/15 text-warning border-warning/20",
    EASY: "bg-success/15 text-success border-success/20",
  }[card.lastReview?.toUpperCase()] || "bg-muted text-muted-foreground";

  return (
    <button
      onClick={() => setFlipped(!flipped)}
      className="w-full rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md animate-fade-in"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {flipped ? "Answer" : "Question"}
        </span>

        {/* ✅ BOTH BADGES */}
        <div className="flex gap-2">
          {/* Difficulty */}
          <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${difficultyColor}`}>
            {card.difficulty}
          </Badge>

          {/* Last Review */}
          <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${reviewColor}`}>
            {card.lastReview || "NEW"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <p className="text-foreground leading-relaxed">
        {flipped ? card.answer : card.question}
      </p>

      {/* Footer */}
      <p className="mt-4 text-xs text-muted-foreground">
        Click to {flipped ? "see question" : "reveal answer"}
      </p>
    </button>
  );
};

export default FlashcardView;