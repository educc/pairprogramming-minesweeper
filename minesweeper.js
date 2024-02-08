
class Game {

  #CELL_IS_EMPTY = 0;
  #CELL_HAS_BOMB = 1;
  #CELL_USER_PLAYED = 2;

  constructor(bombCount) {
    this.bombCount = bombCount;
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    this.#placeBombs();
  }

  #placeBombs() {
    //change 0 by 1 to put a bomb
    for (let i = 0; i < this.bombCount; i++) {
      let row = 0; //TODO: make it random
      let col = 0; //TODO: make it random

      this[row][col] = CELL_HAS_BOMB;
    }
  }

  jugar(row, col) {
    if (this.board[row][col] === 1) {
      return true;
    }
    this.board[row][col] = CELL_USER_PLAYED;
    return false;
  }

  get boardGame() {
    return this.board;
  }

}

function renderGame(game) {
  const rows = game.boardGame;
  let rendered = "";


  //TODO: ocultar donde estan las bombas y las casillas no jugadas

  for (let i = 0; i < rows.length; i++) {
    let singleRow = rows[i];

    for (let j = 0; j < singleRow.length; j++) {
      rendered += singleRow[j] + ", "
    }
    rendered += "\n";
  }

  console.log(rendered);
}

function main() {
  const myGame = new Game();
  renderGame(myGame)
}

main();