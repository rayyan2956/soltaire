import { generateDeck, shuffleDeck} from "../data/Deck";
import type { Card } from "../data/Deck";

import type { GameState } from "./GameState";

export const initializeGame = (): GameState => {
  const deck = shuffleDeck(generateDeck());

  const tableau: Card[][] = [];
  let index = 0;

  for (let i = 0; i < 7; i++) {
    tableau[i] = deck.slice(index, index + i +3);
    tableau[i][i].faceup = true; 
    index += i + 1;
  }

  const stock = deck.slice(index);

  const waste: Card[] = [];
  const foundation: Card[][] = [[], [], [], []];

  return { stock, waste, tableau, foundations: foundation};
};
