const Gameboard = require('./gameboard')

test('create instance', () => {
  const instance = new Gameboard();
  expect(instance).toBeInstanceOf(Gameboard)
});
test('place ship 1', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, true, 2);
  expect(gameboard.board[0][0][0]).toBe(false);
  expect(gameboard.board[0][0][1]).not.toBeNull();
});
test('place ship 2', () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShip(9, 9, true, 1)).toBe(true);
  expect(gameboard.board[9][9][0]).toBe(false);
  expect(gameboard.board[9][9][1]).not.toBeNull();
});
test('attack a ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(9, 9, true, 1);
  expect(gameboard.board[9][9][1].hits).toBe(0);
  gameboard.receiveAttack(9, 9)
  expect(gameboard.board[9][9][0]).toBe(true);
  expect(gameboard.board[9][9][1].hits).toBe(1);
});
test('attack a ship 2', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(5, 5, false, 3);
  expect(gameboard.board[5][5][1].hits).toBe(0);
  gameboard.receiveAttack(5, 5)
  expect(gameboard.board[5][5][0]).toBe(true);
  expect(gameboard.board[5][5][1].hits).toBe(1);
  gameboard.receiveAttack(6, 5);
  expect(gameboard.board[6][5][1].hits).toBe(2);
});
test('sunk some ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(9, 9, true, 1);
  gameboard.receiveAttack(9, 9)
  gameboard.placeShip(1, 1, true, 1);
  expect(gameboard.checkShips()).toBeFalsy();
});
test('sunk all ship', () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(9, 9, true, 1);
  gameboard.receiveAttack(9, 9)
  expect(gameboard.checkShips()).not.toBeFalsy();
});