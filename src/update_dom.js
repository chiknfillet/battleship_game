import pubsub from './pubsub'
import placeShip from './place_ship'

function initialize(gameboard) {
  pubsub.on('changeMain', resetMain);

  const body = document.querySelector('body');

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

function resetMain(newContent) {
  const container = document.querySelector('main');
  container.innerHTML = '';
  newContent();
}

export {
  initialize
}