import { Svg } from "@svgdotjs/svg.js";
import { expandCanvasIfNeeded, CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants";
import { PathFinder } from "./path-finder";

/**
 * Manages canvas resizing and expansion
 */
export class CanvasManager {
  private static instance: CanvasManager;
  private canvas: Svg | null = null;
  private gridUpdateCallback: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): CanvasManager {
    if (!CanvasManager.instance) {
      CanvasManager.instance = new CanvasManager();
    }
    return CanvasManager.instance;
  }

  /**
   * Initialize with canvas reference
   */
  public initialize(canvas: Svg, gridUpdateCallback: () => void): void {
    this.canvas = canvas;
    this.gridUpdateCallback = gridUpdateCallback;
  }

  /**
   * Check if component bounds require canvas expansion
   * Handles expansion to the right and bottom only
   * @param x - Component x position
   * @param y - Component y position
   * @param width - Component width
   * @param height - Component height
   * @returns The offset applied (always 0 for right/bottom expansion)
   */
  public checkAndExpandCanvas(
    x: number, 
    y: number, 
    width: number, 
    height: number
  ): { offsetX: number; offsetY: number } {
    if (!this.canvas) {
      console.warn("[CanvasManager] Canvas not initialized");
      return { offsetX: 0, offsetY: 0 };
    }

    // Check if component goes beyond current canvas bounds (right/bottom)
    const result = expandCanvasIfNeeded(x, y, width, height);

    if (result.expanded) {
      console.log(`[CanvasManager] Canvas expanded to ${CANVAS_WIDTH}×${CANVAS_HEIGHT}`);
      
      // Update canvas size
      this.canvas.size(CANVAS_WIDTH, CANVAS_HEIGHT);
      this.canvas.viewbox(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Update grid
      if (this.gridUpdateCallback) {
        this.gridUpdateCallback();
      }
      
      // Update PathFinder grid (no offset for right/bottom expansion)
      PathFinder.getInstance().reinitializeGrid(0, 0);
    }
    
    return { offsetX: 0, offsetY: 0 };
  }

  /**
   * Get current canvas dimensions
   */
  public getCanvasDimensions(): { width: number; height: number } {
    return { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
  }
}
