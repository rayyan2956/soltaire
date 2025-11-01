import React, { useState } from "react";
import Card from "./Card";
import type { Card as CardType } from "../data/Deck";
import type { GameState } from "../game/GameState";
import { moveCardToTableau } from "../game/GameAction";

interface TableauProps {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}

const Tableau: React.FC<TableauProps> = ({ game, setGame }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id.toString());
    e.dataTransfer.setData("source", "tableau");
  };

  const handleDrop = (e: React.DragEvent, targetPileIndex: number) => {
    const cardId = Number(e.dataTransfer.getData("cardId"));
    const source = e.dataTransfer.getData("source") as "tableau" | "waste";

    const draggedCard =
      source === "waste"
        ? game.waste.find((c) => c.id === cardId)
        : game.tableau.flatMap((pile) => pile.toArray()).find((c) => c.id === cardId);

    if (!draggedCard) return;

    setGame((prev) => {
      const { updatedGame, error } = moveCardToTableau(prev, draggedCard, source, targetPileIndex);
      if (error) {
        setError(error);
        setTimeout(() => setError(null), 2000);
        return prev; 
      }
      return updatedGame;   
    });
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute bottom-185 left-1/2 -translate-x-1/2 bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-pulse z-40">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-8 mt-10">
        {game.tableau.map((pile, i) => {
          const cards = pile.toArray();
          return (
            <div
              key={i}
              className="flex flex-col relative"
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={(e) => e.preventDefault()}
            >
              {cards.map((card: CardType, j: number) => (
                <div
                  key={card.id}
                  className={j === 0 ? "" : "-mt-[225px]"}
                  draggable={card.faceup}
                  onDragStart={(e) => handleDragStart(e, card)}
                >
                  <Card
                    rank={card.rank}
                    suit={card.suit}
                    color={card.color}
                    faceUp={card.faceup}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tableau;
