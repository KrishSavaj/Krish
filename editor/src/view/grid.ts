import { G, Svg } from "@svgdotjs/svg.js";
import { GRID_SIZE, OUTER_GRID_INTERVAL } from "../constants";

export class Grid {
  private canvas: Svg;
  private gridGroup: G;

  constructor(parent: Svg, gridGroupId: string) {
    this.canvas = parent;
    this.gridGroup = parent.group().attr({ id: gridGroupId });
  }
  init(): void {
    this.drawGrid();
  }
  
  /**
   * Update grid when canvas dimensions change
   */
  public updateDimensions(): void {
    // Clear existing grid
    this.gridGroup.clear();
    // Redraw with new dimensions
    this.drawGrid();
  }

  /**
   * Draws the grid on the provided group
   */
  private drawGrid(): void {
    this.drawVerticalLines();
    this.drawHorizontalLines();
  }

  /**
   * Draws vertical grid lines
   */
  private drawVerticalLines(): void {
    let outerGrid = OUTER_GRID_INTERVAL;

    const width = this.canvas.node.clientWidth;

    for (let x = 0; x <= width; x += GRID_SIZE) {
      outerGrid--;
      const strokeColor = outerGrid <= 0 ? "#ccc" : "#eee";

      this.gridGroup.line(x, 0, x, this.canvas.node.clientHeight).attr({
        stroke: strokeColor,
        strokeWidth: 1,
      });

      if (outerGrid <= 0) {
        outerGrid = OUTER_GRID_INTERVAL;
      }
    }
  }

  /**
   * Draws horizontal grid lines
   *
   */
  private drawHorizontalLines(): void {
    let outerGrid = OUTER_GRID_INTERVAL;

    const height = this.canvas.node.clientHeight;

    for (let y = 0; y < height; y += GRID_SIZE) {
      outerGrid--;
      const strokeColor = outerGrid <= 0 ? "#ccc" : "#eee";

      this.gridGroup.line(0, y, this.canvas.node.clientWidth, y).attr({
        stroke: strokeColor,
        strokeWidth: 1,
      });

      if (outerGrid <= 0) {
        outerGrid = OUTER_GRID_INTERVAL;
      }
    }
  }
}
