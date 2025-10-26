import type { GameState } from "./GameState";
import type { Card } from "../data/Deck";



export function moveCardToFoundation(
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  foundationIndex: number
): GameState {
  const newFoundations = [...game.foundations];

  if (source === "tableau") {
    const tableau = game.tableau.map((pile) => [...pile]);
    const sourceIndex = tableau.findIndex((pile) =>
      pile.some((c) => c.id === card.id)
    );
    console.log("source index:", sourceIndex);

    if (sourceIndex === -1) return game; // card not found

    tableau[sourceIndex].pop();

    // Flip next card if needed
    const top = tableau[sourceIndex][tableau[sourceIndex].length - 1];
    if (top && !top.faceup) top.faceup = true;

    newFoundations[foundationIndex] = [
      ...newFoundations[foundationIndex],
      { ...card, faceup: true },
    ];

    return {
      ...game,
      tableau,
      foundations: newFoundations,
    };
  }

  return game;
}

export const moveCardToTableau = (
  game: GameState,
  card: Card,
  source: "waste" | "tableau",
  tableauIndex: number
): GameState => {
  const newTableau = game.tableau.map((p) => [...p]);
  const newWaste = [...game.waste];

  // remove from source
  if (source === "waste") newWaste.pop();
  else {
    const pileIndex = newTableau.findIndex((p) => p.includes(card));
    const pile = newTableau[pileIndex];
    newTableau[pileIndex] = pile.slice(0, pile.indexOf(card));

    const topCard = newTableau[pileIndex][newTableau[pileIndex].length - 1];
    if (topCard && !topCard.faceup) topCard.faceup = true;
  }

  // add to tableau
  newTableau[tableauIndex] = [
    ...newTableau[tableauIndex],
    { ...card, faceup: true },
  ];

  return { ...game, waste: newWaste, tableau: newTableau };
};
