import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center 
     bg-white/10 backdrop-blur-md border border-white/50
     shadow-lg rounded-2xl px-6 py-5 text-white">
      {/* Left Side */}
      <div className="flex items-center space-x-2">
        <span className="font-black text-2xl tracking-wide mr-8">Solitaire</span>
        <button className="bg-green-500 hover:bg-green-600 px-3 py-1 font-medium rounded-xl">Turn 3</button>
        <button className="bg-green-500 hover:bg-green-600 px-3 py-1 font-medium rounded-xl">New game</button>
     
        <button className="bg-fuchsia-700 hover:bg-fuchsia-600 px-3 py-1 rounded-xl font-black">Hint</button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-xl font-semibold">Undo</button>
      </div>
    </nav>
  );
};

export default Navbar;
 