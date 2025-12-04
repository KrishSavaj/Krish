import { GRID_SIZE } from "../constants";
import { Pair, Position } from "../types";

export class PositionConverter {
  static canvas: Element;
  
  /**
   * Convert mouse event to canvas position accounting for scroll
   * The canvas is the svg-wrapper div that contains the SVG
   */
  static convertFormMouseEventToPosition(event: MouseEvent): Position {
    if (!PositionConverter.canvas) {
      throw new Error("Canvas element is not set");
    }
    
    const rect = PositionConverter.canvas.getBoundingClientRect();
    
    // The canvas IS the svg-wrapper, so get its scroll position
    const scrollLeft = (PositionConverter.canvas as HTMLElement).scrollLeft || 0;
    const scrollTop = (PositionConverter.canvas as HTMLElement).scrollTop || 0;
    
    // Calculate position relative to the canvas, accounting for scroll
    return {
      x: event.clientX - rect.left + scrollLeft,
      y: event.clientY - rect.top + scrollTop,
    };
  }
  static convertFormMouseEventToPositionWithRound(event: MouseEvent): Position {
    return PositionConverter.positionToRoundPosition(
      PositionConverter.convertFormMouseEventToPosition(event)
    );
  }

  static positionToRoundPosition(position: Position): Position {
    return {
      x: Math.floor(position.x / GRID_SIZE) * GRID_SIZE,
      y: Math.floor(position.y / GRID_SIZE) * GRID_SIZE,
    };
  }

  static positionToPairInArray(position: Position): Pair {
    // PathFinder grid is grid[row][col] and Pair is [row, col]
    // where row = y / GRID_SIZE and col = x / GRID_SIZE
    return [
      Math.floor(position.y / GRID_SIZE),  // row (y-axis)
      Math.floor(position.x / GRID_SIZE),  // col (x-axis)
    ];
  }
}
