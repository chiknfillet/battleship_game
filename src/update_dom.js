import pubsub from './pubsub'
import placeShip from './placeShip'
import Gameboard from './gameboard';

pubsub.on('gameOver', gameOver);

let gameWinner = ''

function initialize(gameboard) {
  pubsub.on('changeMain', resetMain);

  const body = document.querySelector('body');  
  body.innerHTML = ''

  const header = document.createElement('header');
  header.textContent = 'Battleship';
  const main = document.createElement('main');
  const footer = document.createElement('footer');
  footer.textContent = 'Developed by Marlex C. Estores';

  body.appendChild(header);
  body.appendChild(main);
  body.appendChild(footer);

  placeShip.initialize(gameboard);
}

function declareWinner() {
  const parentContainer = document.querySelector('main');
  const container = document.createElement('div');
  container.classList.add('winner')
  const title = document.createElement('h1');
  title.textContent = gameWinner;

  const newGameBtn = document.createElement('button');
  newGameBtn.textContent = 'New Game';
  newGameBtn.addEventListener('click', () => {
    pubsub.emit('newBoard', new Gameboard());
  });

  container.appendChild(title)
  container.appendChild(newGameBtn)
  parentContainer.appendChild(container)
}

function gameOver(winner) {
  gameWinner = winner
  resetMain(declareWinner)
}

function resetMain(newContent) {
  const container = document.querySelector('main');
  container.innerHTML = '';
  newContent();
}

export {
  initialize
}