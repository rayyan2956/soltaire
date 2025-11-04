import type { GameState } from "./GameState";

export function checkWin(game: GameState): boolean {
  // 🏁 Condition 1: All 52 cards in foundations
  const totalFoundationCards = game.foundations.reduce(
    (sum, pile) => sum + pile.size(),
    0
  );

  if (totalFoundationCards === 52) return true;

  // 🃏 Condition 2: All tableau cards are face up
  const allFaceUp = game.tableau.every((pile) =>
    pile.toArray().every((card) => card.faceup)
  );

  if (allFaceUp) return true;
  console.log("Win conditions not met.");

  return false;
}
