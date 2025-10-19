class Game2048 {
    constructor() {
        this.boardSize = 4;
        this.board = [];
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
        this.gameWon = false;
        this.gameOver = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateBestScore();
        this.newGame();
    }

    initializeElements() {
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score');
        this.bestScoreElement = document.getElementById('best-score');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.boardSizeSelect = document.getElementById('board-size');
        this.gameOverlay = document.getElementById('game-overlay');
        this.overlayTitle = document.getElementById('overlay-title');
        this.overlayMessage = document.getElementById('overlay-message');
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            const keyMap = {
                'ArrowUp': 'up',
                'ArrowDown': 'down',
                'ArrowLeft': 'left',
                'ArrowRight': 'right',
                'KeyW': 'up',
                'KeyS': 'down',
                'KeyA': 'left',
                'KeyD': 'right'
            };
            
            const direction = keyMap[e.code];
            if (direction) {
                e.preventDefault();
                this.move(direction);
            }
        });

        // Button controls
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.restartBtn.addEventListener('click', () => this.newGame());
        
        // Board size change
        this.boardSizeSelect.addEventListener('change', (e) => {
            this.boardSize = parseInt(e.target.value);
            this.newGame();
        });
    }

    newGame() {
        this.board = this.createEmptyBoard();
        this.score = 0;
        this.gameWon = false;
        this.gameOver = false;
        this.updateScore();
        this.updateBestScore();
        this.hideOverlay();
        this.addRandomTile();
        this.addRandomTile();
        this.render();
    }

    createEmptyBoard() {
        return Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0));
    }

    addRandomTile() {
        const emptyCells = [];
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            // 90% chance for 2, 10% chance for 4
            this.board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    move(direction) {
        // Create a deep copy of the current board
        const oldBoard = this.board.map(row => [...row]);
        let moved = false;

        switch (direction) {
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
        }

        // Only proceed if the board actually changed
        if (moved) {
            this.addRandomTile();
            this.render();
            this.updateScore();
            
            if (this.checkWin() && !this.gameWon) {
                this.showWin();
            } else if (this.checkGameOver()) {
                this.showGameOver();
            }
        }
        // If no move was made, do nothing (don't add tile, don't check game over)
    }

    moveLeft() {
        let moved = false;
        for (let row = 0; row < this.boardSize; row++) {
            const result = this.slideAndMerge(this.board[row]);
            if (!this.arraysEqual(this.board[row], result)) {
                moved = true;
            }
            this.board[row] = result;
        }
        return moved;
    }

    moveRight() {
        let moved = false;
        for (let row = 0; row < this.boardSize; row++) {
            const reversed = [...this.board[row]].reverse();
            const result = this.slideAndMerge(reversed);
            result.reverse();
            if (!this.arraysEqual(this.board[row], result)) {
                moved = true;
            }
            this.board[row] = result;
        }
        return moved;
    }

    moveUp() {
        let moved = false;
        for (let col = 0; col < this.boardSize; col++) {
            const column = [];
            for (let row = 0; row < this.boardSize; row++) {
                column.push(this.board[row][col]);
            }
            
            const result = this.slideAndMerge(column);
            
            for (let row = 0; row < this.boardSize; row++) {
                if (this.board[row][col] !== result[row]) {
                    moved = true;
                }
                this.board[row][col] = result[row];
            }
        }
        return moved;
    }

    moveDown() {
        let moved = false;
        for (let col = 0; col < this.boardSize; col++) {
            const column = [];
            for (let row = this.boardSize - 1; row >= 0; row--) {
                column.push(this.board[row][col]);
            }
            
            const result = this.slideAndMerge(column);
            
            for (let row = 0; row < this.boardSize; row++) {
                if (this.board[this.boardSize - 1 - row][col] !== result[row]) {
                    moved = true;
                }
                this.board[this.boardSize - 1 - row][col] = result[row];
            }
        }
        return moved;
    }

    slideAndMerge(array) {
        // Remove zeros
        const filtered = array.filter(val => val !== 0);
        
        // Merge adjacent equal values
        const merged = [];
        for (let i = 0; i < filtered.length; i++) {
            if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                const mergedValue = filtered[i] * 2;
                merged.push(mergedValue);
                this.score += mergedValue;
                i++; // Skip next element
            } else {
                merged.push(filtered[i]);
            }
        }
        
        // Pad with zeros
        while (merged.length < this.boardSize) {
            merged.push(0);
        }
        
        return merged;
    }

    arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    checkWin() {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }

    checkGameOver() {
        // Check if there are empty cells
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 0) {
                    return false;
                }
            }
        }

        // Check if any adjacent cells can merge
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const current = this.board[row][col];
                
                // Check right neighbor
                if (col < this.boardSize - 1 && this.board[row][col + 1] === current) {
                    return false;
                }
                
                // Check bottom neighbor
                if (row < this.boardSize - 1 && this.board[row + 1][col] === current) {
                    return false;
                }
            }
        }

        return true;
    }

    showWin() {
        this.gameWon = true;
        this.overlayTitle.textContent = 'You Win!';
        this.overlayMessage.textContent = 'Congratulations! You reached 2048!';
        this.showOverlay();
    }

    showGameOver() {
        this.gameOver = true;
        this.overlayTitle.textContent = 'Game Over!';
        this.overlayMessage.textContent = 'No more moves available. Try again!';
        this.showOverlay();
    }

    showOverlay() {
        this.gameOverlay.classList.add('show');
    }

    hideOverlay() {
        this.gameOverlay.classList.remove('show');
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
        
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
            this.updateBestScore();
        }
    }

    updateBestScore() {
        this.bestScoreElement.textContent = this.bestScore;
    }

    render() {
        // Update board size class
        this.gameBoard.className = `game-board grid-${this.boardSize}`;
        
        // Clear existing tiles
        this.gameBoard.innerHTML = '';
        
        // Create cells
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                this.gameBoard.appendChild(cell);
                
                // Add tile if cell has value
                if (this.board[row][col] !== 0) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${this.board[row][col]}`;
                    tile.textContent = this.board[row][col];
                    cell.appendChild(tile);
                }
            }
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});