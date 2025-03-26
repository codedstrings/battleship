
const {GameBoard} = require('../src/modules/gameboard');
const { Ship } = require('../src/modules/ship');

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

    describe('allSunk', ()=>{
      let gameboard, ship1, ship2;
      beforeEach(()=>{
        gameboard = new GameBoard();
        ship1 = new Ship(3);
        ship2 = new Ship(3);
        gameboard.placeShip(ship1, 0, 0, false);
        gameboard.placeShip(ship2, 1, 0, false);
      });

      test('returns true when all ships are sunk', ()=>{
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 1);
        gameboard.receiveAttack(0, 2);
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(1, 1);
        gameboard.receiveAttack(1, 2);
        expect(gameboard.allSunk()).toBe(true);
      });

      test('returns false when not all ships are sunk', ()=>{
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 1);
        gameboard.receiveAttack(0, 2);
        expect(gameboard.allSunk()).toBe(false);
      });

      test('returns false when no ships are sunk', ()=>{
        expect(gameboard.allSunk()).toBe(false);
      });
    });

    describe('isPlacementValid', ()=>{
      test('prevents overlapping placement', () => {
        const gameboard = new GameBoard();
        const ship1 = new Ship(3);
        const ship2 = new Ship(3);
        gameboard.placeShip(ship1, 0, 0, false);
        expect(gameboard.placeShip(ship2, 0, 0, false)).toBe(false);
      });
      
      test('prevents half overlapping placement', () => {
        const gameboard = new GameBoard();
        const ship1 = new Ship(3);
        const ship2 = new Ship(3);
        gameboard.placeShip(ship1, 0, 2, false);
        expect(gameboard.placeShip(ship2, 0, 0, false)).toBe(false);
        
        //CHECK IF SHIP 2 IS NOT PLACED
        expect(gameboard.board[0][0]).toBe(null);
        expect(gameboard.board[0][1]).toBe(null);
        expect(gameboard.board[0][2]).toBe(ship1);
      });
      
      //todo: work on this case later
      // test('prevents adjascent placement', () => {
      //   const gameboard = new GameBoard();
      //   const ship1 = new Ship(3);
      //   const ship2 = new Ship(3);
      //   gameboard.placeShip(ship1, 0, 0, false);
      //   expect(gameboard.placeShip(ship2, 0, 3, false)).toBe(false);
      // });

      test('prevents wrapping around the board- vertical', () => {
        const gameboard = new GameBoard();
        const ship = new Ship(3);
        expect(gameboard.placeShip(ship, 9, 9, true)).toBe(false);
      });

      test('prevents wrapping around the board- horizontal', () => {
        const gameboard = new GameBoard();
        const ship = new Ship(3);
        expect(gameboard.placeShip(ship, 9, 9, false)).toBe(false);
      });
      
    });
    
    describe('Recieve Attacks', () => { 
      let gameboard, ship;
      beforeEach(()=>{
        gameboard = new GameBoard();
        ship = new Ship(3);
        gameboard.placeShip(ship, 0, 0, false);
      });

      test('should miss the ship when attacked wrong', () => {
        gameboard.receiveAttack(1, 1);
        expect(gameboard.missedShots.length).toBe(1);
        expect(ship.getHits()).toBe(0);
      });
      test('should throw error for out of board attacks',()=>{
        expect(()=>gameboard.receiveAttack(10, 10)).toThrow('Invalid attack coordinates');
        expect(()=>gameboard.receiveAttack(-1, 0)).toThrow('Invalid attack coordinates');
        expect(()=>gameboard.receiveAttack(0, -1)).toThrow('Invalid attack coordinates');
        expect(()=>gameboard.receiveAttack(0, 10)).toThrow('Invalid attack coordinates');
        expect(()=>gameboard.receiveAttack(10, 0)).toThrow('Invalid attack coordinates');
      });
      test('should not allow attacking the same coordinates',()=>{
        gameboard.receiveAttack(1, 1);
        expect(()=>gameboard.receiveAttack(1,1)).toThrow('Invalid attack coordinates');
      });
    });
});