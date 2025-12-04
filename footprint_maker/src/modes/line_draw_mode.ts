import { state, lineData, InteractiveDot} from "../managers/state_manager";
import { DOT_PRECISION } from "../constants/defaults";
import { colorDot, resetSpecificDots } from "../functions/dot_color_utils";
import { getDotAtPosition } from "../functions/utils";
import { LineCreatedCommand, historyManager } from "../managers/undo_redo";
import { BLUE } from '../constants/colors';
import { generateId, Polyline, pointTuple } from "../types/footprint";

/**
 * Finalizes the current line being drawn and adds it to the permanent collection
 */
export function finalizeLine(): boolean {
    // Check if currentLine is defined and currentPath has at least 2 points
    if (!state.currentLine || state.currentPath.length < 2) {
        console.log("No valid line to finalize");
        return false;
    }
    
    // Add the Pixi Graphics object to the rendered list
    state.renderedGraphics.push(state.currentLine);

    // Convert all existing pivot dots that are part of this line to BLUE
    state.pivotDots.forEach((dot: InteractiveDot) => {
        const isCurrentLinePivot = state.currentPath.some(point => 
            Math.abs(point[0] - dot.x) <= DOT_PRECISION && 
            Math.abs(point[1] - dot.y) <= DOT_PRECISION
        );
        
        if (isCurrentLinePivot) {
            colorDot(dot, BLUE);
        }
    });

    // Ensure all points in the path are added to pivotDots and colored BLUE
    state.currentPath.forEach((point) => {
        const pivotDot = getDotAtPosition(point[0], point[1]);
        if (pivotDot) {
            state.pivotDots.add(pivotDot);
            colorDot(pivotDot, BLUE);
        }
    });

    // --- Create Polyline Object ---
    const linePoints: pointTuple[] = state.currentPath.map(point => [point[0], point[1]]);
    
    const newPolyline: Polyline = {
        id: generateId(),
        path: linePoints,
        selected: false
    };

    const command = new LineCreatedCommand(newPolyline);

    historyManager.execute(command);
    
    // Reset state for the next line
    resetSpecificDots();
    state.resetDrawingState();
    console.log("Line finalized successfully");
    return true;
}