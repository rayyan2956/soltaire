export interface Card {
  id: number;
  rank: string;
  suit: string;
  color: string;
  faceup: boolean;
}

const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["♠", "♥", "♦", "♣"];

export const fullDeck: Card[] = [];

let id_counter = 1;

for (const suit of suits) {
  for (const rank of ranks) {
    fullDeck.push({
      id: id_counter++,
      rank,
      suit,
      color: suit === "♥" || suit === "♦" ? "red" : "black",
      faceup: false,
    });
  }
}


export const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  let id_counter = 1;

  for (const suit of suits) {
    const color = suit === "♥" || suit === "♦" ? "red" : "black";

    for (const rank of ranks) {
      deck.push({
        id: id_counter++,
        rank,
        suit,
        color,
        faceup: false,
      });
    }
  }

  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
  }
  return shuffled;
};
