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
    const card =
      source === "waste"
        ? game.waste.find((c) => c.id === cardId)
        : game.tableau.flat().find((c) => c.id === cardId);

    if (!card) return;
    console.log("source of foundation drop:", source);
    // Move to foundation
    setGame((prev) =>
      moveCardToFoundation(prev, card, source, foundationIndex)
    );
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="flex gap-4 justify-end">
      {game.foundations.map((pile, i) => {
        const topCard = pile[pile.length - 1];
        return (
          <div
            key={i}
            className="w-40 h-64 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center"
            onDrop={(e) => handleDrop(e, i)}
            onDragOver={handleDragOver}
          >
            {topCard ? (
              <Card
                rank={topCard.rank}
                suit={topCard.suit}
                color={topCard.color}
                faceUp={topCard.faceup}
              />
            ) : (
              <span className="text-gray-200 text-2xl">
                {["♠", "♥", "♦", "♣"][i]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Foundation;
