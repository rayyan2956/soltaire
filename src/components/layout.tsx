import React, { useEffect, useState } from "react";

interface NavbarProps {
  onUndo: () => void;
  onHint: () => void;
  onNewGame: () => void;
  score: number; // ✅ Added score prop
}

const Navbar: React.FC<NavbarProps> = ({ onUndo,onHint, onNewGame, score }) => {
  const [seconds, setSeconds] = useState(0);

  // ✅ Timer logic
  useEffect(() => {
    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer); // cleanup
  }, []);

  // Format time as MM:SS
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <nav
      className="flex justify-between items-center 
      bg-white/10 backdrop-blur-md border border-white/50
      shadow-lg rounded-2xl px-6 py-5 text-white"
    >
      {/* Left side buttons */}
      <div className="flex items-center space-x-3">
        <span className="font-black text-2xl tracking-wide mr-8">
          Solitaire
        </span>
        <button
          onClick={onNewGame}
          className="bg-green-500 hover:bg-green-600 px-3 py-1 font-medium rounded-xl"
        >
          New Game
        </button>

        <button onClick={onHint} className="bg-fuchsia-700 hover:bg-fuchsia-600 px-3 py-1 rounded-xl font-black">
          Hint
        </button>

        <button
          onClick={onUndo}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-xl font-semibold"
        >
          Undo
        </button>
      </div>

      {/* Right side info: Score + Timer */}
      <div className="flex items-center space-x-8 text-lg font-semibold">
        <div>
          <span className="text-gray-300 mr-1">Score:</span>
          <span>{score}</span>
        </div>
        <div>
          <span className="text-gray-300 mr-1">Time:</span>
          <span>{formatTime(seconds)}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
