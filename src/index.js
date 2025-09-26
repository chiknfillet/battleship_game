import "./reset.css";
import "./styles.css";
import { initialize } from './update_dom'
import pubsub from './pubsub'
import Gameboard from "./gameboard";

let playerBoard = null

pubsub.on('newBoard', () => {
  playerBoard = new Gameboard();
  initialize(playerBoard);
})

pubsub.emit('newBoard');
