import {state, lineData} from '../managers/state_manager.ts';
import { pointTuple } from '../types/footprint.ts';
import { isValidAngle } from '../functions/utils.ts';
import { historyManager, ModifyConnectionCommand } from '../managers/undo_redo.ts';
import { Graphics } from 'pixi.js';
import { RED, BLUE, MAGENTA, CYAN } from '../constants/colors.ts';


interface PivotDragState {
    isActive: boolean;
    selectedConnectionIndex: number | null;
    selectedPointIndex: number | null;
    originalPath: lineData | null;
    pivotPoint: pointTuple | null;
    previewLine: lineData | null;
    isDragging: boolean;
    dragStartPoint: pointTuple | null;
}

interface PointOnLineResult {
    connectionIndex: number; 
    pointIndex: number;
    isVertex: boolean;
}

interface InsertPivotResult {
    newPath: lineData;
    pivotIndex: number;
}

// PIVOT MODE - STATE VARIABLES
let pivotDragState: PivotDragState = {
    isActive: false,
    selectedConnectionIndex: null,
    selectedPointIndex: null,
    originalPath: null,
    pivotPoint: null,
    previewLine: null,
    isDragging: false,
    dragStartPoint: null
};

// Visual elements
let pivotPreviewGraphics: Graphics | null = null;
let lineContainer: Graphics | null = null; 

// internal helper functions

/**
 * Finds which line segment contains the given point
 */
function findPointOnLine(x: number, y: number): PointOnLineResult | null {
    const tolerance = 2;
    
    // We only iterate over Connections (Polylines)
    for (let i = 0; i < state.footprint.connections.length; i++) {
        const line = state.footprint.connections[i].path;
        
        // Check if point is exactly on a vertex
        for (let pointIndex = 0; pointIndex < line.length; pointIndex++) {
            const [px, py] = line[pointIndex];
            if (Math.abs(px - x) <= tolerance && Math.abs(py - y) <= tolerance) {
                return { connectionIndex : i, pointIndex, isVertex: true };
            }
        }
        
        // Check if point is on a line segment
        for (let pointIndex = 0; pointIndex < line.length - 1; pointIndex++) {
            const [x1, y1] = line[pointIndex];
            const [x2, y2] = line[pointIndex + 1];
            
            if (isPointOnSegment(x1, y1, x2, y2, x, y, tolerance)) {
                return { connectionIndex : i, pointIndex, isVertex: false };
            }
        }
    }
    
    return null;
}

/**
 * Checks if a point lies on a line segment within tolerance
 */
function isPointOnSegment(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    px: number,
    py: number,
    tolerance: number = 2
): boolean {
    // Vector from start to end
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length === 0) return false;
    
    // Normalized direction vector
    const unitX = dx / length;
    const unitY = dy / length;
    
    // Vector from start to point
    const dpx = px - x1;
    const dpy = py - y1;
    
    // Project point onto line
    const projection = dpx * unitX + dpy * unitY;
    
    // Check if projection is within segment bounds
    if (projection < 0 || projection > length) {
        return false;
    }
    
    // Find closest point on segment
    const closestX = x1 + projection * unitX;
    const closestY = y1 + projection * unitY;
    
    // Check distance from point to closest point on segment
    const distance = Math.sqrt((px - closestX) ** 2 + (py - closestY) ** 2);
    return distance <= tolerance;
}

/**
 * Creates intermediate points between two points to maintain 45-degree constraints
 */
function createIntermediatePoints(
    x1: number,
    y1: number,
    x2: number,
    y2: number
): pointTuple[] {
    const intermediatePoints: pointTuple[] = [];
    
    // If already valid angle, no intermediate points needed
    if (isValidAngle(x1, y1, x2, y2)) {
        return intermediatePoints;
    }
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    // Calculate if we need 1 or 2 intermediate points
    // We need intermediate points to create a path with only 45-degree angles
    
    // Strategy: Create an L-shaped or Z-shaped path
    // For L-shape: go horizontal/vertical first, then at 45°, then horizontal/vertical
    // For efficiency, we'll create the minimum number of segments
    
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    // Case 1: Purely horizontal or vertical (shouldn't happen if isValidAngle is false)
    if (dx === 0 || dy === 0) {
        return intermediatePoints;
    }
    
    // Case 2: We need to create intermediate points
    // Strategy: Create a two-segment path (one intermediate point)
    // First segment at one allowed angle, second at another
    
    // heuristic: go halfway in dominant direction, then adjust
    
    if (absDx > absDy) {
        // Dominant horizontal movement
        // Option 1: Go horizontal first, then 45-degree
        const midX = x1 + (dx - Math.sign(dx) * absDy);
        const midY = y1;
        
        if (isValidAngle(x1, y1, midX, midY) && isValidAngle(midX, midY, x2, y2)) {
            intermediatePoints.push([midX, midY]);
            return intermediatePoints;
        }
        
        // Option 2: Go 45-degree first, then horizontal
        const midX2 = x1 + Math.sign(dx) * absDy;
        const midY2 = y2;
        
        if (isValidAngle(x1, y1, midX2, midY2) && isValidAngle(midX2, midY2, x2, y2)) {
            intermediatePoints.push([midX2, midY2]);
            return intermediatePoints;
        }
    } else {
        // Dominant vertical movement
        // Option 1: Go vertical first, then 45-degree
        const midX = x1;
        const midY = y1 + (dy - Math.sign(dy) * absDx);
        
        if (isValidAngle(x1, y1, midX, midY) && isValidAngle(midX, midY, x2, y2)) {
            intermediatePoints.push([midX, midY]);
            return intermediatePoints;
        }
        
        // Option 2: Go 45-degree first, then vertical
        const midX2 = x2;
        const midY2 = y1 + Math.sign(dy) * absDx;
        
        if (isValidAngle(x1, y1, midX2, midY2) && isValidAngle(midX2, midY2, x2, y2)) {
            intermediatePoints.push([midX2, midY2]);
            return intermediatePoints;
        }
    }
    
    // Case 3: Need two intermediate points (create Z or N shape)
    // This handles cases where one intermediate point isn't sufficient
    
    // Strategy: Split the movement into thirds
    const thirdDx = dx / 3;
    const thirdDy = dy / 3;
    
    // Try horizontal-45-horizontal pattern
    const mid1X = x1 + thirdDx;
    const mid1Y = y1;
    const mid2X = x1 + 2 * thirdDx;
    const mid2Y = y2;
    
    if (isValidAngle(x1, y1, mid1X, mid1Y) && 
        isValidAngle(mid1X, mid1Y, mid2X, mid2Y) && 
        isValidAngle(mid2X, mid2Y, x2, y2)) {
        intermediatePoints.push([mid1X, mid1Y], [mid2X, mid2Y]);
        return intermediatePoints;
    }
    
    // Try vertical-45-vertical pattern
    const mid3X = x1;
    const mid3Y = y1 + thirdDy;
    const mid4X = x2;
    const mid4Y = y1 + 2 * thirdDy;
    
    if (isValidAngle(x1, y1, mid3X, mid3Y) && 
        isValidAngle(mid3X, mid3Y, mid4X, mid4Y) && 
        isValidAngle(mid4X, mid4Y, x2, y2)) {
        intermediatePoints.push([mid3X, mid3Y], [mid4X, mid4Y]);
        return intermediatePoints;
    }
    
    // Fallback: Create a stepped path with guaranteed valid angles
    // Use Manhattan distance with 45-degree connector
    const smaller = Math.min(absDx, absDy);
    const stepX = x1 + Math.sign(dx) * smaller;
    const stepY = y1 + Math.sign(dy) * smaller;
    
    intermediatePoints.push([stepX, stepY]);
    
    // Add final connection if needed
    if (stepX !== x2 && stepY !== y2) {
        if (absDx > absDy) {
            intermediatePoints.push([x2, stepY]);
        } else {
            intermediatePoints.push([stepX, y2]);
        }
    }
    
    return intermediatePoints;
}

/**
 * Adjusts line segments around a moved pivot point by inserting intermediate pivots
 * The adjacent pivots (before and after) remain fixed in position
 */
function adjustLineAroundPivot(
    originalPath: lineData,
    pivotIndex: number,
    newX: number,
    newY: number
): lineData {
    const newPath: lineData = [];
    
    // Add all points before the pivot
    for (let i = 0; i < pivotIndex; i++) {
        newPath.push([...originalPath[i]]);
    }
    
    // Handle segment before pivot (if exists)
    if (pivotIndex > 0) {
        const prevPoint = originalPath[pivotIndex - 1];
        
        // Check if we need intermediate points
        if (!isValidAngle(prevPoint[0], prevPoint[1], newX, newY)) {
            // Insert intermediate points between previous and new position
            const intermediates = createIntermediatePoints(
                prevPoint[0], prevPoint[1], 
                newX, newY
            );
            
            // Add intermediate points
            intermediates.forEach(point => {
                newPath.push(point);
            });
        }
    }
    
    // Add the moved pivot point
    newPath.push([newX, newY]);
    
    // Handle segment after pivot (if exists)
    if (pivotIndex < originalPath.length - 1) {
        const nextPoint = originalPath[pivotIndex + 1];
        
        // Check if we need intermediate points
        if (!isValidAngle(newX, newY, nextPoint[0], nextPoint[1])) {
            // Insert intermediate points between new position and next
            const intermediates = createIntermediatePoints(
                newX, newY,
                nextPoint[0], nextPoint[1]
            );
            
            // Add intermediate points
            intermediates.forEach(point => {
                newPath.push(point);
            });
        }
    }
    
    // Add all points after the pivot
    for (let i = pivotIndex + 1; i < originalPath.length; i++) {
        newPath.push([...originalPath[i]]);
    }
    
    return newPath;
}

/**
 * Inserts a new pivot point into a line segment
 */
function insertPivotInSegment(
    path: lineData,
    segmentIndex: number,
    x: number,
    y: number
): InsertPivotResult {
    const newPath = [...path];
    newPath.splice(segmentIndex + 1, 0, [x, y]);
    return {
        newPath,
        pivotIndex: segmentIndex + 1
    };
}

// VISUAL FEEDBACK FUNCTIONS

/**
 * Creates preview graphics for the adjusted line during drag
 */
function createPivotPreview(linePoints: lineData, pivotIndex: number): void {
    clearPivotPreview();
    
    if (!lineContainer) return;
    
    pivotPreviewGraphics = new Graphics();
    
    // Draw the preview line
    pivotPreviewGraphics.lineStyle(1, CYAN, 0.6);
    if (linePoints.length > 1) {
        pivotPreviewGraphics.moveTo(linePoints[0][0], linePoints[0][1]);
        for (let i = 1; i < linePoints.length; i++) {
            pivotPreviewGraphics.lineTo(linePoints[i][0], linePoints[i][1]);
        }
    }
    
    // Highlight all points
    linePoints.forEach(([x, y], index) => {
        if (index === pivotIndex) {
            // Highlight pivot point in RED
            pivotPreviewGraphics!.beginFill(RED, 0.8);
            pivotPreviewGraphics!.drawCircle(x, y, 4);
            pivotPreviewGraphics!.endFill();
        } else {
            // Other points in yellow
            pivotPreviewGraphics!.beginFill(RED, 0.6);
            pivotPreviewGraphics!.drawCircle(x, y, 4);
            pivotPreviewGraphics!.endFill();
        }
    });
    
    lineContainer.addChild(pivotPreviewGraphics);
}

/**
 * Clears the pivot preview graphics
 */
function clearPivotPreview(): void {
    if (pivotPreviewGraphics && lineContainer) {
        lineContainer.removeChild(pivotPreviewGraphics);
        pivotPreviewGraphics.destroy();
        pivotPreviewGraphics = null;
    }
}

/**
 * Highlights the selected line and pivot point
 */
function highlightSelectedPivot(connIndex: number, pointIndex: number): void {
    const line = state.footprint.connections[connIndex].path;
    const [pivotX, pivotY] = line[pointIndex];
    
    // Create temporary highlight graphics
    clearPivotPreview();
    
    if (!lineContainer) return;
    
    pivotPreviewGraphics = new Graphics();
    
    // Highlight the entire line
    pivotPreviewGraphics.lineStyle(1, MAGENTA, 0.8);
    pivotPreviewGraphics.moveTo(line[0][0], line[0][1]);
    for (let i = 1; i < line.length; i++) {
        pivotPreviewGraphics.lineTo(line[i][0], line[i][1]);
    }
    
    // Highlight pivot point
    pivotPreviewGraphics.beginFill(RED, 0.9);
    pivotPreviewGraphics.drawCircle(pivotX, pivotY, 4);
    pivotPreviewGraphics.endFill();
    
    // Highlight other line points
    line.forEach(([x, y], index) => {
        if (index !== pointIndex) {
            pivotPreviewGraphics!.beginFill(BLUE, 0.6);
            pivotPreviewGraphics!.drawCircle(x, y, 4);
            pivotPreviewGraphics!.endFill();
        }
    });
    
    lineContainer.addChild(pivotPreviewGraphics);
}

// MAIN PIVOT DRAG FUNCTIONS

/**
 * Handles click in pivot drag mode
 */
export function handlePivotDragClick(x: number, y: number): boolean {
    // If not currently active, try to select a pivot point
    if (!pivotDragState.isActive) {
        return selectPivotPoint(x, y);
    }
            
    // If active and not dragging, start drag or move pivot
    if (!pivotDragState.isDragging) {
        return startPivotDrag(x, y);
    }
    
    return false;
}

/**
 * Selects a point on a line as the pivot
 */
function selectPivotPoint(x: number, y: number): boolean {
    const result = findPointOnLine(x, y);
    
    if (!result) {
        console.log("No line found at clicked position");
        return false;
    }
    
    const { connectionIndex, pointIndex, isVertex } = result;
    let finalPointIndex = pointIndex;
    let finalPath : lineData = [...state.footprint.connections[connectionIndex].path];
    
    // If point is on a segment (not vertex), insert a new pivot point
    if (!isVertex) {
        const insertResult = insertPivotInSegment(finalPath, pointIndex, x, y);
        finalPath = insertResult.newPath;
        finalPointIndex = insertResult.pivotIndex;
        
        // Update state immediately so we can drag it
        state.footprint.connections[connectionIndex].path = finalPath;
        console.log(`Inserted new pivot point at (${x}, ${y}) in segment ${pointIndex}`);
    }
    
    // Set up pivot drag state
    pivotDragState = {
        isActive: true,
        selectedConnectionIndex: connectionIndex,
        selectedPointIndex: finalPointIndex,
        originalPath: JSON.parse(JSON.stringify(finalPath)), // Deep copy
        pivotPoint: [x, y],
        previewLine: null,
        isDragging: false,
        dragStartPoint: null
    };
    
    highlightSelectedPivot(connectionIndex, finalPointIndex);
    
    console.log(`Pivot point selected at (${x}, ${y}) on line ${connectionIndex}, point ${finalPointIndex}`);
    return true;
}

/**
 * Starts dragging the selected pivot point
 */
function startPivotDrag(x: number, y: number): boolean {
    if (!pivotDragState.isActive) return false;
    
    pivotDragState.isDragging = true;
    pivotDragState.dragStartPoint = [x, y];
    
    console.log(`Started dragging pivot from (${x}, ${y})`);
    return true;
}

/**
 * Handles mouse movement during pivot drag
 */
export function handlePivotDragMove(x: number, y: number): void {
    if (!pivotDragState.isDragging) return;
    
    const { selectedConnectionIndex, selectedPointIndex, originalPath } = pivotDragState;
    
    if (selectedConnectionIndex === null || selectedPointIndex === null || !originalPath) {
        return;
    }
    
    // Snap to grid
    const snappedX = Math.round(x / 20) * 20;
    const snappedY = Math.round(y / 20) * 20;
    
    // Calculate adjusted line with new pivot position
    const adjustedPath = adjustLineAroundPivot(originalPath, selectedPointIndex, snappedX, snappedY);
    
    // Create visual preview
    createPivotPreview(adjustedPath, selectedPointIndex);
    
    // Update pivot point position
    pivotDragState.pivotPoint = [snappedX, snappedY];
}

/**
 * Completes the pivot drag operation
 */
export function completePivotDrag(x: number, y: number): void {
    if (!pivotDragState.isDragging) return;
    
    const { selectedConnectionIndex, selectedPointIndex, originalPath } = pivotDragState;
    
    if (selectedConnectionIndex === null || selectedPointIndex === null || !originalPath) {
        return;
    }
    
    // Snap to grid
    const snappedX = Math.round(x / 20) * 20;
    const snappedY = Math.round(y / 20) * 20;
    
    // Calculate final adjusted line
    const finalPath = adjustLineAroundPivot(originalPath, selectedPointIndex, snappedX, snappedY);
    
    // Create command for undo/redo
    const command = new ModifyConnectionCommand(selectedConnectionIndex, originalPath, finalPath);
    historyManager.execute(command);
    
    console.log(`Pivot drag completed. Moved to (${snappedX}, ${snappedY})`);
    // console.log("Original line:", originalPath);
    // console.log("Final line:", finalLine);
    
    // Reset state
    resetPivotDragState();
}

/**
 * Cancels the current pivot drag operation
 */
export function cancelPivotDrag(): void {
    if (!pivotDragState.isActive) return;
    
    // Restore original line if we were dragging
    if (pivotDragState.isDragging && 
        pivotDragState.originalPath && 
        pivotDragState.selectedConnectionIndex !== null) {
        state.footprint.connections[pivotDragState.selectedConnectionIndex].path = pivotDragState.originalPath;
    }
    
    console.log("Pivot drag cancelled");
    resetPivotDragState();
}

/**
 * Resets all pivot drag state
 */
function resetPivotDragState(): void {
    clearPivotPreview();
    
    pivotDragState = {
        isActive: false,
        selectedConnectionIndex: null,
        selectedPointIndex: null,
        originalPath: null,
        pivotPoint: null,
        previewLine: null,
        isDragging: false,
        dragStartPoint: null
    };
}

// INTEGRATION FUNCTIONS

/**
 * Sets the line container reference (called from createDot.tsx)
 */
export function setPivotLineContainer(container: Graphics): void {
    lineContainer = container;
}

/**
 * Checks if pivot drag mode is currently active
 * @returns boolean
 */
export function isPivotDragActive(): boolean {
    return pivotDragState.isActive;
}

/**
 * Checks if currently dragging a pivot
 * @returns boolean  
 */
export function isPivotDragging(): boolean {
    return pivotDragState.isDragging;
}

/**
 * Gets current pivot drag state for debugging
 * @returns PivotDragState copy
 */
export function getPivotDragState(): PivotDragState {
    return { ...pivotDragState };
}