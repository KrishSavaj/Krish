export const GRID_SIZE = 5;
export const OUTER_GRID_INTERVAL = 5;

export const CONNECTION_POINT_RADIUS = 2;

// Dynamic canvas size - will be set based on screen size
// These are fallback values if window is not available
export let CANVAS_WIDTH = 1000;
export let CANVAS_HEIGHT = 1000;

/**
 * Initialize canvas dimensions based on screen size
 * Should be called on app startup
 */
export function initializeCanvasDimensions(): void {
  if (typeof window !== "undefined") {
    // Account for side menu (280px) and padding
    const availableWidth = window.innerWidth - 280 - 40; // side menu + padding
    const availableHeight = window.innerHeight - 40; // padding
    // Set canvas to be larger than viewport to allow scrolling
    // Minimum 1000x1000 for good working space
    CANVAS_WIDTH = Math.max(availableWidth * 1.1, 1000);
    CANVAS_HEIGHT = Math.max(availableHeight * 1.1, 1000);
  }
}

/**
 * Get current canvas dimensions
 */
export function getCanvasDimensions(): { width: number; height: number } {
  return { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
}

/**
 * Expand canvas to accommodate content (right and bottom only)
 * @param x - Component x position
 * @param y - Component y position  
 * @param width - Component width
 * @param height - Component height
 * @returns Object with expansion info: { expanded: boolean, offsetX: number, offsetY: number }
 */
export function expandCanvasIfNeeded(
  x: number, 
  y: number, 
  width: number, 
  height: number
): { expanded: boolean; offsetX: number; offsetY: number } {
  let expanded = false;
  const padding = 200; // Extra padding when expanding
  
  // Check right edge
  const rightEdge = x + width;
  if (rightEdge > CANVAS_WIDTH) {
    CANVAS_WIDTH = rightEdge + padding;
    expanded = true;
  }
  
  // Check bottom edge
  const bottomEdge = y + height;
  if (bottomEdge > CANVAS_HEIGHT) {
    CANVAS_HEIGHT = bottomEdge + padding;
    expanded = true;
  }
  
  return { expanded, offsetX: 0, offsetY: 0 };
}

export const MARGIN_BETWEEN_COMPONENTS = 5;

export const RESIZE_POINT_RADIUS = 2;

// ========================================
// WIRE ROUTING CONFIGURATION
// ========================================
// Controls how wires are routed between components:
//
// false (default): Orthogonal routing with only 90-degree turns
//   - Professional PCB-like appearance
//   - Easier to trace connections
//   - Standard for most circuit diagrams
//
// true: Diagonal routing with 45-degree turns enabled
//   - Shorter wire paths
//   - More compact layouts
//   - Reduced visual clutter
//
// See docs/WIRE_ROUTING.md for more details
export const USE_45_DEGREE_WIRE_TURNS = true;
