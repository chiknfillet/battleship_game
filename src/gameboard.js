const Ship = require('./ship.js');

class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => [false, null])
    );
    this.ships = []
    this.ship_sized = [5, 4, 3, 3, 2]
  }

  checkCoordinateAvailability(x_coor, y_coor, vertical, size) {
    if (vertical) {
      if (y_coor + size > 10) return false;

      for (let i = y_coor; i < y_coor + size; i++) {
        if (this.board[x_coor][i][1]) {
          return false;
        }
      }
      return true;
    } else {
      if (x_coor + size > 10) return false;

      for (let i = x_coor; i < x_coor + size; i++) {
        if (this.board[i][y_coor][1]) {
          return false;
        }
      }
      return true;
    }
  }

  placeShip(x_coor, y_coor, vertical, size) {
    if (!this.checkCoordinateAvailability(x_coor, y_coor, vertical, size)) return false

    const ship = new Ship(size);
    this.ships.push(ship)

    if (vertical) {
      for (let i = y_coor; i < y_coor + size; i++) {
        this.board[x_coor][i] = [false, ship];
      }
    } else {
      for (let i = x_coor; i < x_coor + size; i++) {
        this.board[i][y_coor] = [false, ship];
      }
    }
    return true
  }

  receiveAttack(x_coor, y_coor) {
    this.board[x_coor][y_coor][0] = true;
    if (this.board[x_coor][y_coor][1]) {
      this.board[x_coor][y_coor][1].hit();
      return true
    }
    return false
  }

  checkShips() {
    return this.ships.every(ship => ship.isSunk());
  }

  placeShipsRandomly() {
    this.ship_sized.forEach((size) => {
      let placed = false;

      while (!placed) {
        const x_pos = Math.floor(Math.random() * 10);
        const y_pos = Math.floor(Math.random() * 10);
        const vertical = Math.random() < 0.5; // random orientation

        placed = this.placeShip(x_pos, y_pos, vertical, size);
      }
    })
  }
}

module.exports = Gameboard;