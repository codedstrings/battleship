// const { Player } = require('./player');
import { Player } from "./player";

class ComputerPlayer extends Player {
    constructor() {
        super('Computer');
        this.previousMoves = new Set(); // Track moves to avoid repeats
    }

    generateRandomCoordinate() {
        return Math.floor(Math.random() * 10);
    }

    makeRandomMove(opponent) {
        let x, y;
        do {
            x = this.generateRandomCoordinate();
            y = this.generateRandomCoordinate();
        } while (this.previousMoves.has(`${x},${y}`));

        this.previousMoves.add(`${x},${y}`);
        this.attack(opponent, x, y);
        return [x, y];
    }

    // Method to automatically place ships randomly
    autoPlaceShips() {
        this.ships.forEach(ship => {
            let placed = false;
            while (!placed) {
                const x = this.generateRandomCoordinate();
                const y = this.generateRandomCoordinate();
                const isVertical = Math.random() > 0.5;
                placed = this.gameboard.placeShip(ship, x, y, isVertical);
            }
        });
    }
}

export default ComputerPlayer;