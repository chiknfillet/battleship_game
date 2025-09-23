class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunked = false;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.length === this.hits) {
      this.sunked = true
      return true
    } 
    return false
  }
}

module.exports = Ship;