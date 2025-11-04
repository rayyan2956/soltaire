import type { Card } from "../data/Deck";
import { Stack } from "../Structures/Stack";
import { Queue } from "../Structures/Queues";

export interface GameState {
  stock: Queue<Card>;
  waste: Card[];
  tableau: Stack<Card>[];
  foundations: Stack<Card>[];
  score: number;
  
}
