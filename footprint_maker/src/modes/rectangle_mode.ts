import { Graphics } from 'pixi.js';
import { state } from '../managers/state_manager';
import { RectangleCreatedCommand, historyManager } from '../managers/undo_redo';
import { CYAN } from '../constants/colors';
import { getDotAtPosition } from '../functions/utils';
import { colorDot, getDotColor } from '../functions/dot_color_utils';
import { Component, generateId } from '../types/footprint';

/**
 * Calculate the four corners of a rectangle given two diagonal points.
 */
export function findVertices(
  firstX: number,
  firstY: number,
  secondX: number,
  secondY: number
): number[][] {
  const x1 = Math.min(firstX, secondX);
  const y1 = Math.min(firstY, secondY);
  const x2 = Math.max(firstX, secondX);
  const y2 = Math.max(firstY, secondY);

  return [
    [x1, y1], // Top-left
    [x2, y1], // Top-right
    [x2, y2], // Bottom-right
    [x1, y2], // Bottom-left
  ];
}

/**
 * Creates a rectangle from two diagonal points
 */
export function createRectangle(x1: number, y1: number, x2: number, y2: number): void {
    console.log(`Creating rectangle from (${x1}, ${y1}) to (${x2}, ${y2})`);
    
    // Calculate Component properties
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);

    const newComponent: Component = {
        id: generateId(),
        componentId: "IC" + Math.floor(Math.random() * 100), // Temp ID gen
        name: "Component",
        pins: [], // Can be populated later
        position: [x, y],
        width: width,
        height: height,
        rotation: 0
    };
    
    const command = new RectangleCreatedCommand(newComponent);
    historyManager.execute(command);
    
    console.log("Rectangle created successfully");
}

/**
 * Internal helper to clear preview
 */
function clearRectanglePreview(): void {
    if (state.rectPreviewLine && state.lineContainer) {
        state.lineContainer.removeChild(state.rectPreviewLine);
        state.rectPreviewLine.destroy();
        state.rectPreviewLine = null;
    }
}

/**
 * Shows a preview of the rectangle being created
 */
export function showRectanglePreview(x1: number, y1: number, x2: number, y2: number): void {
    clearRectanglePreview();
    
    if (!state.lineContainer) return;
    
    const vertices = findVertices(x1, y1, x2, y2);
    
    state.rectPreviewLine = new Graphics();
    state.rectPreviewLine.lineStyle(1, CYAN, 0.5);
    
    state.rectPreviewLine.moveTo(vertices[0][0], vertices[0][1]);
    for (let i = 1; i < vertices.length; i++) {
        state.rectPreviewLine.lineTo(vertices[i][0], vertices[i][1]);
    }
    state.rectPreviewLine.lineTo(vertices[0][0], vertices[0][1]);
    
    // Draw Cyan Corners (Circles)
    state.rectPreviewLine.beginFill(CYAN, 0.5);
    vertices.forEach(vertex => {
        // Skip the hovered dot (current mouse position)
        // x2, y2 are passed as the current hover coordinates
        if (vertex[0] === x2 && vertex[1] === y2) {
            return;
        }
        state.rectPreviewLine!.drawCircle(vertex[0], vertex[1], 4);
    });
    state.rectPreviewLine.endFill();

    state.lineContainer.addChild(state.rectPreviewLine);
}

/**
 * Resets rectangle mode state
 */
export function resetRectangleState(): void {
    state.isRectangleInProgress = false;
    clearRectanglePreview();
    
    if (state.selectedDot) {
        const firstDot = getDotAtPosition(state.selectedDot.x, state.selectedDot.y);
        if (firstDot) {
            colorDot(firstDot, getDotColor(firstDot, false));
        }
        state.selectedDot = null;
    }
}