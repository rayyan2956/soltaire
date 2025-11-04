import type { GameState } from "./GameState";
import type { Card } from "../data/Deck";
import { Stack } from "../Structures/Stack";

import { updateScore } from "./ScoreSystem";
import { checkWin } from "./GameWin";

import { saveGameState } from "./GameHistory";
function getCardValue(rank: string): number {
  const order = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  return order.indexOf(rank) + 1;
}

export function moveCardToFoundation(
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  foundationIndex: number
): { updatedGame: GameState; error?: string } {
  if (foundationIndex < 0 || foundationIndex >= game.foundations.length)
    return { updatedGame: game, error: "Invalid foundation index!" };

  const newFoundations = game.foundations.map(
    (pile) => new Stack<Card>(pile.toArray())
  );
  let newWaste = [...game.waste];

  const foundation = newFoundations[foundationIndex];
  const foundationCards = foundation.toArray();
  const topCard = foundationCards[foundationCards.length - 1];

  // Validate move
  if (topCard) {
    const sameSuit = topCard.suit === card.suit;
    const correctOrder =
      getCardValue(card.rank) === getCardValue(topCard.rank) + 1;
    if (!sameSuit || !correctOrder)
      return { updatedGame: game, error: "Invalid move to foundation!" };
  } else if (card.rank !== "A") {
    return { updatedGame: game, error: "Only Aces can start a foundation!" };
  }

  saveGameState(game);

  if (source === "tableau") {
    const newTableau = game.tableau.map(
      (pile) => new Stack<Card>(pile.toArray())
    );

    const sourceIndex = newTableau.findIndex((pile) =>
      pile.toArray().some((c) => c.id === card.id)
    );
    if (sourceIndex === -1)
      return { updatedGame: game, error: "Source pile not found!" };

    const sourcePile = newTableau[sourceIndex];
    const temp = sourcePile.toArray();
    const lastCard = temp[temp.length - 1];
    if (!lastCard || lastCard.id !== card.id)
      return { updatedGame: game, error: "You can only move the top card!" };

    sourcePile.pop();
    const top = sourcePile.peek();
    if (top && !top.faceup) top.faceup = true;

    foundation.push({ ...card, faceup: true });

    let updatedGame: GameState = {
      ...game,
      tableau: newTableau,
      foundations: newFoundations,
    };

    // ✅ Add score for tableau → foundation
    updatedGame = updateScore(updatedGame, 10);
if (checkWin(updatedGame)) {
  updatedGame.gameWon = true;
}

    return { updatedGame };
  }

  if (source === "waste") {
    if (!newWaste.some((c) => c.id === card.id))
      return { updatedGame: game, error: "Card not found in waste!" };

    newWaste = newWaste.filter((c) => c.id !== card.id);
    foundation.push({ ...card, faceup: true });

    let updatedGame: GameState = {
      ...game,
      waste: newWaste,
      foundations: newFoundations,
    };

    // ✅ Add score for waste → foundation
    updatedGame = updateScore(updatedGame, 5);

    return { updatedGame };
  }

  return { updatedGame: game };
}


export const moveCardToTableau = (
  game: GameState,
  card: Card,
  source: "tableau" | "waste",
  tableauIndex: number
): { updatedGame: GameState; error?: string } => {
  if (tableauIndex < 0 || tableauIndex >= game.tableau.length)
    return { updatedGame: game, error: "Invalid tableau index!" };

  const newTableau = game.tableau.map(
    (pile) => new Stack<Card>(pile.toArray())
  );
  let newWaste = [...game.waste];

  const targetPile = newTableau[tableauIndex];
  const targetCards = targetPile.toArray();
  const targetTop = targetCards[targetCards.length - 1];

  if (targetTop) {
    const oppositeColor = targetTop.color !== card.color;
    const correctOrder =
      getCardValue(targetTop.rank) === getCardValue(card.rank) + 1;
    if (!oppositeColor || !correctOrder)
      return { updatedGame: game, error: "Invalid move to tableau!" };
  } else if (card.rank !== "K") {
    return {
      updatedGame: game,
      error: "Only Kings can be placed on empty piles!",
    };
  }

  saveGameState(game);

  let updatedGame: GameState = { ...game };

  if (source === "waste") {
    if (!newWaste.some((c) => c.id === card.id))
      return { updatedGame: game, error: "Card not found in waste!" };

    newWaste = newWaste.filter((c) => c.id !== card.id);
    targetPile.push({ ...card, faceup: true });

    // ✅ Add +3 for waste → tableau
    updatedGame = updateScore(
      { ...updatedGame, waste: newWaste, tableau: newTableau },
      3
    );
  } else {
    const pileIndex = newTableau.findIndex((pile) =>
      pile.toArray().some((c) => c.id === card.id)
    );
    if (pileIndex === -1)
      return { updatedGame: game, error: "Source pile not found!" };

    const pile = newTableau[pileIndex];
    const temp = pile.toArray();
    const cutIndex = temp.findIndex((c) => c.id === card.id);

    if (cutIndex === -1)
      return { updatedGame: game, error: "Card not found in source pile!" };

    const movingCards = temp.slice(cutIndex);
    const remainingCards = temp.slice(0, cutIndex);

    newTableau[pileIndex] = new Stack<Card>();
    remainingCards.forEach((c) => newTableau[pileIndex].push(c));

    const topCard = newTableau[pileIndex].peek();
    if (topCard && !topCard.faceup) {
      topCard.faceup = true;
      // ✅ Add +5 for flipping a card
      updatedGame = updateScore(updatedGame, 5);
    }
    console.log("Current Score:", updatedGame.score);


    movingCards.forEach((c) => targetPile.push({ ...c, faceup: true }));
    updatedGame = { ...updatedGame, tableau: newTableau };
  }
  if (checkWin(updatedGame)) {
  updatedGame.gameWon = true;
}

  return { updatedGame };
};
