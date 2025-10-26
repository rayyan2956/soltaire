import type { Card } from "../data/Deck";

export interface GameState {
  stock: Card[];
  waste: Card[];
  tableau: Card[][];
  foundations: Card[][];


}
