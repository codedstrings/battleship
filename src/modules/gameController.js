const { Ship } = require('./ship.js');
const { Player } = require('./player.js');
const { ComputerPlayer } = require('./computerPlayer.js');
class GameController {
    constructor(player1, player2) {
        this.player1 = new Player(player1);
        this.player2 = player2 === 'Computer' ? new ComputerPlayer(player2) : new Player(player2);
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

    playRound(x, y) {
        const opponent = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    
        // Player attacks first
        this.currentPlayer.attack(opponent, x, y);
        
        if (opponent.gameboard.allSunk()) {
            this.winner = this.currentPlayer;
            this.isGameOver = true;
            return; // Stop the game if the player wins
        }
    
        // Switch turn
        this.currentPlayer = opponent;
    
        // If the computer is playing, it should attack automatically
        if (this.currentPlayer.name === "Computer") {
                if (typeof this.currentPlayer.makeRandomMove === "function") {
                    const [compX, compY] = this.currentPlayer.makeRandomMove(this.player1);
                    console.log(`Computer attacks at ${compX}, ${compY}`);
                } 
    
                if (this.player1.gameboard.allSunk()) {
                    this.winner = this.currentPlayer;
                    this.isGameOver = true;
                }
                // Switch back to player
                this.currentPlayer = this.player1;
        }
    }
    
}

exports.GameController = GameController;