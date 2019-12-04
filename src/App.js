import React, { Component } from "react";
import classNames from "classnames";

import Menu from "./components/Menu";

export class App extends Component {
  state = {
    board: [],
    winningStreak: "3",
    height: "3",
    width: "3",
    stepCount: 0,
    status: "",
    menu: true,
    streakCells: []
  };

  createBoard = () => {
    if (
      this.state.winningStreak > this.state.height &&
      this.state.winningStreak > this.state.width
    ) {
      alert("Streak cannot be longer than height/width");
      return;
    }

    if (
      !this.state.winningStreak.length &&
      !this.state.height.length &&
      !this.state.width.length
    ) {
      alert("Please fill in all the fields");
      return;
    }

    let board = [];

    for (let r = 0; r < this.state.height; r++) {
      board.push([]);
      for (let c = 0; c < this.state.width; c++) {
        board[r].push("");
      }
    }

    this.setState({
      board,
      menu: false,
      streakCells: [],
      stepCount: 0,
      status: "PLAYING"
    });
  };

  handleCellClick = (rIndex, cIndex) => {
    const cell = this.state.board[rIndex][cIndex];

    if (this.state.status !== "PLAYING") return;

    if (cell !== "") return;

    const newBoard = this.state.board.map(row => [...row]);
    newBoard[rIndex][cIndex] = this.state.stepCount % 2 === 0 ? "X" : "O";

    this.setState(
      state => ({
        board: newBoard,
        stepCount: state.stepCount + 1
      }),
      () => this.checkStatus(rIndex, cIndex)
    );
  };

  checkStatus = (rIndex, cIndex) => {
    const cell = this.state.board[rIndex][cIndex];
    let streakCells = [];

    //check cells vertically
    for (let r = 0; r < this.state.height; r++) {
      if (this.state.board[r][cIndex] === cell) {
        streakCells.push([r, cIndex]);

        if (streakCells.length >= this.state.winningStreak) {
          this.win(streakCells);
          return;
        }
      } else {
        streakCells = [];
      }
    }

    streakCells = [];

    //check cells horizontally
    for (let c = 0; c < this.state.width; c++) {
      if (this.state.board[rIndex][c] === cell) {
        streakCells.push([rIndex, c]);

        if (streakCells.length >= this.state.winningStreak) {
          this.win(streakCells);
          return;
        }
      } else {
        streakCells = [];
      }
    }

    streakCells = [];

    //check cells diagonally top->bottom
    let topLeftRowIndex = rIndex >= cIndex ? rIndex - cIndex : 0;
    let topLeftColIndex = rIndex >= cIndex ? 0 : cIndex - rIndex;

    for (let r = topLeftRowIndex; r < this.state.height; r++) {
      if (topLeftColIndex >= this.state.width) break;

      if (this.state.board[r][topLeftColIndex] === cell) {
        streakCells.push([r, topLeftColIndex]);

        if (streakCells.length >= this.state.winningStreak) {
          this.win(streakCells);
          return;
        }
      } else {
        streakCells = [];
      }

      topLeftColIndex += 1;
    }

    streakCells = [];

    //check cells diagonally bottom->top
    let bottomLeftRowIndex =
      rIndex + cIndex >= this.state.height
        ? this.state.height - 1
        : rIndex + cIndex;

    let bottomLeftColIndex =
      rIndex + cIndex >= this.state.height
        ? rIndex + cIndex - (this.state.height - 1)
        : 0;

    for (let r = bottomLeftRowIndex; r >= 0; r--) {
      if (bottomLeftColIndex >= this.state.width) break;

      if (this.state.board[r][bottomLeftColIndex] === cell) {
        streakCells.push([r, bottomLeftColIndex]);

        if (streakCells.length >= this.state.winningStreak) {
          this.win(streakCells);
          return;
        }
      } else {
        streakCells = [];
      }

      bottomLeftColIndex += 1;
    }

    if (this.state.stepCount >= this.state.height * this.state.width) {
      this.setState({
        status: "TIE"
      });
    }
  };

  win = streakCells => {
    this.setState({
      streakCells,
      status: "WIN"
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/\D/, "")
    });
  };

  render() {
    if (this.state.menu) {
      return (
        <Menu
          height={this.state.height}
          width={this.state.width}
          winningStreak={this.state.winningStreak}
          handleChange={this.handleChange}
          createBoard={this.createBoard}
        />
      );
    }

    return (
      <div className="game-wrapper">
        <div
          className="game"
          style={{
            gridTemplateColumns: `repeat(${this.state.width}, 50px)`,
            gridTemplateRows: `repeat(${this.state.height}, 50px)`
          }}
        >
          {this.state.board.map((row, rIndex) =>
            row.map((cell, cIndex) => (
              <div
                className={classNames("cell", {
                  streak: this.state.streakCells.some(
                    element => element[0] === rIndex && element[1] === cIndex
                  )
                })}
                key={rIndex + cIndex}
                onClick={() => this.handleCellClick(rIndex, cIndex)}
              >
                {cell}
              </div>
            ))
          )}
        </div>

        {this.state.status === "WIN" && (
          <p>{this.state.stepCount % 2 === 0 ? "O" : "X"} Wins!</p>
        )}

        {this.state.status === "TIE" && <p>TIE</p>}

        {this.state.status !== "PLAYING" && (
          <button className="btn" onClick={() => this.setState({ menu: true })}>
            New Game
          </button>
        )}
      </div>
    );
  }
}

export default App;
