import React from "react";
import Card from "./Card";
import type { GameState } from "../game/GameState";

interface StockpileProps {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}

const Stockpile: React.FC<StockpileProps> = ({ game, setGame }) => {
  const drawCards = () => {
    if (game.stock.length === 0) return;

    const newStock = [...game.stock];
    const drawnCards = [];

    for (let i = 0; i < 3; i++) {
      const card = newStock.pop(); 
      if (!card) break;
      drawnCards.push({ ...card, faceup: true });
    }

    const newWaste = [...game.waste, ...drawnCards];
    setGame((prev) => ({ ...prev, stock: newStock, waste: newWaste }));
  };

  const resetStock = () => {
    if (game.waste.length === 0) return;

    const newStock = game.waste.map((c) => ({ ...c, faceup: false })).reverse(); 
    setGame((prev) => ({ ...prev, stock: newStock, waste: [] }));
  };

  return (
    <div className="flex gap-6 items-center relative h-60">
      {/* Stock */}
      <div
        className={`w-40 h-60 border border-white/30 rounded-lg shadow-md flex items-center justify-center cursor-pointer
          ${
            game.stock.length > 0 ? "bg-red-800" : "bg-gray-700"
          } transition-colors duration-300`}
        onClick={game.stock.length > 0 ? drawCards : resetStock}
      >
        {game.stock.length > 0 ? (
          <div className="text-white/50 text-sm">
            Deck ({game.stock.length})
          </div>
        ) : (
          <div className="text-white/50 text-sm">
            {game.waste.length > 0 ? "Reset Deck" : "Empty"}
          </div>
        )}
      </div>

      {/* Waste */}
      <div className="flex -space-x-15 relative w-80 h-60">
        {game.waste.slice(-3).map((card, i) => (
          <div
            key={card.id}
            className={`relative transition-all duration-500 ease-in-out transform 
              hover:-translate-y-2 hover:scale-105`}
            style={{ zIndex: i }}
          >
            <Card
              rank={card.rank}
              suit={card.suit}
              color={card.color}
              faceUp={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stockpile;
