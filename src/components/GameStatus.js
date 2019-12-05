import React from "react";

function GameStatus({ status, stepCount, toggleMenu }) {
  if (status === "PLAYING") return null;

  return (
    <>
      {status === "WIN" && (
        <p className="status-text">{stepCount % 2 ? "X" : "O"} Wins!</p>
      )}

      {status === "TIE" && <p className="status-text">TIE</p>}

      <button className="btn" onClick={toggleMenu}>
        New Game
      </button>
    </>
  );
}

export default GameStatus;
