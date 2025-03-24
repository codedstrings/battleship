import { GameController } from './modules/gameController.js';
import { GameUI } from './modules/ui.js';
import './styles.css';

window.addEventListener('DOMContentLoaded', () => {
    window.gameUI = new GameUI();
});