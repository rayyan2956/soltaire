# 🃏 Solitaire Game (Klondike)

### CSC200 – Data Structures & Algorithms Midterm Project  
**Instructor:** Sir Nazeef Ul Haq  
**Student:** Muhammad Rayyan  
**Roll No:** 2024-CS-152  
**Department of Computer Science – UET Lahore**  
**Session:** 2024–2028  

---

## 📘 Overview

This project implements the **Klondike Solitaire** game using **TypeScript and React**.  
It demonstrates practical use of **data structures and algorithms** in a rule-based game, including features such as:
- Deck shuffling
- Move validation
- Undo/Redo functionality
- Win detection  

All systems were coded from scratch, showcasing algorithmic problem-solving and object-oriented design.

> Reference gameplay: [solitaired.com](https://solitaired.com/)

---

## 🎯 Objectives

- Apply multiple data structures: **Stack**, **Queue**, **Linked List**, **Array**, and **HashMap**.  
- Implement complete Solitaire mechanics with proper validation.  
- Build maintainable, modular, and well-documented code.  
- Use React and TypeScript for efficient state management.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React (TypeScript) |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Version Control** | GitLab |

---

## 📁 Project Structure

```plaintext
src/
│
├── components/                   # React UI components
│   ├── Card.tsx                  # Displays individual card
│   ├── Foundation.tsx            # Foundation piles (A–K)
│   ├── Tableau.tsx               # Tableau (7 main columns)
│   ├── StockPile.tsx             # Stock and waste piles
│   └── layout.tsx                # Main game layout and render logic
│
├── data/
│   └── Deck.ts                   # Defines deck, suits, ranks, shuffle logic
│
├── game/
│   ├── GameState.ts              # Manages all piles and card states
│   ├── InitGame.ts               # Initializes deck and tableau setup
│   ├── GameAction.ts             # Implements moves between piles
│   ├── Rules.ts                  # Valid move checks (alternating color, rank)
│   ├── GameHistory.ts            # Undo/Redo using stack-based system
│   ├── ScoreSystem.ts            # Score tracking and calculation
│   └── GameWin.ts                # Detects win condition
│
└── Structures/
    ├── LinkedList.ts             # Custom linked list for tableau representation
    ├── Stack.ts                  # Stack (LIFO) implementation
    └── Queue.ts                  # Queue (FIFO) for stockpile
## ⚙️ Game Flow

### 1. Initialization
- A **52-card deck** is generated and shuffled using the **Fisher–Yates algorithm**.  
- Cards are distributed into **7 tableau piles**, with the **last card face-up**.  
- **Four foundation piles** and a **stockpile** are initialized.  

### 2. Moves and Validation
Cards follow standard **Klondike Solitaire rules**:
- **Tableau:** Alternate colors, descending rank.  
- **Foundation:** Same suit, ascending order (Ace → King).  
- Validation logic is handled in `Rules.ts`.  

### 3. Undo / Redo
- Implemented using **two stacks** (`undoStack` and `redoStack`) in `GameHistory.ts`.  
- Each move **clones the game state** before modification.  

### 4. Win Condition
- The player **wins** when all four foundations are filled (**A–K of each suit**).  

---

## 🧠 Data Structures Used

| Data Structure | Purpose | Implementation |
|----------------|----------|----------------|
| **Stack** | Foundation & Undo/Redo | LIFO operations for game state tracking |
| **Queue** | Stockpile | FIFO draw mechanism |
| **Linked List** | Tableau Piles | Dynamic insertion/removal of cards |
| **Array** | Deck Creation | Random shuffle and card access |
| **HashMap** | Card State Tracker | O(1) lookup for card positions |

---

## 🧰 Developer Commands

| Purpose | Command |
|----------|----------|
| Run app locally | `npm run dev` |
| Build production bundle | `npm run build` |
