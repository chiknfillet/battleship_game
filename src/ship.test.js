const Ship = require('./ship')

test('create instance of ship class', () => {
  const instance = new Ship();
  expect(instance).toBeInstanceOf(Ship)
})
test('have correct length', () => {
  const instance = new Ship(5);
  expect(instance.length).toBe(5)
})
test('0 hit at initialization', () => {
  const instance = new Ship(5);
  expect(instance.hits).toBe(0)
})
test('sunk property is false at initialization', () => {
  const instance = new Ship(5);
  expect(instance.sunked).toBe(false)
})
test('sunk property is false at initialization', () => {
  const instance = new Ship(5);
  expect(instance.sunked).toBe(false)
})
test('ship takes hit', () => {
  const instance = new Ship(5);
  instance.hit();
  instance.hit();
  expect(instance.hits).toBe(2)
})
test('ship is sunked', () => {
  const instance = new Ship(2);
  instance.hit();
  instance.hit();
  expect(instance.isSunk()).toBe(true)
})