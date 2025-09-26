import "./reset.css";
import "./styles.css";
import { initialize } from './update_dom'
import pubsub from './pubsub'
import Gameboard from "./gameboard";

let playerBoard = null

pubsub.on('newBoard', (newBoard) => {
  playerBoard = newBoard;
  initialize(newBoard);
})

pubsub.emit('newBoard', new Gameboard());
