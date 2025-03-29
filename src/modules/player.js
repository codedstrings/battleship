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

    // Method to automatically place ships randomly
    autoPlaceShips() {
        this.ships.forEach(ship => {
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const isVertical = Math.random() > 0.5;
                placed = this.gameboard.placeShip(ship, x, y, isVertical);
            }
        });
    }
}

exports.Player = Player;