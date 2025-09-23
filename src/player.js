const Board = require('./gameboard')

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Board();
  }
}

module.exports = Player