import React from "react";
import Card from "./Card";
import type { GameState } from "../game/GameState";
import { moveCardToFoundation } from "../game/GameAction";

interface FoundationProps {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}

const Foundation: React.FC<FoundationProps> = ({ game, setGame }) => {
  const handleDrop = (e: React.DragEvent, foundationIndex: number) => {
    e.preventDefault();
    const cardId = Number(e.dataTransfer.getData("cardId"));
    const source = e.dataTransfer.getData("source") as "tableau" | "waste";

    const draggedCard =
      source === "waste"
        ? game.waste.find((c) => c.id === cardId)
        : game.tableau.flatMap((pile) => pile.toArray()).find((c) => c.id === cardId);

    if (!draggedCard) return;

    setGame((prev) => moveCardToFoundation(prev, draggedCard, source, foundationIndex));
  };

  return (
    <div className="flex gap-6">
      {game.foundations.map((foundation, i) => {
        const cards = foundation.toArray();
        const topCard = cards[cards.length - 1];

        return (
          <div
            key={i}
            className="w-40 h-60 border border-white/30 rounded-lg shadow-md flex items-center justify-center"
            onDrop={(e) => handleDrop(e, i)}
            onDragOver={(e) => e.preventDefault()}
          >
            {topCard ? (
              <Card
                rank={topCard.rank}
                suit={topCard.suit}
                color={topCard.color}
                faceUp={true}
              />
            ) : (
              <div className="text-white/50 text-sm">Empty</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Foundation;
