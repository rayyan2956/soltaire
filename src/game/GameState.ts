import type { Card } from "../data/Deck";
import { Stack } from "../Structures/Stack";


export interface GameState {
  stock: Card[];
  waste: Card[];
  tableau: Stack<Card>[];
  foundations: Stack<Card>[];
  
}
