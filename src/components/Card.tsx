import React from "react";

interface CardProps {
  rank: string;
  suit: string;
  color: string;
  faceUp: boolean;
}

const Card: React.FC<CardProps> = ({ rank, suit, color, faceUp }) => {
  return (
    <div
      className={`w-20 h-28 rounded-xl border shadow-md flex flex-col justify-between p-2 transition-transform ${
        faceUp ? "bg-white" : "bg-green-900"
      }`}
    >
      {faceUp && (
        <>
          <span className={`text-sm font-bold ${color === "red" ? "text-red-600" : "text-black"}`}>
            {rank}
          </span>
          <span className={`text-2xl self-end ${color === "red" ? "text-red-600" : "text-black"}`}>
            {suit}
          </span>
        </>
      )}
    </div>
  );
};

export default Card;
        