import type { GameState } from "./GameState";
import type { Card } from "../data/Deck";

export function getHint(game: GameState): string | null {
  const wasteTop = game.waste[game.waste.length - 1];
  if (wasteTop) {
    const foundation = game.foundations.find((f) =>
      canMoveToFoundation(wasteTop, f)
    );
    if (foundation) {
      return `You can move ${wasteTop.rank}${wasteTop.suit} from Waste to Foundation.`;
    }
  }

  if (wasteTop) {
    for (let i = 0; i < game.tableau.length; i++) {
      const pile = game.tableau[i];
      const top = pile.peek();
      if (top && canPlaceOnTableau(wasteTop, top)) {
        return `Try moving ${wasteTop.rank}${wasteTop.suit} from Waste to ${top.rank}${top.suit}.`;
      } else if (pile.isEmpty() && wasteTop.rank === "K") {
        return `You can move ${wasteTop.rank}${wasteTop.suit} from Waste to an empty Tableau pile.`;
      }
    }
  }

  for (let i = 0; i < game.tableau.length; i++) {
    const pile = game.tableau[i];
    const topCard = pile.peek();
    if (topCard) {
      const foundation = game.foundations.find((f) =>
        canMoveToFoundation(topCard, f)
      );
      if (foundation) {
        return `You can move ${topCard.rank}${topCard.suit} from Tableau to Foundation.`;
      }
    }
  }

  for (let i = 0; i < game.tableau.length; i++) {
    const fromPile = game.tableau[i];
    const fromCards = fromPile.toArray().filter((c) => c.faceup);
    for (const fromCard of fromCards) {
      for (let j = 0; j < game.tableau.length; j++) {
        if (i === j) continue;
        const toPile = game.tableau[j];
        const toCard = toPile.peek();
        if (toCard && canPlaceOnTableau(fromCard, toCard)) {
          return `Try moving ${fromCard.rank}${fromCard.suit} to ${toCard.rank}${toCard.suit}.`;
        } else if (toPile.isEmpty() && fromCard.rank === "K") {
          return `You can move ${fromCard.rank}${fromCard.suit} to an empty Tableau pile.`;
        }
      }
    }
  }

  for (let i = 0; i < game.foundations.length; i++) {
    const pile = game.foundations[i];
    const topCard = pile.peek();
    if (!topCard) continue;

    for (let j = 0; j < game.tableau.length; j++) {
      const toPile = game.tableau[j];
      const toCard = toPile.peek();
      if (toCard && canPlaceOnTableau(topCard, toCard)) {
        return `You can move ${topCard.rank}${topCard.suit} from Foundation to ${toCard.rank}${toCard.suit}.`;
      } else if (toPile.isEmpty() && topCard.rank === "K") {
        return `You can move ${topCard.rank}${topCard.suit} from Foundation to an empty Tableau pile.`;
      }
    }
  }

  if (!game.stock.isEmpty()) {
    return "Try drawing a card from the stock pile.";
  }

  return "😅 No hints available right now!";
}

function canMoveToFoundation(card: Card, foundation: any): boolean {
  if (foundation.isEmpty()) return card.rank === "A";
  const top = foundation.peek();
  if (!top) return false;

  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return (
    top.suit === card.suit &&
    ranks.indexOf(card.rank) === ranks.indexOf(top.rank) + 1
  );
}

function canPlaceOnTableau(from: Card, to: Card): boolean {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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
