// const {GameController} = require('./gameController');
import { GameController } from './gameController';
import { Player } from './player';
// const {Player} = require('./player');

// const player1 = new Player('Player 1');
// const player2 = new Player('Player 2');

const game = new GameController('player1', 'player2');
game.startGame();
game.playRound(game.currentPlayer, game.player1 == game.currentPlayer? game.player1: game.player2, 0, 0);
