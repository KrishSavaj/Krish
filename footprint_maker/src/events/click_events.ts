import { FederatedPointerEvent, Graphics } from 'pixi.js';
import { state, InteractiveDot} from '../managers/state_manager';
import { RED, GREEN, BLUE } from '../constants/colors';
import { NEIGHBOR_RADIUS, DOT_PRECISION } from '../constants/defaults';
import { highlightSpecificDots, colorDot, resetSpecificDots } from '../functions/dot_color_utils';
import { resetHoverState } from './hover_events';
import { isValidLine, isValidAngle, adjustEndpointToAngle, renderSelectionHighlight, clearSelectionHighlight } from '../functions/utils';

// Mode specific imports
import { handlePivotDragClick } from '../modes/pivot_mode';
import { findLine, resetPasteCounter } from '../modes/edit_mode';
import { dragLine } from '../modes/drag_mode';
import { createRectangle, resetRectangleState } from '../modes/rectangle_mode';

// MAIN ROUTER

/**
 * Main click handler - routes to appropriate mode handler
 */
export function onDotClick(this: InteractiveDot, event: FederatedPointerEvent): void {
    resetSpecificDots();

    switch (state.mode) {
        case 0:
            handleDefaultModeClick.call(this, event);
            break;
        case 1:
            handlePivotModeClick.call(this, event);
            break;
        case 2:
            handleEditModeClick.call(this, event);
            break;
        case 3:
            handleDragDropModeClick.call(this, event);
            break;
        case 4:
            handleRectangleModeClick.call(this, event);
            break;
        default:
            console.warn(`Unknown mode: ${state.mode}`);
            break;
    }
}

// MODE HANDLERS

/**
 * Mode 0: Default Line Drawing
 */
function handleDefaultModeClick(this: InteractiveDot, event: FederatedPointerEvent): void {
    if (state.intersectionDot) {
        colorDot(state.intersectionDot, RED);
    }

    let isValidDot = true;
    let targetDot = this;

    // Validate connection if extending a line
    if (state.selectedDot) {
        isValidDot = isValidLine(this.x, this.y, state.selectedDot.x, state.selectedDot.y);
    }

    // Handle invalid clicks / intersection snapping
    if (!isValidDot && state.intersectionDot) {
        targetDot = state.intersectionDot;
    } else if (!isValidDot && !state.intersectionDot) {
        console.log("Invalid point with no valid intersection. Click ignored.");
        if (state.selectedDot) {
            const currentNeighbors = state.dots.filter(dot => {
                const dx = Math.abs(dot.x - state.selectedDot!.x);
                const dy = Math.abs(dot.y - state.selectedDot!.y);
                return (dx <= NEIGHBOR_RADIUS && dy <= NEIGHBOR_RADIUS && (dx !== 0 || dy !== 0));
            });
            highlightSpecificDots(currentNeighbors);
        }
        colorDot(this, GREEN);
        return;
    }

    // Update State
    state.isLineCompleted = false;
    
    // Highlight Neighbors for the new target
    const neighbors = state.dots.filter(dot => {
        const dx = Math.abs(dot.x - targetDot.x);
        const dy = Math.abs(dot.y - targetDot.y);
        return (dx <= NEIGHBOR_RADIUS && dy <= NEIGHBOR_RADIUS && (dx !== 0 || dy !== 0));
    });
    highlightSpecificDots(neighbors);
    
    state.pivotDots.add(targetDot);
    colorDot(targetDot, RED);
    
    state.selectedDot = targetDot;
    resetHoverState(); // Reset direction tracking

    // Perform Drawing
    if (!state.currentLine) {
        startNewLine(targetDot.x, targetDot.y);
    } else {
        extendCurrentLine(targetDot.x, targetDot.y);
    }
}

/**
 * Mode 1: Pivot Drag
 */
function handlePivotModeClick(this: { x: number; y: number }, event: FederatedPointerEvent): boolean {
    const currentX = this.x;
    const currentY = this.y;

    const handled: boolean = handlePivotDragClick(currentX, currentY);

    if (!handled) {
        console.log("No line found at clicked position for pivot mode");
    }
    return handled;
}

/**
 * Mode 2: Edit (Select Line)
 */
function handleEditModeClick(this: InteractiveDot, event: FederatedPointerEvent): void {
// findLine now sets state.selectedElement internally
    const [found, globalIndex] = findLine(this.x, this.y);
    
    if (found) {
        // Just reset the paste counter, state.selectedElement is already set by findLine
        resetPasteCounter();
        renderSelectionHighlight(); // <--- Trigger Glow
        console.log("Selection updated", state.selectedElement);
    }
}

/**
 * Mode 3: Drag & Drop
 */
function handleDragDropModeClick(this: InteractiveDot, event: FederatedPointerEvent): void {
const [found, globalIndex] = findLine(this.x, this.y);
    
    // Select element if not selected
    if (found) {
        // state.selectedElement is set by findLine
        state.selectedDot = this;
        state.isLineSelected = true;
        renderSelectionHighlight(); // <--- Trigger Glow
    } 
    // Move element if already selected
    else if (state.isLineSelected && state.selectedDot && state.selectedElement) {
        dragLine([], state.selectedDot.x, state.selectedDot.y, this.x, this.y);
        state.selectedDot = null;
        state.isLineSelected = false;
        clearSelectionHighlight();
    }
}

/**
 * Mode 4: Rectangle Creation
 */
function handleRectangleModeClick(this: InteractiveDot, event: FederatedPointerEvent): void {
    if (!state.isRectangleInProgress) {
        // Start Rectangle
        state.selectedDot = this; // Use selectedDot to store first point
        state.isRectangleInProgress = true;
        colorDot(this, RED);
    } else {
        // Validation: Don't allow same point
        if (state.selectedDot && 
            Math.abs(this.x - state.selectedDot.x) < DOT_PRECISION && 
            Math.abs(this.y - state.selectedDot.y) < DOT_PRECISION) {
            colorDot(this, GREEN);
            return;
        }
        
        // Complete Rectangle
        if (state.selectedDot) {
            createRectangle(state.selectedDot.x, state.selectedDot.y, this.x, this.y);
        }
        resetRectangleState();
    }
}

// LOCAL DRAWING HELPERS

function startNewLine(x: number, y: number): void {
    state.currentLine = new Graphics();
    state.currentLine.lineStyle(1.5, 0xFFFFFF);
    state.currentPath = [[ x, y ]];

    if (state.lineContainer) {
        state.lineContainer.addChild(state.currentLine);
    }
    console.log(`Started new line at (${x}, ${y})`);
}

function extendCurrentLine(x: number, y: number): void {
    if (state.currentPath.length > 0) {
        const lastPoint = state.currentPath[state.currentPath.length - 1];
        
        if (!isValidAngle(lastPoint[0], lastPoint[1], x, y)) {
            const adjusted = adjustEndpointToAngle(lastPoint[0], lastPoint[1], x, y);
            const adjustedPoint = [adjusted.x , adjusted.y];  // dict to tuple - can deprerecate
            state.currentPath.push([adjustedPoint[0], adjustedPoint[1]]);
        } else {
            state.currentPath.push([x,y]);
        }
    } else {
        state.currentPath.push([x,y]);
    }
    redrawCurrentLine();
}

function redrawCurrentLine(): void {
    if (!state.currentLine || state.currentPath.length < 2) return;

    state.currentLine.clear();
    state.currentLine.lineStyle(1.5, 0xFFFFFF);
    state.currentLine.moveTo(state.currentPath[0][0], state.currentPath[0][1]);
    
    for (let i = 1; i < state.currentPath.length; i++) {
        state.currentLine.lineTo(state.currentPath[i][0], state.currentPath[i][1]);
    }
}