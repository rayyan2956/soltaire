import './App.css';
import Foundation from './components/Foundation';
import Navbar from './components/layout'; 
import Stockpile from './components/StockPile';
import Tableau from './components/Tableau';
import { useState } from 'react';
import type { GameState } from './game/GameState';
import { initializeGame } from './game/InitGame';
import { undoMove } from './game/GameHistory';

const App: React.FC = () => {
  const [game, setGame] = useState<GameState>(initializeGame());

  // 🟡 Undo function
  const handleUndo = () => {
    setGame((prev) => undoMove(prev));
  };

  const handleNewGame = () => {
    setGame(initializeGame());
  };

  return (
    <div className="min-h-screen bg-green-900 text-white flex flex-col">
      <Navbar onUndo={handleUndo} onNewGame={handleNewGame} />

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
