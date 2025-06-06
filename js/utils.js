const GRID_SIZE = 40;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const MAZE_WIDTH = CANVAS_WIDTH / GRID_SIZE;
const MAZE_HEIGHT = CANVAS_HEIGHT / GRID_SIZE;

const COLORS = {
    WALL: '#0080ff',
    DOT: '#ffff00',
    PLAYER: '#ffff00',
    BACKGROUND: '#000'
};

function gridToPixel(gridX, gridY) {
    return {
        x: gridX * GRID_SIZE + GRID_SIZE / 2,
        y: gridY * GRID_SIZE + GRID_SIZE / 2
    };
}

function pixelToGrid(pixelX, pixelY) {
    return {
        x: Math.floor(pixelX / GRID_SIZE),
        y: Math.floor(pixelY / GRID_SIZE)
    };
}