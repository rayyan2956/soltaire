import type { GameState } from "./GameState";
import type { Card } from "../data/Deck";
import { Stack } from "../Structures/Stack";

function getCardValue(rank: string): number {
  const order = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return order.indexOf(rank) + 1;
}

export function moveCardToFoundation(
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  foundationIndex: number
): { updatedGame: GameState; error?: string } {
  const newFoundations = [...game.foundations];
  let newWaste = [...game.waste];

  const foundation = newFoundations[foundationIndex];
  const foundationCards = foundation.toArray();
  const topCard = foundationCards[foundationCards.length - 1];

  if (topCard) {
    const sameSuit = topCard.suit === card.suit;
    const correctOrder = getCardValue(card.rank) === getCardValue(topCard.rank) + 1;
    if (!sameSuit || !correctOrder)
      return { updatedGame: game, error: "Invalid move to foundation!" };
  } else {
    if (card.rank !== "A")
      return { updatedGame: game, error: "Only Aces can start a foundation!" };
  }

  if (source === "tableau") {
    const tableau = game.tableau.map((pile: Stack<Card>) => new Stack<Card>(pile.toArray()));
    const sourceIndex = tableau.findIndex((pile: Stack<Card>) =>
      pile.toArray().some((c: Card) => c.id === card.id)
    );

    if (sourceIndex === -1)
      return { updatedGame: game, error: "Source pile not found!" };

    const sourcePile = tableau[sourceIndex];
    sourcePile.pop();

    const top = sourcePile.peek();
    if (top && !top.faceup) top.faceup = true;

    foundation.push({ ...card, faceup: true });

    return {
      updatedGame: {
        ...game,
        tableau,
        foundations: newFoundations,
      },
    };
  }

  if (source === "waste") {
    newWaste = newWaste.filter((c: Card) => c.id !== card.id);
  }

  foundation.push({ ...card, faceup: true });

  return {
    updatedGame: {
      ...game,
      waste: newWaste,
      foundations: newFoundations,
    },
  };
}

export const moveCardToTableau = (
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  tableauIndex: number
): { updatedGame: GameState; error?: string } => {
  const newTableau = game.tableau.map((pile: Stack<Card>) => new Stack<Card>(pile.toArray()));
  let newWaste = [...game.waste];

  const targetPile = newTableau[tableauIndex];
  const targetCards = targetPile.toArray();
  const targetTop = targetCards[targetCards.length - 1];

  if (targetTop) {
    const oppositeColor = targetTop.color !== card.color;
    const correctOrder = getCardValue(targetTop.rank) === getCardValue(card.rank) + 1;
    if (!oppositeColor || !correctOrder)
      return { updatedGame: game, error: "Invalid move to tableau!" };
  } else {
    if (card.rank !== "K")
      return { updatedGame: game, error: "Only Kings can be placed on empty piles!" };
  }

  if (source === "waste") {
    newWaste = newWaste.filter((c) => c.id !== card.id);
    targetPile.push({ ...card, faceup: true });
  } else {
    const pileIndex = newTableau.findIndex((pile) =>
      pile.toArray().some((c) => c.id === card.id)
    );
    if (pileIndex === -1)
      return { updatedGame: game, error: "Source pile not found!" };

    const pile = newTableau[pileIndex];
    const temp = pile.toArray();
    const cutIndex = temp.findIndex((c) => c.id === card.id);
    const movingCards = temp.slice(cutIndex);
    const remainingCards = temp.slice(0, cutIndex);

    newTableau[pileIndex] = new Stack<Card>();
    remainingCards.forEach((c) => newTableau[pileIndex].push(c));

    const topCard = newTableau[pileIndex].peek();
    if (topCard && !topCard.faceup) topCard.faceup = true;

    movingCards.forEach((c) => targetPile.push({ ...c, faceup: true }));
  }

  return { updatedGame: { ...game, waste: newWaste, tableau: newTableau } };
};
