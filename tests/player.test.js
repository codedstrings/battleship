const {Player} = require('../src/modules/player.js');
const { Ship } = require('../src/modules/ship.js');

describe('player', () => { 
    test('should have a gameboard', () => { 
        const player = new Player('player1'); 
        expect(player.gameboard).toBeDefined();
     });
    test('should have a name', () => { 
        const player = new Player('player1'); 
        expect(player.name).toBe('player1');
     });
    test('should be able to attack', () => { 
        const player1 = new Player('player1'); 
        const player2 = new Player('player2'); 
        player1.attack(player2, 0, 0); 
        expect(player2.gameboard.missedShots).toEqual([[0, 0]]);
     });
     test('should be able to attack and hit', () => { 
        const player1 = new Player('player1'); 
        const player2 = new Player('player2'); 
        const ship = new Ship(3);
        player2.gameboard.placeShip(ship, 0, 0, false);

        player1.attack(player2, 0, 0); 
        expect(player2.gameboard.allShips[0].getHits()).toBe(1);
     });
 });