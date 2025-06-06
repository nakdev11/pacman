class GameMap {
    constructor() {
        this.maze = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,1,1,0,1,0,1],
            [1,0,1,0,1,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ];
        
        this.dots = [];
        this.initializeDots();
    }
    
    initializeDots() {
        for (let y = 0; y < MAZE_HEIGHT; y++) {
            for (let x = 0; x < MAZE_WIDTH; x++) {
                if (this.maze[y][x] === 0 && !(x === 1 && y === 1)) {
                    this.dots.push({x: x, y: y, collected: false});
                }
            }
        }
    }
    
    isWall(x, y) {
        if (x < 0 || x >= MAZE_WIDTH || y < 0 || y >= MAZE_HEIGHT) {
            return true;
        }
        return this.maze[y][x] === 1;
    }
    
    collectDot(x, y) {
        const dot = this.dots.find(d => d.x === x && d.y === y && !d.collected);
        if (dot) {
            dot.collected = true;
            return true;
        }
        return false;
    }
    
    getAllDotsCollected() {
        return this.dots.every(dot => dot.collected);
    }
    
    render(ctx) {
        for (let y = 0; y < MAZE_HEIGHT; y++) {
            for (let x = 0; x < MAZE_WIDTH; x++) {
                const pixelPos = gridToPixel(x, y);
                
                if (this.maze[y][x] === 1) {
                    ctx.fillStyle = COLORS.WALL;
                    ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
                }
            }
        }
        
        this.dots.forEach(dot => {
            if (!dot.collected) {
                const pixelPos = gridToPixel(dot.x, dot.y);
                ctx.fillStyle = COLORS.DOT;
                ctx.beginPath();
                ctx.arc(pixelPos.x, pixelPos.y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
}