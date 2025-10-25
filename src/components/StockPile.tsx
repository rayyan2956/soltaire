import React from "react";
import Card from "./Card";

const Stockpile: React.FC = () => {
  return (
    <div className="flex gap-6 items-center">
      {/* Stock (Face-down deck) */}
      <div
        className="w-20 h-28 bg-red-800 border border-white/30 rounded-lg shadow-md flex items-center justify-center"
      >
        <div className="text-white/50 text-sm">Deck</div>
      </div>

      {/* Waste (Face-up cards) */}
      <div>
        <Card rank="J" suit="♥" color="red" faceUp={true} />
      </div>
    </div>
  );
};

export default Stockpile;
