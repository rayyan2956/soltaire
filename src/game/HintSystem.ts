import type { GameState } from "./GameState";
import type { Card } from "../data/Deck";

export function getHint(game: GameState): string | null {
  for (let i = 0; i < game.tableau.length; i++) {
    const pile = game.tableau[i];
    if (pile.isEmpty()) continue;

    const topCard = pile.peek();
    if (!topCard) continue;

    const foundation = game.foundations.find((f) =>
      canMoveToFoundation(topCard, f)
    );
    if (foundation) {
      return `You can move ${topCard.rank}${topCard.suit} to a foundation.`;
    }
  }

  for (let i = 0; i < game.tableau.length; i++) {
    const fromPile = game.tableau[i];
    if (fromPile.isEmpty()) continue;

    const fromCard = fromPile.peek();
    if (!fromCard) continue;

    for (let j = 0; j < game.tableau.length; j++) {
      if (i === j) continue;
      const toPile = game.tableau[j];
      const toCard = toPile.peek();

      if (toCard && canPlaceOnTableau(fromCard, toCard)) {
        return `Try moving ${fromCard.rank}${fromCard.suit} to ${toCard.rank}${toCard.suit}.`;
      }
    }
  }

  if (!game.stock.isEmpty()) {
    return "Try drawing a card from the stock pile.";
  }

  return "No hints available! Try flipping a face-down card.";
}

function canMoveToFoundation(card: Card, foundation: any): boolean {
  if (foundation.isEmpty()) return card.rank === "A";
  const top = foundation.peek();
  if (!top) return false;

  const ranks = [
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
  return (
    top.suit === card.suit &&
    ranks.indexOf(card.rank) === ranks.indexOf(top.rank) + 1
  );
}

function canPlaceOnTableau(from: Card, to: Card): boolean {
  const ranks = [
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
  const colors: Record<"H" | "D" | "C" | "S", "red" | "black"> = {
    H: "red",
    D: "red",
    C: "black",
    S: "black",
  };

  return (
    colors[from.suit as "H" | "D" | "C" | "S"] !==
      colors[to.suit as "H" | "D" | "C" | "S"] &&
    ranks.indexOf(from.rank) === ranks.indexOf(to.rank) - 1
  );
}
