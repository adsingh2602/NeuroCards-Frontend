import { useNavigate } from "react-router-dom";
import { Layers, ChevronRight, Trash2 } from "lucide-react";
import { Deck, deleteDeck } from "@/lib/api";

const DeckCard = ({
  deck,
  onDelete,
}: {
  deck: Deck;
  onDelete: () => void;
}) => {
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent navigation
    await deleteDeck(Number(deck.id));
    onDelete();
  };

  return (
    <div className="relative group">
      <button
        onClick={() => navigate(`/deck/${deck.id}`)}
        className="flex w-full items-center gap-4 rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/30 animate-fade-in"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Layers className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate max-w-[200px]">
            {deck.name}
          </h3>

         {/* <p className="text-sm text-muted-foreground">
            {deck.cardCount && deck.cardCount > 0
              ? `${deck.cardCount} cards`
              : "Processing..."}
          </p> */}
        </div>

        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* DELETE BUTTON */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1 rounded-md bg-destructive/10 hover:bg-destructive/20"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </button>
    </div>
  );
};

export default DeckCard;