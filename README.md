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
