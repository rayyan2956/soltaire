import { Stack } from "../Structures/Stack";
import type { GameState } from "./GameState";

export const gameHistory = new Stack<GameState>();

export function saveGameState(game: GameState) {
  gameHistory.push(structuredClone(game)); 
}

export function undoMove(game: GameState): GameState {
  if (gameHistory.isEmpty()) return game;
  const prev = gameHistory.pop();
  return prev ?? game;
}
