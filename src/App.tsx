import "./App.css";
import Foundation from "./components/Foundation";
import Navbar from "./components/layout";
import Stockpile from "./components/StockPile";
import Tableau from "./components/Tableau";
import { useState } from "react";
import type { GameState } from "./game/GameState";
import { initializeGame } from "./game/InitGame";
import React from "react";
import { clearHistory, saveGameState, undoMove } from "./game/GameHistory";
import { getHint } from "./HintSystem";

const App: React.FC = () => {
  const [game, setGame] = useState<GameState>(initializeGame());
  const [resetCount, setResetCount] = useState(0); // for timer reset
  const [timeElapsed, setTimeElapsed] = useState(0); // to track time

  const handleUndo = () => {
    console.log("Undo button clicked.");
    setGame((prev) => ({ ...undoMove(prev) }));
  };

  const handleNewGame = () => {
    clearHistory();
    const newGame = initializeGame();
    saveGameState(newGame);
    setGame(newGame);
    setResetCount((prev) => prev + 1);
    setTimeElapsed(0);
  };

  // Timer logic
  React.useEffect(() => {
    if (game.gameWon) return; // stop timer on win
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [game.gameWon]);

  const [hintMessage, setHintMessage] = useState<string | null>(null);

  const handleHint = () => {
    const hint = getHint(game);
    if (hint) {
      setHintMessage("💡 " + hint);
    } else {
      setHintMessage("😅 No valid moves found right now!");
    }

    // Auto-hide after 4 seconds
    setTimeout(() => setHintMessage(null), 4000);
  };

  // Convert seconds to mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-green-900 text-white flex flex-col relative">
      {/* Navbar */}
      <Navbar
        key={resetCount}
        onUndo={handleUndo}
        onNewGame={handleNewGame}
        score={game.score}
        onHint={() => handleHint()}
      />

      {/* Main Game Layout */}
      <div className="flex justify-between items-start px-32 mt-8">
        <div className="flex justify-between mr-0.5">
          <Stockpile game={game} setGame={setGame} />
        </div>
        <Foundation game={game} setGame={setGame} />
      </div>

      <div className="flex justify-center mt-16">
        <Tableau game={game} setGame={setGame} />
      </div>
      {/* 💡 Hint Popup */}
      {hintMessage && (
        <div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 
    bg-yellow-400 text-green-900 font-semibold px-6 py-3 rounded-full 
    shadow-lg animate-fadeIn text-lg z-50 transition-opacity duration-500"
        >
          {hintMessage}
        </div>
      )}

      {/* ✅ Win Popup Modal */}
      {game.gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-green-800 text-white p-8 rounded-2xl shadow-2xl text-center w-96 animate-fadeIn">
            <h1 className="text-4xl font-extrabold text-yellow-300 mb-4">
              🎉 You Won the Game! 🎉
            </h1>
            <p className="text-lg mb-2">
              <span className="font-semibold text-yellow-200">Score:</span>{" "}
              {game.score}
            </p>
            <p className="text-lg mb-6">
              <span className="font-semibold text-yellow-200">Time:</span>{" "}
              {formatTime(timeElapsed)}
            </p>
            <button
              onClick={handleNewGame}
              className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
            >
              🔁 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
