class Player {
    constructor(x, y) {
        this.gridX = x;
        this.gridY = y;
        this.pixelX = x * GRID_SIZE + GRID_SIZE / 2;
        this.pixelY = y * GRID_SIZE + GRID_SIZE / 2;
        this.targetX = this.pixelX;
        this.targetY = this.pixelY;
        this.direction = 'right';
        this.nextDirection = null;
        this.mouthOpen = true;
        this.animationTimer = 0;
        this.speed = 4;
        this.isMoving = false;
        this.hasStarted = false;
    }
    
    update(gameMap) {
        this.animationTimer++;
        if (this.animationTimer >= 10) {
            this.mouthOpen = !this.mouthOpen;
            this.animationTimer = 0;
        }
        
        if (this.isMoving) {
            this.moveToTarget();
        } else if (this.hasStarted) {
            if (this.nextDirection) {
                const nextPos = this.getNextGridPosition(this.nextDirection);
                if (!gameMap.isWall(nextPos.x, nextPos.y)) {
                    this.direction = this.nextDirection;
                    this.nextDirection = null;
                }
            }
            
            const nextPos = this.getNextGridPosition(this.direction);
            if (!gameMap.isWall(nextPos.x, nextPos.y)) {
                this.startMoveTo(nextPos.x, nextPos.y);
            }
        }
    }
    
    startMoveTo(gridX, gridY) {
        this.targetX = gridX * GRID_SIZE + GRID_SIZE / 2;
        this.targetY = gridY * GRID_SIZE + GRID_SIZE / 2;
        this.isMoving = true;
    }
    
    moveToTarget() {
        const dx = this.targetX - this.pixelX;
        const dy = this.targetY - this.pixelY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= this.speed) {
            this.pixelX = this.targetX;
            this.pixelY = this.targetY;
            this.gridX = Math.round((this.pixelX - GRID_SIZE / 2) / GRID_SIZE);
            this.gridY = Math.round((this.pixelY - GRID_SIZE / 2) / GRID_SIZE);
            this.isMoving = false;
        } else {
            this.pixelX += (dx / distance) * this.speed;
            this.pixelY += (dy / distance) * this.speed;
        }
    }
    
    getNextGridPosition(direction) {
        let nextX = this.gridX;
        let nextY = this.gridY;
        
        switch (direction) {
            case 'up':
                nextY--;
                break;
            case 'down':
                nextY++;
                break;
            case 'left':
                nextX--;
                break;
            case 'right':
                nextX++;
                break;
        }
        
        return {x: nextX, y: nextY};
    }
    
    setDirection(direction) {
        this.nextDirection = direction;
        this.hasStarted = true;
    }
    
    render(ctx) {
        const radius = GRID_SIZE / 2 - 3;
        
        ctx.fillStyle = COLORS.PLAYER;
        ctx.beginPath();
        
        if (this.mouthOpen) {
            let startAngle, endAngle;
            switch (this.direction) {
                case 'right':
                    startAngle = 0.2 * Math.PI;
                    endAngle = 1.8 * Math.PI;
                    break;
                case 'left':
                    startAngle = 1.2 * Math.PI;
                    endAngle = 0.8 * Math.PI;
                    break;
                case 'up':
                    startAngle = 1.7 * Math.PI;
                    endAngle = 1.3 * Math.PI;
                    break;
                case 'down':
                    startAngle = 0.7 * Math.PI;
                    endAngle = 0.3 * Math.PI;
                    break;
            }
            ctx.arc(this.pixelX, this.pixelY, radius, startAngle, endAngle);
            ctx.lineTo(this.pixelX, this.pixelY);
        } else {
            ctx.arc(this.pixelX, this.pixelY, radius, 0, Math.PI * 2);
        }
        
        ctx.fill();
    }
}