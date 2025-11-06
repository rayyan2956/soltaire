# 🃏 Solitaire Game (Klondike) – CSC200 Midterm Project

### Course: **Data Structures & Algorithms (CSC200)**
**Instructor:** *Sir Nazeef Ul Haq*  
**Student:** *Muhammad Rayyan*  
**Roll No:** *[Your Roll Number]*  
**Department of Computer Science – UET Lahore*  
**Session:** *2024–2028*

---

## 📘 Project Overview
This project implements the **Klondike Solitaire** card game using **TypeScript and React**, showcasing the application of data structures and algorithms in an interactive game.  
It includes core functionalities such as deck shuffling, move validation, undo/redo, and win detection — designed completely from scratch.

A reference gameplay example can be found at [solitaired.com](https://solitaired.com/).

---

## 🎯 Objectives
- Demonstrate real-world use of **Stacks, Queues, Linked Lists, Arrays, and Hash Maps**.  
- Apply algorithmic problem solving and modular design principles.  
- Implement complete Solitaire logic including valid moves, card flipping, and victory detection.  
- Practice clean, documented, and testable code development.

---

## 🧩 Tech Stack
- **Frontend:** React (TypeScript)  
- **Language:** TypeScript  
- **Build Tool:** Vite / CRA  
- **Version Control:** GitLab  
- **Testing:** Jest / Vitest (optional)

---

## 📁 Project Structure
src/
│
├── components/ # React UI components
│ ├── Card.tsx # Card UI component
│ ├── Tableau.tsx # Tableau piles (7 main columns)
│ ├── Foundation.tsx # Foundation piles (A–K)
│ ├── StockPile.tsx # Stock and waste piles
│ └── layout.tsx # Game layout and top-level rendering
│
├── data/
│ └── Deck.ts # Suits, ranks, and deck generation
│
├── game/
│ ├── GameState.ts # Central game state
│ ├── InitGame.ts # Initial setup and deal
│ ├── GameAction.ts # Movement logic between piles
│ ├── Rules.ts # Move legality validation
│ ├── GameHistory.ts # Undo/redo stack system
│ ├── ScoreSystem.ts # Score calculation
│ └── GameWin.ts # Win detection
│
└── Structures/
├── LinkedList.ts # Custom linked list
├── Stack.ts # Stack (LIFO)
└── Queue.ts # Queue (FIFO)

---

## ⚙️ Game Flow
1. **Initialization**
   - 52-card deck is generated and shuffled using the Fisher–Yates algorithm.
   - Cards are distributed into 7 tableau piles; the top card of each pile is face-up.
   - Four empty foundation piles and a stockpile are initialized.

2. **Moves & Validation**
   - Cards move according to Klondike rules:
     - Alternate colors, descending rank in tableau.
     - Ascending suit order in foundation (Ace → King).
   - `Rules.ts` ensures move legality.

3. **Undo / Redo**
   - Managed using two stacks in `GameHistory.ts` (LIFO behavior).
   - Each state is cloned before modification to prevent shallow-copy issues.

4. **Win Condition**
   - When all foundation piles are complete, a win message triggers.

---

## 🧠 Data Structures Overview
| Data Structure | Purpose | Implementation |
|----------------|----------|----------------|
| **Stack** | Foundation piles & Undo/Redo | LIFO behavior for moves |
| **Queue** | Stockpile | FIFO card drawing |
| **Linked List** | Tableau piles | Dynamic manipulation and traversal |
| **Array** | Deck creation & shuffle | Efficient random access |
| **HashMap** | Track card state & position | Constant-time lookup |

---

## 🧪 Testing
Create unit tests for:
- `LinkedList.ts` – push, pop, toArray, clone  
- `Rules.ts` – move validation logic  
- `GameAction.ts` – card transfer between piles  
- `UndoRedo.ts` – ensure correct history state

Run:
```bash
npm run test
⚡ Installation & Run
1. Clone the Repository
git clone https://gitlab.com/yourusername/CSC200M24PIDXX.git
cd CSC200M24PIDXX

2. Install Dependencies
npm install

3. Start Development Server
npm run dev

4. Build for Production
npm run build