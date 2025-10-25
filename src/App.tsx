
import './App.css'
import Foundation from './components/Foundation'
import Navbar from './components/layout'
import Stockpile from './components/stockpile'
import Tableau from './components/Tableau'
function App() {

  return (
    
   <div className="min-h-screen bg-green-900 text-white flex flex-col">
      <Navbar />

      <div className="flex justify-between items-start px-32 mt-8">
        <Stockpile />
        <Foundation />
      </div>

      <div className="flex justify-center mt-16">
        <Tableau />
      </div>
    </div>
  )
}

export default App
