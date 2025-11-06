import type { Card } from "../data/Deck";

export const getRankIndex = (rank: string) =>
  ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].indexOf(
    rank
  );

export const canMoveToFoundation = (card: Card, pile: Card[]) => {
  if (pile.length === 0) return card.rank === "A";
  const topCard = pile[pile.length - 1];
  return (
    topCard.suit === card.suit &&
    getRankIndex(card.rank) === getRankIndex(topCard.rank) + 1
  );
};

export const canMoveToTableau = (card: Card, pile: Card[]) => {
  if (pile.length === 0) return card.rank === "K";
  const topCard = pile[pile.length - 1];
  return (
    topCard.faceup &&
    topCard.color !== card.color &&
    getRankIndex(topCard.rank) === getRankIndex(card.rank) + 1
  );
};
