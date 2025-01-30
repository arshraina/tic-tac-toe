import React, { useState, useEffect } from 'react';
import circle_icon from "/Users/arshraina/Desktop/tic-tac-toe/src/assets/circle.png";
import cross_icon from "/Users/arshraina/Desktop/tic-tac-toe/src/assets/cross.png";

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [lock, setLock] = useState(false);

  useEffect(() => {
    const winner = checkWin(board);
  if (winner) {
    setLock(true);
    setTimeout(() => {
      alert(`${winner} wins!`);
    }, 100); // Delay alert to allow UI update
    console.log(`${winner} wins! Game locked.`);
  }
  }, [board]); // Runs every time `board` changes

  const toggle = (index) => {
    if (board[index] || lock) {
      console.log("Move blocked. Board state:", board);
      return;
    }

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "O" : "X";

    setBoard(newBoard);
    setCount(count + 1);

    console.log("Board after move:", newBoard); // Log board state after move
  };

  const handleReset = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setLock(false);
    console.log("Game reset. New board:", Array(9).fill(""));
  };

  const checkWin = (currentBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a]; 
      }
    }
    return null; 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="mt-12 mb-3 text-white text-6xl">Tic Tac Toe</h1>

      <div className="h-[600px] w-[564px] flex flex-col justify-center items-center">
        {Array(3).fill(null).map((_, rowIndex) => (
          <div key={rowIndex} className="flex mb-2">
            {Array(3).fill(null).map((_, colIndex) => {
              const index = rowIndex * 3 + colIndex;
              return (
                <div
                  key={index}
                  className="boxes w-20 h-20 border border-[#0f1b21] flex justify-center items-center cursor-pointer"
                  onClick={() => toggle(index)}
                >
                  {board[index] === "X" && <img src={cross_icon} alt="X" />}
                  {board[index] === "O" && <img src={circle_icon} alt="O" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button 
        className="w-64 h-24 border-none outline-none cursor-pointer rounded-full bg-[#1f3540] text-2xl text-[#26ffcb] mt-6 mb-12"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
