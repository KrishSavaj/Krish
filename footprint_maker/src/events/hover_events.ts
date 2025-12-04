import { FederatedPointerEvent, Graphics } from 'pixi.js';
import { state, InteractiveDot } from '../managers/state_manager';
import { centerX, centerY } from '../functions/background';
import { handlePivotDragMove, isPivotDragging } from '../modes/pivot_mode';
import { getDotColor, colorDot, restoreIntersectionDotColor } from '../functions/dot_color_utils';
import { MIN_TRACKING_DISTANCE, START_TRACKING_DISTANCE, DIRECTION_DISTANCE, DOT_PRECISION } from '../constants/defaults';
import { getNearestAllowedAngle, getDotAtPosition } from '../functions/utils';
import { RED, GREEN, MAGENTA, CYAN } from '../constants/colors';
import { showRectanglePreview } from '../modes/rectangle_mode';

// LOCAL CALCULATION STATE

let isTrackingDirection = false;
let isVertLine = false;
let isHorLine = false;
let slope: number | null = null;
let c: number | null = null; // y-intercept or x-intercept
let perpSlope: number | null = null;

// Current angle being tracked (0, 45, 90, etc.)
let currentDirection: number | null = null;

// The last angle used for projection/guidelines
let lastProjectionAngle: number | null = null;


// MAIN ROUTERS

/**
 * Main hover handler - routes to appropriate mode handler
 */
export function onDotHover(this: InteractiveDot, event: FederatedPointerEvent): void {

    state.hoveredDot = this;

    switch (state.mode) {
        case 0: // Default (Line Drawing)
            handleDefaultModeHover.call(this, event);
            break;
        case 1: // Pivot Drag
            handlePivotModeHover.call(this, event);
            break;
        case 2: // Edit
            handleSimpleHover.call(this, event);
            break;
        case 3: // Drag & Drop
            handleSimpleHover.call(this, event);
            break;
        case 4: // Rectangle
            handleRectangleModeHover.call(this, event);
            break;
        default:
            handleSimpleHover.call(this, event);
            break;
    }
}

/**
 * Main leave handler - usually simpler, but good to keep structure
 */
export function onDotLeave(this: InteractiveDot): void {

    if (state.hoveredDot === this) {
        state.hoveredDot = null; //
    }
    // Rectangle mode has specific cleanup for previews
    if (state.mode === 4) {
        handleRectangleModeLeave.call(this);
        return;
    }

    // Default cleanup
    const leaveColor = getDotColor(this, false);
    colorDot(this, leaveColor);

    // Cleanup intersection dot visual
    if (state.intersectionDot && state.intersectionDot !== this) {
        restoreIntersectionDotColor(state.intersectionDot);
        state.intersectionDot = null;
    }
}

export function resetHoverState() {
    isTrackingDirection = false;
    setDirection(null);
    setLastProjection(null);
    slope = null;
    c = null;
    state.intersectionDot = null;
}

// MODE SPECIFIC HANDLERS

/**
 * Mode 0: Default Line Drawing Hover
 * Handles color updates, direction tracking, and intersection snapping.
 */
function handleDefaultModeHover(this: InteractiveDot, event: FederatedPointerEvent): void {
    // 1. Apply Standard Hover Color
    const hoverColor = getDotColor(this, true);
    colorDot(this, hoverColor);

    // 2. Direction Tracking (Only if a dot is selected and we are actively drawing)
    if (!state.selectedDot) return;

    const globalPos = event.global;
    const cursorX = Math.round(globalPos.x - centerX);
    const cursorY = Math.round(globalPos.y - centerY);
    
    const dx = cursorX - state.selectedDot.x;
    const dy = cursorY - state.selectedDot.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance >= MIN_TRACKING_DISTANCE) {
        // Calculate Angle
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        
        const nearestAngle = getNearestAllowedAngle(angle);

        // Start tracking threshold
        if (!isTrackingDirection && distance >= START_TRACKING_DISTANCE) {
            isTrackingDirection = true;
        }

        // Update Projection Line
        if (isTrackingDirection && (nearestAngle !== lastProjectionAngle || !state.tempGuideLine)) {
            updateDirectionTracking(nearestAngle);
            if (currentDirection !== null) {
                createProjectionLine(state.selectedDot, currentDirection);
            }
        }
    }

    // 3. Intersection Calculation
    if (!state.isLineCompleted && isTrackingDirection) {
        calculateIntersection(this);
    }
}

/**
 * Mode 1: Pivot Drag Hover
 */
function handlePivotModeHover(this: InteractiveDot, event: FederatedPointerEvent): void {
    // If dragging, delegate to pivot logic
    if (isPivotDragging()) {
        const globalPos = event.global;
        const cursorX = Math.round(globalPos.x - centerX);
        const cursorY = Math.round(globalPos.y - centerY);
        handlePivotDragMove(cursorX, cursorY);
    } 
    // Otherwise just standard highlight
    else {
        handleSimpleHover.call(this, event);
    }
}

/**
 * Mode 2 & 3: Simple Hover (Just colors)
 */
function handleSimpleHover(this: InteractiveDot, event: FederatedPointerEvent): void {
    const hoverColor = getDotColor(this, true);
    colorDot(this, hoverColor);
}

/**
 * Mode 4: Rectangle Hover
 */
function handleRectangleModeHover(this: InteractiveDot, event: FederatedPointerEvent): void {
    if (!state.isRectangleInProgress) {
        colorDot(this, GREEN);
    } else {
        colorDot(this, GREEN);
        // Show preview if we have a start point
        if (state.selectedDot) {
            showRectanglePreview(state.selectedDot.x, state.selectedDot.y, this.x, this.y);
        }
    }
}

/**
 * Mode 4: Rectangle Leave
 */
function handleRectangleModeLeave(this: InteractiveDot): void {
    const leaveColor = getDotColor(this, false);
    colorDot(this, leaveColor);
}

// LOCAL HELPER FUNCTIONS

function updateDirectionTracking(angle: number) {
    setDirection(angle);
    setLastProjection(angle);

    if (!state.selectedDot) return;

    const unitX = Math.cos(angle * (Math.PI / 180));
    const unitY = Math.sin(angle * (Math.PI / 180));

    // Direction vector calc
    const dirX = state.selectedDot.x + Math.round(unitX * DIRECTION_DISTANCE);
    const dirY = state.selectedDot.y + Math.round(unitY * DIRECTION_DISTANCE);

    // Math for intersection
    if (angle === 90 || angle === 270) {
        c = dirX;
        isVertLine = true;
        isHorLine = false;
    } else if (angle === 0 || angle === 180) {
        c = dirY;
        isVertLine = false;
        isHorLine = true;
    } else {
        isVertLine = false;
        isHorLine = false;
        slope = Math.tan(angle * (Math.PI / 180));
        c = dirY - slope * dirX;
        perpSlope = -1 / slope;
    }
}

function calculateIntersection(hoveredDot: InteractiveDot) {
    let x_int: number | null = null;
    let y_int: number | null = null;

    if (isVertLine && c !== null) {
        x_int = c;
        y_int = hoveredDot.y;
    } else if (isHorLine && c !== null) {
        x_int = hoveredDot.x;
        y_int = c;
    } else if (slope !== null && perpSlope !== null && c !== null) {
        const c_perp = hoveredDot.y - perpSlope * hoveredDot.x;
        x_int = (c_perp - c) / (slope - perpSlope);
        y_int = slope * x_int + c;
    }

    if (x_int !== null && y_int !== null) {
        state.intersectionDot = getDotAtPosition(x_int, y_int, DOT_PRECISION) as InteractiveDot;
        
        // Update projection line to hit intersection
        if (state.selectedDot && currentDirection !== null) {
             createProjectionLine(state.selectedDot, currentDirection, { x: x_int, y: y_int });
        }

        if (state.intersectionDot && state.intersectionDot !== hoveredDot) {
            colorDot(state.intersectionDot, MAGENTA);
        }
    }
}

function createProjectionLine(start: {x: number, y: number}, angle: number, end?: {x: number, y: number}) {
    // Cleanup old line
    if (state.tempGuideLine && state.lineContainer) {
        state.lineContainer.removeChild(state.tempGuideLine);
        state.tempGuideLine.destroy();
    }

    state.tempGuideLine = new Graphics();
    state.tempGuideLine.lineStyle(1, CYAN, 0.6);

    let endX, endY;
    if (end) {
        endX = end.x;
        endY = end.y;
    } else {
        const len = 300;
        const rad = angle * (Math.PI / 180);
        endX = start.x + Math.cos(rad) * len;
        endY = start.y + Math.sin(rad) * len;
    }

    state.tempGuideLine.moveTo(start.x, start.y);
    state.tempGuideLine.lineTo(endX, endY);
    
    if (state.lineContainer) {
        state.lineContainer.addChild(state.tempGuideLine);
    }
}

// Helper to set direction
function setDirection(angle: number | null) {
    currentDirection = angle;
}

// Helper to set projection
function setLastProjection(angle: number | null) {
    lastProjectionAngle = angle;
}
