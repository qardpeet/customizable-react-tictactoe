import React from "react";
import classNames from "classnames";

import GameStatus from "./GameStatus";

function Game({
  board,
  width,
  height,
  streakCells,
  status,
  stepCount,
  handleCellClick,
  toggleMenu
}) {
  return (
    <div className="game-wrapper">
      <div
        className="game"
        style={{
          gridTemplateColumns: `repeat(${width}, 50px)`,
          gridTemplateRows: `repeat(${height}, 50px)`
        }}
      >
        {board.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <div
              className={classNames("cell", {
                streak: streakCells.some(
                  element => element[0] === rIndex && element[1] === cIndex
                )
              })}
              key={rIndex + cIndex}
              onClick={() => handleCellClick(rIndex, cIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>

      <GameStatus
        status={status}
        stepCount={stepCount}
        toggleMenu={toggleMenu}
      />
    </div>
  );
}

export default Game;
