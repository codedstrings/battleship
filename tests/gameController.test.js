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
       
     });

    describe('Game logic:', () => {
        //hardcoded coordinates for now: 
        // player.gameboard.placeShip(this.ships[0], 0, 0, false);
        // player.gameboard.placeShip(this.ships[1], 0, 3, false);
        // player.gameboard.placeShip(this.ships[2], 0, 6, false);
        let player1Name, player2Name, game;
        beforeEach(() => {
            player1Name = 'player1';
            player2Name = 'player2';
            game = new GameController(player1Name, player2Name);
            game.startGame();
        });
        test('should switch current player after each round', () => {
            game.playRound(0, 0);
            expect(game.currentPlayer).toBe(game.player2);

            game.playRound(1, 1);
            expect(game.currentPlayer).toBe(game.player1);

            game.playRound(9, 0);
            expect(game.currentPlayer).toBe(game.player2);
        });
        test('should hit the opponents ship when attacked correctly', () => {
            game.playRound(0, 0);
            //opponents ship should be hit
            expect(game.player2.gameboard.allShips[0].hits).toBe(1);
            //players ship should not be hit
            expect(game.player1.gameboard.allShips[0].hits).toBe(0);
        });
        test('should miss the ship when attacked wrong', () => {
            game.playRound(1, 1);
            expect(game.player2.gameboard.missedShots.length).toBe(1);
            //both players ship should not be hit
            expect(game.player1.gameboard.allShips[0].hits).toBe(0);
            expect(game.player2.gameboard.allShips[0].hits).toBe(0);
        });
        test('should only switch player after a miss', () => {
           //todo
        });
    });

    describe('edgeCases', () => { 
        test('game should not allow attacks outside the board', () => {
            const game = new GameController('player1', 'player2');
            game.startGame();
            expect(()=>{game.playRound(10, 10)}).toThrow('Invalid attack coordinates');
            expect(()=>{game.playRound(-1, 0)}).toThrow('Invalid attack coordinates');
            expect(()=>{game.playRound(0, -1)}).toThrow('Invalid attack coordinates');
            expect(()=>{game.playRound(0, 10)}).toThrow('Invalid attack coordinates');
        });
     })
 });
