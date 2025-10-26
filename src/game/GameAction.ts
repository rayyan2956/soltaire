import type { GameState } from "./GameState";
import type { Card } from "../data/Deck";

export function moveCardToFoundation(
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  foundationIndex: number
): GameState {
  const newFoundations = [...game.foundations];
  let newWaste = [...game.waste];
  const newTableau = game.tableau.map((pile) => [...pile]);

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
  if (source === "waste") {
    newWaste = newWaste.filter((c) => c.id !== card.id);
  }

  // 🏆 Add to foundation
  newFoundations[foundationIndex] = [
    ...newFoundations[foundationIndex],
    { ...card, faceup: true },
  ];

  return {
    ...game,
    tableau: newTableau,
    waste: newWaste,
    foundations: newFoundations,
  };

  return game;
}

export const moveCardToTableau = (
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  tableauIndex: number
): GameState => {
  const newTableau = game.tableau.map((p) => [...p]);
  let newWaste = [...game.waste];
  // remove from source

  console.log("source:", source);
  if (source === "waste") {
    newWaste = newWaste.filter((c) => c.id !== card.id);
    console.log("new waste:", newWaste);
  } else {
    const pileIndex = newTableau.findIndex((p) => p.includes(card));
    console.log("pile index:", pileIndex);
    if (pileIndex === -1) return game; // card not found
    const pile = newTableau[pileIndex];
    console.log("pile:", pile);
    newTableau[pileIndex] = pile.slice(0, pile.indexOf(card));

    const topCard = newTableau[pileIndex][newTableau[pileIndex].length - 1];
    if (topCard && !topCard.faceup) topCard.faceup = true;
  }

  // add to tableau
  if (!newTableau[tableauIndex]) newTableau[tableauIndex] = [];
  newTableau[tableauIndex].push({ ...card, faceup: true });

  return { ...game, waste: newWaste, tableau: newTableau };
};
