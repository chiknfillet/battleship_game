import pubsub from './pubsub';
import Board from './gameboard';

let playerBoard = null;
let isPlayerTurn = true;

pubsub.on('newBoard', (board) => playerBoard = board);

function initialize() {
  const parentContainer = document.querySelector('main');
  const infoContainer = document.createElement('div')
  infoContainer.classList.add('info-container');

  const turn = document.createElement('h2');
  turn.textContent = 'Your Turn';
  turn.classList.add('turn');

  const feedback = document.createElement('p');
  feedback.textContent = 'Click on the enemy board to attack!';
  feedback.classList.add('feedback');

  const remainingShipsContainer = document.createElement('div')
  const playerShips = document.createElement('p');
  playerShips.innerHTML = 'Your Ships: <span class="player-ships">5</span>'
  const computerShips = document.createElement('p');
  computerShips.innerHTML = 'Enemy Ships: <span class="enemy-ships">5</span>'

  remainingShipsContainer.appendChild(playerShips);
  remainingShipsContainer.appendChild(computerShips);

  const boardsContainer = document.createElement('div') ;
  boardsContainer.classList.add('boards-container')
  boardsContainer.appendChild(createBoards(true, playerBoard));
  const enemyBoard = new Board();
  enemyBoard.placeShipsRandomly();
  boardsContainer.appendChild(createBoards(false, enemyBoard));

  infoContainer.appendChild(turn);
  infoContainer.appendChild(feedback);
  infoContainer.appendChild(remainingShipsContainer);
  parentContainer.appendChild(infoContainer);
  parentContainer.appendChild(boardsContainer);
}

function createBoards(isPlayer, board) {
  const parentContainer = document.createElement('div');
  const title = document.createElement('h3')
  title.textContent = isPlayer ? 'Your Board' : 'Enemy Board';

  const container = document.createElement('div');
  container.classList.add('game-board');
  container.classList.add( isPlayer ? 'player-board' : 'enemy-board')

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('board-cell');

      cell.dataset.row = i;
      cell.dataset.col = j;

      if(isPlayer && board.board[i][j][1]) {
        cell.classList.add('occupied')
      }

      if(!isPlayer) {
        cell.addEventListener('mouseenter', () => {
        cell.classList.add('hover')
        });
        cell.addEventListener('mouseleave', () => {
          cell.classList.remove('hover')
        });
        cell.addEventListener('click', () => {
          const attack = board.receiveAttack(i, j)
          if (attack != null) {
            attack ? cell.classList.add('hit') : cell.classList.add('miss')
            // Enemy attack logic here
          }
        });
      } 

      container.appendChild(cell);
    }
  }
  console.log(board.board)
  parentContainer.appendChild(title);
  parentContainer.appendChild(container);
  return parentContainer
}

function showHitCells(array, currentBoard) {
  const board = document.querySelector(`.player-board`);
  const cells = cellBoard.querySelectorAll('.board-cell')

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

export default initialize;