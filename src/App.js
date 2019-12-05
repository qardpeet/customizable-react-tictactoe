import React, { Component } from "react";

import Menu from "./components/Menu";
import Game from "./components/Game";

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
    const height = parseInt(this.state.height);
    const width = parseInt(this.state.width);
    const winningStreak = parseInt(this.state.winningStreak);

    if (winningStreak > height && winningStreak > width) {
      alert("Streak cannot be longer than height/width");
      return;
    }

    if (isNaN(height) || isNaN(width) || isNaN(winningStreak)) {
      alert("Please fill in all the fields");
      return;
    }

    const board = [];

    for (let r = 0; r < height; r++) {
      board.push([]);
      for (let c = 0; c < width; c++) {
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
    const board = this.state.board;
    const stepCount = this.state.stepCount;
    const status = this.state.status;
    const cell = this.state.board[rIndex][cIndex];

    if (status !== "PLAYING") return;

    if (cell !== "") return;

    //making sure we do not mutate the state
    const newBoard = board.map(row => [...row]);
    newBoard[rIndex][cIndex] = stepCount % 2 ? "O" : "X";

    this.setState(
      state => ({
        board: newBoard,
        stepCount: state.stepCount + 1
      }),
      () => this.checkStatus(rIndex, cIndex)
    );
  };

  checkStatus = (rIndex, cIndex) => {
    const board = this.state.board;
    const cell = board[rIndex][cIndex];
    const height = parseInt(this.state.height);
    const width = parseInt(this.state.width);
    const winningStreak = parseInt(this.state.winningStreak);
    const stepCount = this.state.stepCount;

    let streakCells = [];

    //check cells vertically
    for (let r = 0; r < height; r++) {
      if (board[r][cIndex] === cell) {
        streakCells.push([r, cIndex]);

        if (streakCells.length >= winningStreak) {
          this.win(streakCells);
          return;
        }
      } else {
        streakCells = [];
      }
    }
    streakCells = [];

    //check cells horizontally
    for (let c = 0; c < width; c++) {
      if (board[rIndex][c] === cell) {
        streakCells.push([rIndex, c]);

        if (streakCells.length >= winningStreak) {
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

    for (let r = topLeftRowIndex; r < height; r++) {
      if (topLeftColIndex >= width) break;

      if (board[r][topLeftColIndex] === cell) {
        streakCells.push([r, topLeftColIndex]);

        if (streakCells.length >= winningStreak) {
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
      rIndex + cIndex >= height ? height - 1 : rIndex + cIndex;

    let bottomLeftColIndex =
      rIndex + cIndex >= height ? rIndex + cIndex - (height - 1) : 0;

    for (let r = bottomLeftRowIndex; r >= 0; r--) {
      if (bottomLeftColIndex >= width) break;

      if (board[r][bottomLeftColIndex] === cell) {
        streakCells.push([r, bottomLeftColIndex]);

        if (streakCells.length >= winningStreak) {
          this.win(streakCells);
          return;
        }
      } else {
        streakCells = [];
      }

      bottomLeftColIndex += 1;
    }

    //check for tie
    if (stepCount >= height * width) {
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

  toggleMenu = () => {
    this.setState(state => ({
      menu: !state.menu
    }));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/\D/, "")
    });
  };

  render() {
    const board = this.state.board;
    const height = this.state.height;
    const width = this.state.width;
    const winningStreak = this.state.winningStreak;
    const streakCells = this.state.streakCells;
    const status = this.state.status;
    const stepCount = this.state.stepCount;

    if (this.state.menu) {
      return (
        <Menu
          height={height}
          width={width}
          winningStreak={winningStreak}
          handleChange={this.handleChange}
          createBoard={this.createBoard}
        />
      );
    }

    return (
      <Game
        board={board}
        width={width}
        height={height}
        streakCells={streakCells}
        status={status}
        stepCount={stepCount}
        handleCellClick={this.handleCellClick}
        toggleMenu={this.toggleMenu}
      />
    );
  }
}

export default App;
