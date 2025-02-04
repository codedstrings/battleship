const {GameBoard} = require('./gameboard');
class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new GameBoard();
    }
}
exports.Player = Player;