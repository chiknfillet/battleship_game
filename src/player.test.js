const Board = require('./gameboard')
const Player = require('./player')

test('check player instance', () => {
  const player = new Player('juan');
  expect(player).toBeInstanceOf(Player)
})
test('check proper name', () => {
  const player = new Player('jose');
  expect(player.name).toBe('jose')
})
test('check player instance', () => {
  const player = new Player('juan');
  expect(player.board).toBeInstanceOf(Board)
})