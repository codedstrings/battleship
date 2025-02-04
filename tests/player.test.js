const {Player} = require('../src/player.js');

describe('player', () => { 
    test('should have a gameboard', () => { 
        const player = new Player('player1'); 
        expect(player.gameboard).toBeDefined();
     });
    test('should have a name', () => { 
        const player = new Player('player1'); 
        expect(player.name).toBe('player1');
     });
 });