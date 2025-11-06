import type { GameState } from "./GameState";

export function checkWin(game: GameState): boolean {
  const totalFoundationCards = game.foundations.reduce(
    (sum, pile) => sum + pile.size(),
    0
  );

  if (totalFoundationCards === 52) return true;

  const allFaceUp = game.tableau.every((pile) =>
    pile.toArray().every((card) => card.faceup)
  );

  if (allFaceUp) return true;
  console.log("Win conditions not met.");

  return false;
}
