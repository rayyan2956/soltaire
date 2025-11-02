import React from "react";
import Card from "./Card";
import type { GameState } from "../game/GameState";
import { Queue } from "../Structures/Queues";
import type { Card as CardType } from "../data/Deck";
import { saveGameState } from "../game/GameHistory";

interface StockpileProps {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}

const Stockpile: React.FC<StockpileProps> = ({ game, setGame }) => {
  const drawCards = () => {
    if (game.stock.isEmpty()) return;

    saveGameState(game);

    const newStock = new Queue<CardType>(game.stock.toArray());
    const drawnCards: CardType[] = [];

    for (let i = 0; i < 3; i++) {
      const card = newStock.dequeue();
      if (!card) break;
      drawnCards.push({ ...card, faceup: true });
    }

    const newWaste = [...game.waste, ...drawnCards];
    setGame((prev) => ({ ...prev, stock: newStock, waste: newWaste }));
  };

  const resetStock = () => {
    if (game.waste.length === 0) return;

    saveGameState(game);

    const reversedWaste = [...game.waste].reverse().map((c) => ({ ...c, faceup: false }));
    const newStock = new Queue<CardType>(reversedWaste);

    setGame((prev) => ({ ...prev, stock: newStock, waste: [] }));
  };

  return (
    <div className="flex gap-6 items-center relative h-60">
      {/* Stock */}
      <div
        className={`w-40 h-60 border border-white/30 rounded-lg shadow-md flex items-center justify-center cursor-pointer
          ${!game.stock.isEmpty() ? "bg-red-800" : "bg-gray-700"} transition-colors duration-300`}
        onClick={!game.stock.isEmpty() ? drawCards : resetStock}
      >
        {!game.stock.isEmpty() ? (
          <div className="text-white/50 text-sm">
            Deck ({game.stock.size()})
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
            className="relative transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105"
            style={{ zIndex: i }}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("cardId", card.id.toString());
              e.dataTransfer.setData("source", "waste");
            }}
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
