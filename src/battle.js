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
          if (isPlayerTurn) {
            const attack = board.receiveAttack(i, j)
            if (attack != null) {
              attack ? cell.classList.add('hit') : cell.classList.add('miss')
              isPlayerTurn = false;

              if (attack) {
                // check for enemy's sunken ship
                checkSunken(board, i, j, true);
              }

              // Enemy attack logic here

              let enemyAttackPlaced = null;
              let row, col;
              while (enemyAttackPlaced == null) {
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
                enemyAttackPlaced = playerBoard.receiveAttack(row, col);
              }
              const playerCells = document.querySelectorAll('.player-board .board-cell');
              const playerCell = playerCells[row * 10 + col];

              setTimeout(() => {
                enemyAttackPlaced ? playerCell.classList.add('hit') : playerCell.classList.add('miss');
                isPlayerTurn = true;

                if (enemyAttackPlaced) {
                  checkSunken(playerBoard, row, col, false)
                }

              }, 200);
            }
          }
        });
      } 

      container.appendChild(cell);
    }
  }
  parentContainer.appendChild(title);
  parentContainer.appendChild(container);
  return parentContainer
}

function checkSunken(board, x_coor, y_coor, isPlayer) {
  const ship = board.board[x_coor][y_coor][1]
  const isSunken = ship.isSunk();
  if (isSunken) {
    const target = isPlayer ? '.enemy-ships' : '.player-ships';
    document.querySelector(target).textContent = board.countRemainingShips();
    // update to sunken

    if (board.checkShips()) {
      console.log('winner')
    }
  }
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