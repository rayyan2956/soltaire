import { Stack } from "../Structures/Stack";
import { Queue } from "../Structures/Queues";
import type { GameState } from "./GameState";

export const gameHistory = new Stack<GameState>();

// Save
export function saveGameState(game: GameState) {
  const snapshot = {
    stock: game.stock.toArray(),
    waste: [...game.waste],
    tableau: game.tableau.map((s) => s.toArray()),
    foundations: game.foundations.map((s) => s.toArray()),
  };

  gameHistory.push(snapshot as unknown as GameState);
  console.log("Game state saved. History size:", gameHistory.size(), snapshot);
}

// Undo
export function undoMove(game: GameState): GameState {
  console.log("Attempting to undo move. History size:", gameHistory.size(), gameHistory);
  if (gameHistory.isEmpty()) return game;
  gameHistory.pop();

  const prev = gameHistory.peek();
  if (!prev) return game;

  // ✅ reconstruct proper Stack and Queue instances
  return {
    stock: new Queue(prev.stock as any),
    waste: [...prev.waste],
    tableau: (prev.tableau as any[]).map((t) => new Stack(t)),
    foundations: (prev.foundations as any[]).map((f) => new Stack(f)),
  };
}
