const {GameBoard} = require('./gameboard');
const {Ship} = require('./ship');
class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new GameBoard();
        this.ships = [
            new Ship(3),
            new Ship(2),
            new Ship(1)
        ]
    }

    attack(opponent, x, y) {
        opponent.gameboard.receiveAttack(x, y);
    }
}
exports.Player = Player;