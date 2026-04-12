import { useNavigate } from "react-router-dom";
import { Layers, ChevronRight } from "lucide-react";
import { Deck } from "@/lib/api";

const DeckCard = ({ deck }: { deck: Deck }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/deck/${deck.id}`)}
      className="group flex w-full items-center gap-4 rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/30 animate-fade-in"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Layers className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{deck.name}</h3>
        {deck.cardCount !== undefined && (
          <p className="text-sm text-muted-foreground">{deck.cardCount} cards</p>
        )}
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
};

export default DeckCard;
