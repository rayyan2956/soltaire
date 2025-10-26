import React from "react";
import Card from "./Card";
import type { Card as CardType } from "../data/Deck";
import type { GameState } from "../game/GameState";
import { canMoveToFoundation } from "../game/Rules";
import { moveCardToFoundation, moveCardToTableau } from "../game/GameAction";

interface TableauProps {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}

const Tableau: React.FC<TableauProps> = ({ game, setGame }) => {
  
  const handleDragStart = (e: React.DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id.toString());
  };
  const handleDrop = (e: React.DragEvent, targetPileIndex: number) => {
    console.log("target pile index:", targetPileIndex); 
    const cardId = Number(e.dataTransfer.getData("cardId"));
    console.log("dropped card id:", cardId);
    console.log()
    const draggedCard = game.tableau.flat().find((c) => c.id === cardId);
    if (!draggedCard) return;
    console.log("found dragged card:", draggedCard);

    // Validate move (add logic here)
    // For now, just move it
    setGame((prev) =>
      moveCardToTableau(prev, draggedCard, "tableau", targetPileIndex)
    );
  };

  return (
    <div className="flex justify-center gap-8 mt-10">
      {game.tableau.map((pile, i) => (
        <div
          key={i}
          className="flex flex-col relative"
          onDrop={(e) => handleDrop(e, i)}
          onDragOver={(e) => e.preventDefault()}
        >
          {pile.map((card, j) => (
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
      ))}
    </div>
  );
};

export default Tableau;
