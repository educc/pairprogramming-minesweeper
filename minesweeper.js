const prompt = require("prompt-async");

class Game {
  #BOARD_BOMB_CELL_HAS_BOMB = 1;
  #BOARD_BOMB_CELL_EMPTY = 0;

  #BOARD_GAME_CELL_UNTOUCH = "-";

  constructor(bombCount, boardSize) {
    this.bombCount = bombCount;
    this.boardSize = boardSize;
    this.boardBombsMatrix = this.#createBoard(boardSize, this.#BOARD_BOMB_CELL_EMPTY);
    this.boardGameMatrix = this.#createBoard(boardSize, this.#BOARD_GAME_CELL_UNTOUCH);

    this.#placeBombs();
  }

  #createBoard(maxColumns, defaultValue) {
    const result = [];

    for (let i = 0; i < maxColumns; i++) {
      const myArray = [];
      for (let j = 0; j < maxColumns; j++) {
        myArray.push(defaultValue);
      }

      result.push(myArray);
    }

    return result;
  }

  #placeBombs() {
    //change 0 by 1 to put a bomb
    for (let i = 0; i < this.bombCount; i++) {
      let row = Math.floor(Math.random() * this.boardSize);
      let col = Math.floor(Math.random() * this.boardSize);

      this.boardBombsMatrix[row][col] = this.#BOARD_BOMB_CELL_HAS_BOMB;
    }
  }

  play(row, col) {
    if (this.boardBombsMatrix[row][col] === 1) {
      this.boardGameMatrix[row][col] = "*";
      return true; // El jugador ha encontrado una bomba
    } else {
      this.boardGameMatrix[row][col] = this.#countNearBombs(row, col);
      return false;
    }
  }

  get boardGame() {
    return this.boardGameMatrix;
  }

  #countNearBombs(row, col) {
    //TODO: Use the this.boardBombsMatrix
    return 0;
  }

}

function renderGame(game) {
  const rows = game.boardGame;
  let rendered = "    ";


  for (let i = 0; i < rows.length; i++) {
    rendered += i + " "
  }

  rendered += "\n";
  rendered += "---------------------";
  rendered += "\n";

  for (let i = 0; i < rows.length; i++) {
    let singleRow = rows[i];


    rendered += i + " | ";
    for (let j = 0; j < singleRow.length; j++) {
      rendered += singleRow[j] + " ";
    }
    rendered += "\n";
  }

  console.log(rendered);
  console.log("\n");
}

async function main() {
  const myGame = new Game(0, 2);
  let playerLost = false;
  renderGame(myGame);

  // Bucle para jugar (ingresar datos y renderizar juego)
  while (!playerLost) {
    const { row, column } = await prompt.get(["row", "column"]);

    playerLost = myGame.play(row, column);

    //TODO: what about win the game

    renderGame(myGame);
  }

  if (playerLost) {
    console.log("You lose");
  }
}

main();


