import pubsub from './pubsub'

function initialize() {
  pubsub.emit('changeMain', renderPlacingUI);
}

function renderPlacingUI() {
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
  playerBoard();
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
  
  ships.forEach((ship) => {
    const list = document.createElement('li')

    const name = document.createElement('p');
    name.textContent = `${ship.name} (${ship.size})`;

    const placeButton = document.createElement('button');
    placeButton.classList.add('place-button')
    placeButton.textContent = 'Place';


    list.appendChild(name);
    list.appendChild(placeButton);

    shipList.appendChild(list);
  });

  const radioButtons = document.createElement('div')

  radioButtons.appendChild(createRadio('orientation', 'vertical', 'Vertical', true))
  radioButtons.appendChild(createRadio('orientation', 'horizontal', 'Horizontal'))

  container.appendChild(title)
  container.appendChild(shipList)
  container.appendChild(radioButtons)
  parentContainer.appendChild(container)
}

function playerBoard() {
  const parentContainer = document.querySelector('.placing-container');
  const container = document.createElement('div');
  container.classList.add('game-board')

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('board-cell')

      container.appendChild(cell)
    }
  }

  parentContainer.appendChild(container)
}

function addButtons() {
  const parentContainer = document.querySelector('main');
  const container = document.createElement('div');
  container.classList.add('start-buttons');

  const randomPlacementButton = document.createElement('button');
  randomPlacementButton.textContent = 'Place Randomly';

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

export default {
  initialize,
};