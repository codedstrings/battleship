const {GameController} = require('../src/gameController');
const {Player} = require('../src/player');

describe('GameController:', () => { 
    describe('basic Tests:', () => { 
        let player1, player2, game;
        beforeEach(() => {
            player1 = new Player('Player 1');
            player2 = new Player('Player 2');
            game = new GameController(player1, player2);
        });
        test('should have 2 players', () => {
            expect(game.player1).toEqual(player1);
            expect(game.player2).toBe(player2);
        });
        test('should have a currentPlayer', () => {
            expect(game.currentPlayer).toBe(player1);
        });
        test('Each player should have a gameboard', () => {
            expect(player1.gameboard).toBeDefined();
            expect(player2.gameboard).toBeDefined();
        });
        test('Each player should have 3 ships on board after game starts', () => {
            game.startGame();
            expect(player1.gameboard.allShips.length).toBe(3);
            expect(player2.gameboard.allShips.length).toBe(3);
        });
     })
 });
