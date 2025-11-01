import type { GameState } from "./GameState";
import type { Card } from "../data/Deck";
import { Stack } from "../Structures/Stack";

export function moveCardToFoundation(
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  foundationIndex: number
): GameState {
  const newFoundations = [...game.foundations];
  let newWaste = [...game.waste];
  const newTableau = game.tableau.map((pile: Stack<Card>) => new Stack<Card>(pile.toArray()));

  if (source === "tableau") {
    const tableau = game.tableau.map((pile: Stack<Card>) => new Stack<Card>(pile.toArray()));
    const sourceIndex = tableau.findIndex((pile: Stack<Card>) =>
      pile.toArray().some((c: Card) => c.id === card.id)
    );

    if (sourceIndex === -1) return game;

    const sourcePile = tableau[sourceIndex];
    sourcePile.pop();

    const top = sourcePile.peek();
    if (top && !top.faceup) top.faceup = true;

    newFoundations[foundationIndex].push({ ...card, faceup: true });


    return {
      ...game,
      tableau,
      foundations: newFoundations,
    };
  }

  if (source === "waste") {
    newWaste = newWaste.filter((c: Card) => c.id !== card.id);
  }

  const newCard: Card = { ...card, faceup: true };
  newFoundations[foundationIndex].push(newCard);



  return {
    ...game,
    tableau: newTableau,
    waste: newWaste,
    foundations: newFoundations,
  };
}

export const moveCardToTableau = (
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  tableauIndex: number
): GameState => {
  const newTableau = game.tableau.map((pile: Stack<Card>) => new Stack<Card>(pile.toArray()));
  
  let newWaste = [...game.waste];

  if (source === "waste") {
    newWaste = newWaste.filter((c: Card) => c.id !== card.id);
  } else {
    const pileIndex = newTableau.findIndex((pile: Stack<Card>) =>
      pile.toArray().some((c: Card) => c.id === card.id)
    );
    if (pileIndex === -1) return game;

    const pile = newTableau[pileIndex];
    const temp = pile.toArray();
    const cutIndex = temp.findIndex((c: Card) => c.id === card.id);
    const newCards = temp.slice(0, cutIndex);

    newTableau[pileIndex] = new Stack<Card>();
    newCards.forEach((c: Card) => newTableau[pileIndex].push(c));

    const topCard = newTableau[pileIndex].peek();
    if (topCard && !topCard.faceup) topCard.faceup = true;
  }

  if (!newTableau[tableauIndex]) newTableau[tableauIndex] = new Stack<Card>();
  newTableau[tableauIndex].push({ ...card, faceup: true });

  return { ...game, waste: newWaste, tableau: newTableau };
};
