import React from "react";
import Card from "./Card";
import type { Card as CardType } from "../data/Deck";
import type { GameState } from "../game/GameState";

interface StockpileProps {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}

const Stockpile: React.FC<StockpileProps> = ({ game, setGame }) => {
  // Handle click on stock to move top card to waste
  const drawCards = () => {
    if (game.stock.length === 0) return;

    const newStock = [...game.stock];
    const drawCount = Math.min(3, newStock.length); // draw up to 3 cards
    const drawnCards = newStock.splice(-drawCount); // take last 3 cards

    // Flip them face-up and add to waste
    const newWaste = [
      ...game.waste,
      ...drawnCards.map((card) => ({ ...card, faceup: true })),
    ];

    setGame((prev) => ({ ...prev, stock: newStock, waste: newWaste }));
  };

  return (
    <div className="flex gap-6 items-center">
      {/* Stock (Face-down deck) */}
      <div
        className="w-40 h-60 bg-red-800 border border-white/30 rounded-lg shadow-md flex items-center justify-center cursor-pointer"
        onClick={drawCards}
      >
        {game.stock.length > 0 ? (
          <div className="text-white text-bold">Deck ({game.stock.length})</div>
        ) : (
          <div className="text-white text-bold">Empty</div>
        )}
      </div>

      {/* Waste (Face-up cards) */}
      <div className="flex -space-x-35">
        {game.waste.slice(-3).map((card: CardType) => (
          <Card
            key={card.id}
            rank={card.rank}
            suit={card.suit}
            color={card.color}
            faceUp={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Stockpile;
