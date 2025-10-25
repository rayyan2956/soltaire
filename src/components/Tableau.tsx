import React from "react";
import { fullDeck } from "../data/deck";
import Card from "./Card";

const Tableau: React.FC = () => {
  const piles = Array.from({ length: 7 }, (_, i) => fullDeck.slice(i * 3, i * 3 + i + 1));

  return (
    <div className="flex justify-center gap-8 mt-10">
      {piles.map((pile, i) => (
        <div key={i} className="flex flex-col relative">
          {pile.map((card, j) => (
            <div
              key={card.id}
              className={j === 0 ? "" : "-mt-[100px]"} // card overlap
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
      ))}
    </div>
  );
};

export default Tableau;
