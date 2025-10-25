import React from "react";
import { fullDeck } from "../data/deck";
import Card from "./Card";

const Tableau: React.FC = () => {
  const tableau = fullDeck.slice(0, 7);

  return (
    <div className="flex gap-4 justify-center">
      {tableau.map((card) => (
        <Card key={card.id} rank={card.rank} suit={card.suit} color={card.color} faceUp={true} />
      ))}
    </div>
  );
};

export default Tableau;
