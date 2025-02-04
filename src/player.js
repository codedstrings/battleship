const {GameBoard} = require('./gameboard');
class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new GameBoard();
    }

    attack(opponent, x, y) {
        opponent.gameboard.receiveAttack(x, y);
    }
}
exports.Player = Player;