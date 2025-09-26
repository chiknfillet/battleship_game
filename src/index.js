import "./reset.css";
import "./styles.css";
import { initialize } from './update_dom'
import Gameboard from "./gameboard";

const playerBoard = new Gameboard();

initialize(playerBoard);