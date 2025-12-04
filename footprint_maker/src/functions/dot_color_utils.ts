// COLOR MANAGEMENT FUNCTIONS

import { state, InteractiveDot} from '../managers/state_manager';
import { GREEN, RED, GREY, BLUE, YELLOW } from '../constants/colors';
import { BlurFilter } from 'pixi.js';
import { DOT_PRECISION } from '../constants/defaults';

/**
 * Determines the appropriate color for a dot based on its current state
 */
export function getDotColor(dot: InteractiveDot, isHovered = false): number {
  // Check if this dot is a pivot in the line currently being drawn
  const isCurrentLinePivot = state.currentPath.some(
    (point) =>
      Math.abs(point[0] - dot.x) <= DOT_PRECISION &&
      Math.abs(point[1] - dot.y) <= DOT_PRECISION
  );

  if (state.pivotDots.has(dot)) {
    if (isCurrentLinePivot && !state.isLineCompleted) {
      return RED; // Current line pivot - always RED
    } else {
      return isHovered ? RED : BLUE; // Finalized pivot (BLUE, RED on hover)
    }
  } else if (state.highlightedNeighbors.includes(dot)) {
    return YELLOW; // Neighbor highlight
  } else if (isHovered) {
    return GREEN; // Hovered regular dot
  } else {
    return GREY; // Normal dot
  }
}

/**
 * Applies color and styling to a dot with consistent size and effects
 */
export function colorDot(dot: InteractiveDot, color: number): void {
  dot.clear();
  dot.beginFill(color);

  // Size based on color (GREY dots are smaller)
  const size = color === GREY ? 2 : 4;
  dot.drawCircle(0, 0, size);
  dot.endFill();

  // Apply glow effect for non-GREY dots
  if (color !== GREY) {
    dot.filters = [new BlurFilter(1)];
  } else {
    dot.filters = [];
  }
}


/**
 * Restores an intersection dot to its proper color when cleaning up
 */
export function restoreIntersectionDotColor(dot: InteractiveDot | null): void {
  if (!dot) return;

  const wasIntersectionPivot = state.pivotDots.has(dot);
  const isIntersectionNeighbor = state.highlightedNeighbors.includes(dot);

  if (wasIntersectionPivot) {
    const isCurrentLinePivot = state.currentPath.some(
      (point) =>
        Math.abs(point[0] - dot.x) <= DOT_PRECISION &&
        Math.abs(point[1] - dot.y) <= DOT_PRECISION
    );

    const color = isCurrentLinePivot && !state.isLineCompleted ? RED : BLUE;
    colorDot(dot, color);
  } else if (isIntersectionNeighbor) {
    colorDot(dot, YELLOW);
  } else {
    colorDot(dot, GREY);
  }
}

// NEIGHBOR HIGHLIGHTING

/**
 * Resets neighbor highlighting back to normal dot appearance
 */
export function resetSpecificDots(): void {
  state.highlightedNeighbors.forEach((dot) => {
    if (!state.pivotDots.has(dot)) {
      colorDot(dot, GREY);
    }
  });
  state.highlightedNeighbors = [];
}

/**
 * Highlights dots that are neighbors to the specified positions
 */
export function highlightSpecificDots(neighborPositions: { x: number; y: number }[]): void {
  resetSpecificDots();
  state.highlightedNeighbors = [];

  state.dots.forEach((dot) => {
    const isNeighbor = neighborPositions.some(
      (n) => Math.abs(n.x - dot.x) <= 5 && Math.abs(n.y - dot.y) <= 5
    );

    if (isNeighbor && !state.pivotDots.has(dot)) {
      colorDot(dot, YELLOW);
      state.highlightedNeighbors.push(dot);
    }
  });
}