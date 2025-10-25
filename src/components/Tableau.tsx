import React from "react";
import Card from "./Card";
import type { Card as CardType } from "../data/Deck";

interface TableauProps {
  tableau: CardType[][];
}

const Tableau: React.FC<TableauProps> = ({ tableau }) => {
  return (
    <div className="flex justify-center gap-8 mt-10">
      {tableau.map((pile, i) => (
        <div key={i} className="flex flex-col relative">
          {pile.map((card, j) => (
            <div
              key={card.id}
              className={j === 0 ? "" : "-mt-[225px]"} 
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
      ))}
    </div>
  );
};

export default Tableau;
