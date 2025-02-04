const {GameController} = require('../src/gameController');
const {Player} = require('../src/player');

describe('GameController:', () => { 
    describe('basic Tests:', () => { 
        let player1Name, player2Name, game;
        beforeEach(() => {
            player1Name = 'player1';
            player2Name = 'player2';
            game = new GameController(player1Name, player2Name);
        });
        test('should have 2 players', () => {
            expect(game.player1.name).toBe(player1Name);
            expect(game.player2.name).toBe(player2Name);
        });
        test('should have a currentPlayer', () => {
            expect(game.currentPlayer).toBe(game.player1);
        });
        test('Each player should have a gameboard', () => {
            expect(game.player1.gameboard).toBeDefined();
            expect(game.player2.gameboard).toBeDefined();
        });
        test('Each player should have 3 ships on board after game starts', () => {
            game.startGame();
            expect(game.player1.gameboard.allShips.length).toBe(3);
            expect(game.player2.gameboard.allShips.length).toBe(3);
        });
     })
 });
