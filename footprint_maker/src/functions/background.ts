import { Container, Application } from 'pixi.js';
import { createDot } from './create_dot';

// Declare variables with types
export let centerX: number;
export let centerY: number;
export let container: Container;

/**
 * Creates all grid dots and adds them to the container
 */
export function createAllDots(): void {
    // Clear the container
    container.removeChildren();

    // Draw major grid points
    for (let x = 0; x <= centerX; x += 20) {
        for (let y = 0; y <= centerY; y += 20) {
            const point = createDot(x, y);
            container.addChild(point);
        }
        for (let y = 0; y >= -centerY; y -= 20) {
            const point = createDot(x, y);
            container.addChild(point);
        }
    }
    for (let x = 0; x >= -centerX; x -= 20) {
        for (let y = 0; y <= centerY; y += 20) {
            const point = createDot(x, y);
            container.addChild(point);
        }
        for (let y = 0; y >= -centerY; y -= 20) {
            const point = createDot(x, y);
            container.addChild(point);
        }
    }
}

/**
 * Initializes the PIXI app by adding a container and setting up the grid dots
 * @param app - PIXI Application instance
 */
export default function run(app: Application): void {
    container = new Container();
    app.stage.addChild(container);

    // Set background color
    app.renderer.background.color = 0x001122;

    // Get screen center
    centerX = app.screen.width / 2;
    centerY = app.screen.height / 2;

    // Shift container so that (0,0) is at the center
    container.x = centerX;
    container.y = centerY;

    createAllDots();
}
