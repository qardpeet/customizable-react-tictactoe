import React from "react";

function Menu({ height, width, winningStreak, handleChange, createBoard }) {
  return (
    <div className="menu-wrapper">
      <label>
        Height:
        <input
          type="text"
          name="height"
          value={height}
          onChange={handleChange}
        />
      </label>
      <label>
        Width:
        <input type="text" name="width" value={width} onChange={handleChange} />
      </label>
      <label>
        Winning Streak:
        <input
          type="text"
          name="winningStreak"
          value={winningStreak}
          onChange={handleChange}
        />
      </label>
      <button className="btn" onClick={createBoard}>
        PLAY
      </button>
    </div>
  );
}

export default Menu;
