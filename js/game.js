class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.startButton = document.getElementById('startButton');
        
        this.initGame();
        this.setupControls();
        this.gameLoop();
    }
    
    initGame() {
        this.gameMap = new GameMap();
        this.player = new Player(1, 1);
        this.score = 0;
        this.gameWon = false;
        this.updateScore();
    }
    
    setupControls() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.player.setDirection('up');
                    break;
                case 'ArrowDown':
                    this.player.setDirection('down');
                    break;
                case 'ArrowLeft':
                    this.player.setDirection('left');
                    break;
                case 'ArrowRight':
                    this.player.setDirection('right');
                    break;
            }
        });
        
        this.startButton.addEventListener('click', () => {
            this.restartGame();
        });
        
        this.setupTouchControls();
    }
    
    setupTouchControls() {
        const upBtn = document.getElementById('upBtn');
        const downBtn = document.getElementById('downBtn');
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        
        const addTouchEvents = (button, direction) => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.player.setDirection(direction);
            });
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.player.setDirection(direction);
            });
        };
        
        addTouchEvents(upBtn, 'up');
        addTouchEvents(downBtn, 'down');
        addTouchEvents(leftBtn, 'left');
        addTouchEvents(rightBtn, 'right');
    }
    
    restartGame() {
        this.initGame();
    }
    
    update() {
        if (this.gameWon) return;
        
        this.player.update(this.gameMap);
        
        if (this.gameMap.collectDot(this.player.gridX, this.player.gridY)) {
            this.score += 10;
            this.updateScore();
            
            if (this.gameMap.getAllDotsCollected()) {
                this.gameWon = true;
                this.showWinMessage();
            }
        }
    }
    
    render() {
        this.ctx.fillStyle = COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        this.gameMap.render(this.ctx);
        this.player.render(this.ctx);
        
        if (this.gameWon) {
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('ゲームクリア！', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        }
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
    }
    
    showWinMessage() {
        setTimeout(() => {
            alert('おめでとうございます！全てのドットを集めました！\nSTARTボタンで再開できます。');
        }, 100);
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

window.addEventListener('load', () => {
    new Game();
});