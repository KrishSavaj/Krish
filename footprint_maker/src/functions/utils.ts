import { Graphics } from 'pixi.js';
import { DOT_PRECISION, ALLOWED_ANGLES } from '../constants/defaults';
import { BLUE, GREY, MAGENTA } from '../constants/colors';
import { colorDot } from './dot_color_utils';
import { state, lineData, InteractiveDot } from '../managers/state_manager';
import { Component, pointTuple } from '../types/footprint';
import '../events/key_events'; // Initialize key handlers

// --- HELPER: Convert Component to Points for Rendering ---
export function componentToPoints(comp: Component): pointTuple[] {
    const { position, width, height } = comp;
    const [x, y] = position;
    // Assuming simple axis-aligned for now (rotation handled later if needed)
    return [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
        [x, y] // Close the loop
    ];
}

// --- Highlight Selection Logic ---
export function clearSelectionHighlight(): void {
    if (state.selectionHighlight && state.lineContainer) {
        state.lineContainer.removeChild(state.selectionHighlight);
        state.selectionHighlight.destroy();
        state.selectionHighlight = null;
    }
}

export function renderSelectionHighlight(): void {
    clearSelectionHighlight();
    
    if (!state.selectedElement || !state.lineContainer) return;

    // Get the points based on what is selected
    let points: pointTuple[] = [];
    const { type, index } = state.selectedElement;

    if (type === 'connection') {
        if (state.footprint.connections[index]) {
            points = state.footprint.connections[index].path;
        }
    } else {
        if (state.footprint.components[index]) {
            points = componentToPoints(state.footprint.components[index]);
        }
    }

    if (points.length === 0) return;

    // Create the Glow Graphic
    state.selectionHighlight = new Graphics();
    
    // Style: Magenta, thicker, semi-transparent (Glow effect)
    state.selectionHighlight.lineStyle(4, MAGENTA, 0.4); 
    
    state.selectionHighlight.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        state.selectionHighlight.lineTo(points[i][0], points[i][1]);
    }
    
    // Add a second pass for the core line to make it pop
    state.selectionHighlight.lineStyle(1, MAGENTA, 1); 
    state.selectionHighlight.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        state.selectionHighlight.lineTo(points[i][0], points[i][1]);
    }

    state.lineContainer.addChild(state.selectionHighlight);
}

// --- HELPER: Get All Line Data (Virtual Array) ---
// This allows legacy code to iterate over everything as if it were lines
export function getAllRenderablePaths(): { type: 'connection' | 'component', index: number, path: pointTuple[] }[] {
    const paths: { type: 'connection' | 'component', index: number, path: pointTuple[] }[] = [];
    
    state.footprint.connections.forEach((conn, index) => {
        paths.push({ type: 'connection', index, path: conn.path });
    });

    state.footprint.components.forEach((comp, index) => {
        paths.push({ type: 'component', index, path: componentToPoints(comp) });
    });

    return paths;
}

/**
 * Finds a dot at the specified position within precision tolerance
 */
export function getDotAtPosition(x: number, y: number, precision: number = DOT_PRECISION): InteractiveDot | null {
    if (!state.dots) return null;
    return state.dots.find(dot =>
        Math.abs(dot.x - x) <= precision &&
        Math.abs(dot.y - y) <= precision
    ) || null;
}

/**
 * Validates if a line between two points follows angle constraints
 */
export function isValidLine(oldX: number, oldY: number, newX: number, newY: number): boolean {
    if (newX === oldX && newY === oldY) return false;
    return isValidAngle(oldX, oldY, newX, newY);
}

/**
 * Calculates the nearest allowed angle from the given raw angle
 */
export function getNearestAllowedAngle(rawAngle: number): number {
    let normalizedAngle = rawAngle;
    while (normalizedAngle < 0) normalizedAngle += 360;
    while (normalizedAngle >= 360) normalizedAngle -= 360;

    if (normalizedAngle > 337.5 || normalizedAngle < 22.5) {
        return 0;
    }

    let nearestAngle = ALLOWED_ANGLES[0];
    let minDifference = Math.abs(normalizedAngle - nearestAngle);

    for (let i = 1; i < ALLOWED_ANGLES.length; i++) {
        const diff = Math.abs(normalizedAngle - ALLOWED_ANGLES[i]);
        if (diff < minDifference) {
            minDifference = diff;
            nearestAngle = ALLOWED_ANGLES[i];
        }
    }

    return nearestAngle;
}

export function closestMultipleOf20(value: number): number {
    return Math.round(value / 20) * 20;
}

export function calculateAngle(x1: number, y1: number, x2: number, y2: number): number {
    let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}

export function adjustEndpointToAngle(startX: number, startY: number, endX: number, endY: number): { x: number; y: number } {
    const currentAngle = calculateAngle(startX, startY, endX, endY);
    const targetAngle = getNearestAllowedAngle(currentAngle);
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angleRad = targetAngle * (Math.PI / 180);

    const newX = startX + Math.cos(angleRad) * distance;
    const newY = startY + Math.sin(angleRad) * distance;

    const snapToGrid = (val: number) => Math.round(val / 20) * 20;

    return {
        x: snapToGrid(newX),
        y: snapToGrid(newY),
    };
}

/**
 * Check if a line follows the angle constraints
 */
export function isValidAngle(x1: number, y1: number, x2: number, y2: number): boolean {
    if (x1 === x2 && y1 === y2) return false;

    const angle = calculateAngle(x1, y1, x2, y2);
    const nearestAllowedAngle = getNearestAllowedAngle(angle);

    const angleDifference = Math.min(
        Math.abs(angle - nearestAllowedAngle),
        Math.abs(angle - (nearestAllowedAngle + 360)),
        Math.abs(angle - (nearestAllowedAngle - 360))
    );

    return angleDifference < 1; // tolerance of 1 degree
}

export function linesAreEqual(line1: lineData | null | undefined, line2: lineData | null | undefined): boolean {
    if (!line1 || !line2 || line1.length !== line2.length) {
        return false;
    }

    for (let i = 0; i < line1.length; i++) {
        if (line1[i][0] !== line2[i][0] || line1[i][1] !== line2[i][1]) {
            return false;
        }
    }

    return true;
}

// Updated findLineIndex to return complex ID
export function findLineIndex(line: lineData): { type: 'connection' | 'component', index: number } | null {
    const allPaths = getAllRenderablePaths();
    for (const item of allPaths) {
        if (linesAreEqual(item.path, line)) {
            return { type: item.type, index: item.index };
        }
    }
    return null;
}

export function clearAllLines(): void {

    state.pivotDots.forEach(dot => {
        colorDot(dot, GREY);
    });

    state.pivotDots.clear();

    if (state.lineContainer) {
        state.lineContainer.removeChildren();
    }
    state.renderedGraphics = []; // Reset local rendered reference if you use it, or lines in state
    console.log("All rendered lines and pivot points cleared.");
}

/* Updated RENDER function
 * Iterates through both Connections and Components
 */
export function renderLines(dummyVar?: any): void {
    clearAllLines();

    const allPaths = getAllRenderablePaths();

    allPaths.forEach(item => {
        const newLine = new Graphics();
        newLine.lineStyle(1.5, 0xFFFFFF);

        item.path.forEach((point, index) => {
            const dot = getDotAtPosition(point[0], point[1]);
            if (dot) {
                colorDot(dot, BLUE);
                state.pivotDots.add(dot);
            }

            if (index === 0) {
                newLine.moveTo(point[0], point[1]);
            } else {
                newLine.lineTo(point[0], point[1]);
            }
        });

        if (state.lineContainer) {
            state.lineContainer.addChild(newLine);
        }
        state.renderedGraphics.push(newLine);
    });
    if (state.selectedElement) {
        renderSelectionHighlight();
    }

    console.log(`Rendered ${allPaths.length} elements`);
}