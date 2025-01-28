// Import the Ship class
const { Ship } = require('../src/ship');

describe('Ship Class', () => {
    test('should create a ship with the correct length', () => {
      const ship = new Ship(3);
      expect(ship.length).toBe(3);
    });

    test('should increase hits when hit is called', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.getHits()).toBe(1);
    });

    test('should set isSunk to true when hits equal length', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk).toBe(true);
    });

    test('should not sink if hits are less than length', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.isSunk).toBe(false);
    });
});
