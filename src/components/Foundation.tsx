import React, { useState } from "react";
import Card from "./Card";
import type { GameState } from "../game/GameState";
import { moveCardToFoundation } from "../game/GameAction";

interface FoundationProps {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}

const Foundation: React.FC<FoundationProps> = ({ game, setGame }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent, foundationIndex: number) => {
    e.preventDefault();
    const cardId = Number(e.dataTransfer.getData("cardId"));
    const source = e.dataTransfer.getData("source") as "tableau" | "waste";

    const draggedCard =
      source === "waste"
        ? game.waste.find((c) => c.id === cardId)
        : game.tableau.flatMap((pile) => pile.toArray()).find((c) => c.id === cardId);

    if (!draggedCard) return;

    setGame((prev) => {
      const { updatedGame, error } = moveCardToFoundation(
        prev,
        draggedCard,
        source,
        foundationIndex
      );

      if (error) {
        setError(error);
        setTimeout(() => setError(null), 2000); // hide after 2s
        return prev; // keep previous game state
      }

      return updatedGame;
    });
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-pulse z-40">
          {error}
        </div>
      )}

      <div className="flex gap-6 mt-2">
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
    </div>
  );
};

export default Foundation;
