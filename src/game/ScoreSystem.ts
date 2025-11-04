import type { GameState } from "./GameState";

export function updateScore(game: GameState, points: number): GameState {
  console.log(`Adding ${points} points to score.`);
  console.log(`New score: ${game.score}`);

  return { ...game, score: game.score + points };
}
