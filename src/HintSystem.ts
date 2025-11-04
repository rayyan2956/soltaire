import type { GameState } from "./game/GameState";
import type { Card } from "./data/Deck";

// ✅ getHint function
export function getHint(game: GameState): string | null {
  // 1️⃣ Try moving a tableau top card to foundation
  for (let i = 0; i < game.tableau.length; i++) {
    const pile = game.tableau[i];
    if (pile.isEmpty()) continue;

    const topCard = pile.peek();
    if (!topCard) continue; // ✅ avoid undefined

    const foundation = game.foundations.find((f) => canMoveToFoundation(topCard, f));
    if (foundation) {
      return `You can move ${topCard.rank}${topCard.suit} to a foundation.`;
    }
  }

  // 2️⃣ Try moving tableau → tableau
  for (let i = 0; i < game.tableau.length; i++) {
    const fromPile = game.tableau[i];
    if (fromPile.isEmpty()) continue;

    const fromCard = fromPile.peek();
    if (!fromCard) continue; // ✅ avoid undefined

    for (let j = 0; j < game.tableau.length; j++) {
      if (i === j) continue;
      const toPile = game.tableau[j];
      const toCard = toPile.peek();

      if (toCard && canPlaceOnTableau(fromCard, toCard)) {
        return `Try moving ${fromCard.rank}${fromCard.suit} to ${toCard.rank}${toCard.suit}.`;
      }
    }
  }

  // 3️⃣ Try suggesting a stock draw
  if (!game.stock.isEmpty()) {
    return "Try drawing a card from the stock pile.";
  }

  return "No hints available! Try flipping a face-down card.";
}

// ✅ Helper: can move to foundation
function canMoveToFoundation(card: Card, foundation: any): boolean {
  if (foundation.isEmpty()) return card.rank === "A";
  const top = foundation.peek();
  if (!top) return false;

  const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  return top.suit === card.suit && ranks.indexOf(card.rank) === ranks.indexOf(top.rank) + 1;
}

// ✅ Helper: can place on tableau (color alternation + descending rank)
function canPlaceOnTableau(from: Card, to: Card): boolean {
  const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
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
