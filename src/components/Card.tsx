import React from "react";

interface CardProps {
  rank: string;
  suit: string;
  color: string;
  faceUp: boolean;
}

const Card: React.FC<CardProps> = ({ rank, suit, color, faceUp }) => {
  const textColor = color === "red" ? "text-red-600" : "text-gray-900";
  const suitSymbol = { "♠": "♠️", "♥": "♥️", "♦": "♦️", "♣": "♣️" }[suit];

  // Map rank to numeric value for layout
  const numericValue = parseInt(rank);
  const isNumberCard = !isNaN(numericValue);

  return (
    <div
      className={`relative flex flex-col justify-between p-3 rounded-2xl border-2
      shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-transform duration-300
      ${
        faceUp
          ? "bg-linear-to-br from-white to-gray-100"
          : "bg-linear-to-br from-red-800 to-red-900"
      }
      hover:scale-105 hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)]`}
      style={{
        width: "10vw",
        height: "14vw",
        maxWidth: "180px",
        maxHeight: "250px",
        minWidth: "180px",
        minHeight: "250px",
        borderColor: faceUp ? "#e5e7eb" : "#991b1b",
      }}
    >
      {/* Card Border Shine */}
      <div className="absolute inset-0 rounded-2xl bg-white/10 blur-sm pointer-events-none" />

      {faceUp ? (
        <>
          {/* Top Left */}
          <div className={`absolute top-2 left-2 text-lg font-bold ${textColor}`}>
            {rank}
            <div className="-mt-1">{suitSymbol}</div>
          </div>

          {/* Center area */}
          <div className="flex flex-col items-center justify-center h-full">
            {isNumberCard ? (
              // Numbered cards show multiple suit symbols
              <div
                className={`grid grid-cols-3 gap-y-1 justify-items-center text-2xl ${textColor}`}
                style={{ gridTemplateRows: `repeat(${Math.ceil(numericValue / 3)}, 1fr)` }}
              >
                {Array.from({ length: numericValue }).map((_, i) => (
                  <div key={i}>{suit}</div>
                ))}
              </div>
            ) : (
              // Face cards (J, Q, K, A)
              <div className={`text-6xl font-semibold ${textColor}`}>{rank}</div>
            )}
          </div>

          {/* Bottom Right */}
          <div
            className={`absolute bottom-2 right-2 text-lg font-bold ${textColor} rotate-180`}
          >
            {rank}
            <div className="-mt-1">{suitSymbol}</div>
          </div>
        </>
      ) : (
        // Card Back Design
        <div className="w-full h-full rounded-xl flex items-center justify-center">
          <div className="w-16 h-24 bg-[repeating-linear-gradient(45deg,#b91c1c,#b91c1c_5px,#7f1d1d_5px,#7f1d1d_10px)] rounded-lg border border-white/20"></div>
        </div>
      )}
    </div>
  );
};

export default Card;
