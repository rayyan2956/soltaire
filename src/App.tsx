import "./App.css";
import Foundation from "./components/Foundation";
import Navbar from "./components/layout";
import Stockpile from "./components/StockPile";
import Tableau from "./components/Tableau";
import { useState } from "react";
import type { GameState } from "./game/GameState";
import { initializeGame } from "./game/InitGame";
import { clearHistory } from "./game/GameHistory";

import { saveGameState, undoMove } from "./game/GameHistory";

const App: React.FC = () => {
  const [game, setGame] = useState<GameState>(initializeGame());
  const [resetCount, setResetCount] = useState(0); // ✅ For timer reset

  const handleUndo = () => {
    console.log("Undo button clicked.");
    setGame((prev) => ({ ...undoMove(prev) }));
  };

  const handleNewGame = () => {
    clearHistory();
    const newGame = initializeGame();
    saveGameState(newGame);
    setGame(newGame);
  };
  {
    game.gameWon && (
      <div className="text-center mt-10 text-4xl font-bold text-yellow-300">
        🎉 You Won the Game! 🎉
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-900 text-white flex flex-col">
      {/* ✅ Add key + pass score */}
      <Navbar
        key={resetCount} // forces re-mount for timer reset
        onUndo={handleUndo}
        onNewGame={handleNewGame}
        score={game.score}
      />

      <div className="flex justify-between items-start px-32 mt-8">
        <div className="flex justify-between mr-0.5">
          <Stockpile game={game} setGame={setGame} />
        </div>
        <Foundation game={game} setGame={setGame} />
      </div>

      <div className="flex justify-center mt-16">
        <Tableau game={game} setGame={setGame} />
      </div>
    </div>
  );
};

export default App;
