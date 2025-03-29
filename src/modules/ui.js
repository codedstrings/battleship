import { ComputerPlayer } from "./computerPlayer";
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
        
        //elements for ship placement
        this.shipSelectionModal = this.createShipSelectionModal();
        this.shipPlacementModal = this.createShipPlacementModal();
        this.currentShipIndex = 0;
        this.isPlacingShips = true;
        this.isVertical = false; // false: horizontal, true: vertical

        this.initialize();
    }

    createShipSelectionModal() {
        const modal = document.createElement('div');
        modal.id = 'ship-selection-modal';
        modal.className = 'ship-placement-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Ship Placement</h2>
                <p>How would you like to place your ships?</p>
                <div class="placement-controls">
                    <button id="manual-placement-btn">Place Manually</button>
                    <button id="random-placement-btn">Random Placement</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners
        const manualBtn = modal.querySelector('#manual-placement-btn');
        manualBtn.addEventListener('click', () => this.startManualPlacement());

        const randomBtn = modal.querySelector('#random-placement-btn');
        randomBtn.addEventListener('click', () => this.randomizeShipPlacement());

        return modal;
    }

    createShipPlacementModal() {
        const modal = document.createElement('div');
        modal.id = 'ship-placement-modal';
        modal.className = 'ship-placement-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Place Your Ships</h2>
                <p id="ship-placement-instructions">Place your ship</p>
                <div class="placement-controls">
                    <button id="horizontal-btn">Horizontal</button>
                    <button id="vertical-btn">Vertical</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners
        const horizontalBtn = modal.querySelector('#horizontal-btn');
        horizontalBtn.addEventListener('click', () => this.setShipOrientation(false));

        const verticalBtn = modal.querySelector('#vertical-btn');
        verticalBtn.addEventListener('click', () => this.setShipOrientation(true));

        return modal;
    }

    startManualPlacement() {
        this.shipSelectionModal.classList.remove('active');
        this.showShipPlacementModal();
    }

    showShipPlacementModal() {
        this.updateShipPlacementInstructions();
        this.shipPlacementModal.classList.add('active');
    }

    setShipOrientation(isVertical) {
        this.isVertical = isVertical;
        this.shipPlacementModal.classList.remove('active');
        
        // Enable board click for ship placement
        const playerCells = this.playerBoard.getElementsByClassName('cell');
        Array.from(playerCells).forEach(cell => {
            cell.classList.add('placeable');
        });
    }

    updateShipPlacementInstructions() {
        const instructionsElement = document.getElementById('ship-placement-instructions');
        const currentShip = this.game.player1.ships[this.currentShipIndex];
        instructionsElement.textContent = `Place your ship of length ${currentShip.length}`;
    }

    randomizeShipPlacement() {
        this.shipSelectionModal.classList.remove('active');
        
        // Clear existing ship placements
        this.game.player1.gameboard.board = Array(10).fill(null).map(() => Array(10).fill(null));
        this.game.player1.gameboard.allShips = [];

        // Use computer's auto placement method
        this.game.player1.autoPlaceShips();
        this.createBoards();
        
        // Complete ship placement
        this.completeShipPlacement();
    }

    initialize() {
        this.game.startGame();
        this.createBoards();
        this.attachEventListeners();
        this.startShipPlacement();
    }

    startShipPlacement() {
        this.isPlacingShips = true;
        this.shipSelectionModal.classList.add('active');
        this.currentShipIndex = 0;
    }

    handleShipPlacement(e) {
        if (!this.isPlacingShips || !e.target.classList.contains('placeable')) return;

        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        const currentShip = this.game.player1.ships[this.currentShipIndex];

        // Attempt to place the ship
        const placed = this.game.player1.gameboard.placeShip(
            currentShip, 
            x, 
            y, 
            this.isVertical
        );

        if (placed) {
            this.createBoards(); // Refresh board to show new ship
            this.currentShipIndex++;

            // Check if all ships are placed
            if (this.currentShipIndex >= this.game.player1.ships.length) {
                this.completeShipPlacement();
            } else {
                this.startManualPlacement();
            }
        } else {
            alert('Invalid ship placement. Try again.');
        }
    }

    completeShipPlacement() {
        this.isPlacingShips = false;
        
        // Remove placeable class
        const playerCells = this.playerBoard.getElementsByClassName('cell');
        Array.from(playerCells).forEach(cell => {
            cell.classList.remove('placeable');
        });
        
        // Place computer ships randomly
        if (this.game.player2 instanceof ComputerPlayer) {
            this.game.player2.autoPlaceShips();
        }
        
        this.createBoards();
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

        // Add click event for manual ship placement
        if (this.isPlacingShips) {
            const playerCells = this.playerBoard.getElementsByClassName('cell');
            Array.from(playerCells).forEach(cell => {
                cell.addEventListener('click', (e) => this.handleShipPlacement(e));
            });
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

    // Rest of the methods remain the same as in the previous implementation
    handleCellClick(x, y) {
        if (this.isPlacingShips || this.game.isGameOver) return;
        
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