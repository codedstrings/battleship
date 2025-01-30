
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

    test('can place ship vertically', () => {
      const gameboard = new GameBoard();
      const ship = new Ship(3);
      expect(gameboard.placeShip(ship, 0, 0, true)).toBe(true);
      expect(gameboard.board[0][0]).toBe(ship);
      expect(gameboard.board[1][0]).toBe(ship);
      expect(gameboard.board[2][0]).toBe(ship);
    });
  
    test('prevents invalid placement', () => {
      const gameboard = new GameBoard();
      const ship = new Ship(3);
      expect(gameboard.placeShip(ship, 9, 9, false)).toBe(false);
    });

    test('can receive attacks', ()=>{
      const gameboard = new GameBoard();
      const ship = new Ship(3);
      gameboard.placeShip(ship, 0, 0, false);
      gameboard.receiveAttack(0, 0);
      expect(ship.getHits()).toBe(1);
    
      gameboard.receiveAttack(0, 1);
      expect(ship.getHits()).toBe(2);

      gameboard.receiveAttack(0, 2);
      expect(ship.getHits()).toBe(3);

      expect(ship.isSunk).toBe(true);
    });

    test('can receive missed attacks', ()=>{
      const gameboard = new GameBoard();
      const ship = new Ship(3);
      gameboard.placeShip(ship, 0, 0, false);
      gameboard.receiveAttack(1, 0);
      expect(gameboard.missedShots).toEqual([[1, 0]]);
    });
  });