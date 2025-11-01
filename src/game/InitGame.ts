import { generateDeck, shuffleDeck} from "../data/Deck";
import type { Card } from "../data/Deck";
import { Stack } from "../Structures/Stack";

import type { GameState } from "./GameState";

export const initializeGame = (): GameState => {
  const deck = shuffleDeck(generateDeck());

  const tableau: Stack<Card>[] = [];
  let index = 0;

 
  for (let i = 0; i < 7; i++) {
    const pileCards = deck.slice(index, index + i + 1);
    pileCards[i].faceup = true;
    tableau[i] = new Stack<Card>(pileCards); 
    index += i + 1;
  }
  const stock = deck.slice(index);

  const waste: Card[] = [];
  const foundations: Stack<Card>[] = [
    new Stack<Card>(),
    new Stack<Card>(),
    new Stack<Card>(),
    new Stack<Card>(),
  ];

  return { stock, waste, tableau, foundations: foundations};
};
