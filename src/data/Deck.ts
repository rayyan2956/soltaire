export interface Card{
    id: number,
    rank: string,
    suit: string,
    color: string,
    faceup:boolean
}

const ranks = ["A","1","2","3","4","5","6","7","8","9","10","J","Q","K"];
const suits = ["♠", "♥", "♦", "♣"];

export const fullDeck: Card[] = [];

let id_counter = 1;

for (const suit of suits){
    for (const rank of ranks){
        fullDeck.push({
            id: id_counter++,
            rank: rank,
            suit: suit,
            color: (suit === "♥" || suit === "♦") ? "red" : "black",
            faceup: false
        });
        id_counter += 1;
    }
}