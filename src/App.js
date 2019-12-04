import React, { Component } from "react";
import classNames from "classnames";

export class App extends Component {
  state = {
    board: [],
    winningStreak: 3,
    height: 4,
    width: 5,
    stepCount: 0,
    status: "",
    menu: true,
    streakCells: []
  };

  createBoard = () => {
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
          this.setState({
            streakCells,
            status: "WIN"
          });
          return;
        }
        continue;
      }
      streakCells = [];
    }

    streakCells = [];

    //check cells horizontally
    for (let c = 0; c < this.state.width; c++) {
      if (this.state.board[rIndex][c] === cell) {
        streakCells.push([rIndex, c]);

        if (streakCells.length >= this.state.winningStreak) {
          this.setState({
            streakCells,
            status: "WIN"
          });
          return;
        }
        continue;
      }
      streakCells = [];
    }

    if (this.state.stepCount >= this.state.height * this.state.width) {
      this.setState({
        status: "TIE"
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.state.menu) {
      return (
        <div className="menu-wrapper">
          <label>
            Height:
            <input
              type="number"
              name="height"
              value={this.state.height}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Width:
            <input
              type="number"
              name="width"
              value={this.state.width}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Winning Streak:
            <input
              type="number"
              name="winningStreak"
              value={this.state.winningStreak}
              onChange={this.handleChange}
            />
          </label>
          <button className="btn" onClick={this.createBoard}>
            PLAY
          </button>
        </div>
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
