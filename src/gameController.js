const { Ship } = require('./ship.js');
const { Player } = require('./player.js');
class GameController {
    constructor(player1, player2) {
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
        this.currentPlayer = this.player1;
        this.winner = null;
        this.isGameOver = false;
    }

    placeShipsForPlayer(player){
        //hardcoded for now //todo: make it dynamic
        player.gameboard.placeShip(player.ships[0], 0, 0, false);
        player.gameboard.placeShip(player.ships[1], 0, 3, false);
        player.gameboard.placeShip(player.ships[2], 0, 6, false);
    }

    startGame() {
        //set up the game
        this.placeShipsForPlayer(this.player1);
        this.placeShipsForPlayer(this.player2);
        // while(!this.isGameOver){
        //     this.playRound(this.currentPlayer, this.currentPlayer === this.player1 ? this.player2 : this.player1, 0, 0);
        // }
    }

    playRound(player, opponent, x, y) {
        player.attack(opponent, x, y);
        if(opponent.gameboard.allSunk()){
            this.winner = player;
            this.isGameOver = true;
        }
        this.currentPlayer = this.currentPlayer === player ? opponent : player;
    }
}

exports.GameController = GameController;