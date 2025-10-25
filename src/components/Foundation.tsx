import React from "react";
import Card from "./Card";
import type { Card as CardType } from "../data/Deck";

interface FoundationProps {
  foundations: CardType[][];
}

const Foundation: React.FC<FoundationProps> = ({ foundations }) => {
  
  return (
    <div className="flex gap-4 justify-end">
      {foundations.map((pile, i) => {
        const topCard = pile[pile.length - 1];
        return (
          <div
            key={i}
            className="w-40 h-64 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center"
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
