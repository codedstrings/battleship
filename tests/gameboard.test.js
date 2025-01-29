
const {GameBoard} = require('../src/gameboard');
const { Ship } = require('../src/ship');

describe('Gameboard', () => {
    test('can place ship horizontally', () => {
      const gameboard = new GameBoard();
      const ship = new Ship(3);
      expect(gameboard.placeShip(ship, 0, 0, false)).toBe(true);
      expect(gameboard.board[0][0]).toBe(ship);
      expect(gameboard.board[0][1]).toBe(ship);
      expect(gameboard.board[0][2]).toBe(ship);
    });
  
    test('prevents invalid placement', () => {
      const gameboard = new GameBoard();
      const ship = new Ship(3);
      expect(gameboard.placeShip(ship, 9, 9, false)).toBe(false);
    });
  });