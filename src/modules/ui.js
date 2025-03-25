import { GameController } from "./gameController";

export class GameUI {
    constructor() {
        this.game = new GameController('Player', 'Computer');
        this.playerBoard = document.getElementById('player-board');
        this.enemyBoard = document.getElementById('enemy-board');
        this.statusElement = document.getElementById('status');
        this.gameOverElement = document.getElementById('game-over');
        this.winnerTextElement = document.getElementById('winner-text');
        this.restartButton = document.getElementById('restart-btn');
        
        this.initialize();
    }

    initialize() {
        this.game.startGame();
        this.createBoards();
        this.attachEventListeners();
        this.updateDisplay();
    }

    createBoards() {
        // Clear existing boards
        this.playerBoard.innerHTML = '';
        this.enemyBoard.innerHTML = '';

        // Create 10x10 grid for each board
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const playerCell = this.createCell(i, j, true);
                const enemyCell = this.createCell(i, j, false);
                
                this.playerBoard.appendChild(playerCell);
                this.enemyBoard.appendChild(enemyCell);
            }
        }
    }

    createCell(x, y, isPlayerBoard) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.classList.add('hoverClass');
        cell.dataset.x = x;
        cell.dataset.y = y;

        if (isPlayerBoard) {
            // Show ships on player's board
            const ship = this.game.player1.gameboard.board[x][y];
            if (ship) {
                cell.classList.add('ship');
            }
        } else {
            // Add click event for enemy board
            cell.addEventListener('click', () => this.handleCellClick(x, y));
        }

        return cell;
    }

    handleCellClick(x, y) {
        if (this.game.isGameOver) return;
        
        try {
            this.game.playRound(x, y);
            this.updateDisplay();
            
            if (this.game.isGameOver) {
                this.showGameOver();
            }
        } catch (error) {
            console.log('Invalid move:', error.message);
        }
    }

    updateDisplay() {
        this.updateBoard(this.playerBoard, this.game.player1.gameboard);
        this.updateBoard(this.enemyBoard, this.game.player2.gameboard);
        
        this.statusElement.textContent = this.game.currentPlayer === this.game.player1 ? 
            'Your turn' : 'Computer\'s turn';
    }

    updateBoard(boardElement, gameboard) {
        const cells = boardElement.getElementsByClassName('cell');
        
        for (let i = 0; i < cells.length; i++) {
            const x = parseInt(cells[i].dataset.x);
            const y = parseInt(cells[i].dataset.y);
            
            // Check for hits
            if (gameboard.allHits.some(([hitX, hitY]) => hitX === x && hitY === y)) {
                cells[i].classList.add('hit');
                cells[i].classList.remove('hoverClass');
            }
            
            // Check for misses
            if (gameboard.missedShots.some(([missX, missY]) => missX === x && missY === y)) {
                cells[i].classList.add('miss');
                cells[i].classList.remove('hoverClass');
            }
        }
    }

    showGameOver() {
        const winner = this.game.winner === this.game.player1 ? 'Player' : 'Computer';
        this.winnerTextElement.textContent = `${winner} wins!`;
        this.gameOverElement.classList.add('active');
    }

    attachEventListeners() {
        this.restartButton.addEventListener('click', () => {
            this.game = new GameController('Player', 'Computer');
            this.gameOverElement.classList.remove('active');
            this.initialize();
        });
    }
}

