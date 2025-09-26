import pubsub from './pubsub'
import Gameboard from './gameboard';
import { CustomizeRule } from 'webpack-merge';

let currentGameboard = null;
let currentShipSize = 5;
let isVertical = true;

function initialize(gameboard) {
  currentGameboard = gameboard;
  pubsub.emit('changeMain', renderPlacingUI);
}

function renderPlacingUI(gameboard) {
  const container = document.querySelector('main');

  const title = document.createElement('h1');
  title.textContent = 'Place Your Ships';

  const placingContainer = document.createElement('div');
  placingContainer.classList.add('placing-container');

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-placing-container');

  container.appendChild(title);
  container.appendChild(placingContainer);
  container.appendChild(buttonsContainer);

  renderShipsPlacing();
  createBoard(currentGameboard);
  placementHover();
  addButtons();
}

function renderShipsPlacing() {
  const parentContainer = document.querySelector('.placing-container');
  const container = document.createElement('div');
  container.classList.add('ships-choices-container')

  const title = document.createElement('h2');
  title.textContent = 'Ships to Place:';

  const ships = [
    {'name': 'Carrier', 'size': 5},
    {'name': 'Battleship', 'size': 4},
    {'name': 'Cruiser', 'size': 3},
    {'name': 'Submarine', 'size': 3},
    {'name': 'Destroyer', 'size': 2}
  ]
  const shipList = document.createElement('ul');
  
  ships.forEach((ship, index) => {
    const list = document.createElement('li')

    const name = document.createElement('p');
    name.textContent = `${ship.name} (${ship.size})`;

    const placeButton = document.createElement('button');
    placeButton.classList.add('place-button');
    placeButton.textContent = 'Place';

    list.appendChild(name);
    list.appendChild(placeButton);

    shipList.appendChild(list);
  });

  const radioButtons = document.createElement('div')

  radioButtons.appendChild(createRadio('orientation', 'vertical', 'Vertical', true))
  radioButtons.appendChild(createRadio('orientation', 'horizontal', 'Horizontal'))

  radioButtons.querySelectorAll('input[name="orientation"]').forEach(input => {
    input.addEventListener('change', (e) => {
      isVertical = e.target.value === 'vertical';
      // Optionally, re-render hover effects if needed:
      const board = document.querySelector('.game-board');
      if (board) {
        board.remove();
        createBoard(currentGameboard);
        placementHover();
      }
    });
  });

  container.appendChild(title)
  container.appendChild(shipList)
  container.appendChild(radioButtons)
  parentContainer.appendChild(container)

  const placeButtons = document.querySelectorAll('.ships-choices-container ul *');
  placeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const placeBtn = button.querySelector('.place-button');
      const isPlaced = placeBtn ? placeBtn.classList.contains('disable') : false;

      const sizeStr = button.querySelector('p');
      const size = sizeStr ? Number(sizeStr.textContent.match(/\d+/)[0]) : '5';

      if (!isPlaced) {
        placeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentShipSize = size
      }
    });
  });
}

function createBoard(gameboard = currentGameboard, player = 'player-board') {
  const parentContainer = document.querySelector('.placing-container');
  const container = document.createElement('div');
  container.classList.add('game-board');
  container.classList.add(player);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('board-cell');

      // cell.dataset.row = i;
      // cell.dataset.col = j;
      // cell.addEventListener('click', () => {
      //   // Place the ship

      //   const vertical = selectedOrientation === 'vertical';
      //   const placed = gameboard.placeShip(
      //     parseInt(cell.dataset.row),
      //     parseInt(cell.dataset.col),
      //     vertical,
      //     selectedShip.size
      //   );
      //   if (placed) {
      //     // Optionally update UI to show the ship
      //     showOccupiedCells(player, gameboard.board);
      //   }
      // });
      container.appendChild(cell);
    }
  }

  parentContainer.appendChild(container);
}

function placementHover(player = 'player-board') {
  const board = document.querySelector(`.${player}`);
  const cells = board.querySelectorAll('.board-cell');

  cells.forEach((cell, idx) => {
    cell.addEventListener('mouseenter', () => {
      const row = Math.floor(idx / 10);
      const col = idx % 10;
      let valid = true;
      let hoverCells = [];

      for (let k = 0; k < currentShipSize; k++) {
        let hoverIdx;
        if (!isVertical) {
          if (col + currentShipSize > 10) { valid = false; break; }
          hoverIdx = row * 10 + (col + k);
        } else {
          if (row + currentShipSize > 10) { valid = false; break; }
          hoverIdx = (row + k) * 10 + col;
        }
        hoverCells.push(cells[hoverIdx]);
      }

      if (valid) hoverCells.forEach(c => c.classList.add('hover'));
    });

    cell.addEventListener('mouseleave', () => {
      cells.forEach(c => c.classList.remove('hover'));
    });
  });
}

function showOccupiedCells(player, array) {
  const board = document.querySelector(`.${player}`);
  const cells = board.querySelectorAll('.board-cell')

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellIndex = i * 10 + j;
      const cell = cells[cellIndex];

      if (array[i][j][1]) {
        cell.classList.add('occupied');
      } 
    }
  }
}

function addButtons() {
  const parentContainer = document.querySelector('main');
  const container = document.createElement('div');
  container.classList.add('start-buttons');

  const randomPlacementButton = document.createElement('button');
  randomPlacementButton.textContent = 'Place Randomly';
  randomPlacementButton.classList.add('place-randomly')
  randomPlacementButton.addEventListener('click', pubsub.emit('randomlyPlaceShips'))

  const clearAllButton = document.createElement('button');
  clearAllButton.textContent = 'Clear All';

  const startButton = document.createElement('button');
  startButton.textContent = 'Start Game';

  container.appendChild(randomPlacementButton);
  container.appendChild(clearAllButton);
  container.appendChild(startButton);

  parentContainer.appendChild(container);
}

const createRadio = (name, id, labelText, checked = false) => {
    const wrapper = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;    
    input.value = id;
    input.id = id;
    if (checked) input.checked = true;

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = labelText;

    wrapper.appendChild(input);
    wrapper.appendChild(label);
    return wrapper;
  };

let selectedShip = { name: 'Carrier', size: 5 };
let selectedOrientation = 'horizontal';

// Update these variables when the user selects a different ship or orientation

export default {
  initialize,
};