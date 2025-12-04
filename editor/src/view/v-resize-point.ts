import { Circle } from "@svgdotjs/svg.js";
import { G } from "@svgdotjs/svg.js";
import { GRID_SIZE, RESIZE_POINT_RADIUS } from "../constants";
import { VComponent } from "./v-component";
import { MResizePointType, Position } from "../types.d";
import { PositionConverter } from "../utils/position-converter";

export class VResizePoint {
  // Private properties
  private readonly parent: G;
  private readonly component: VComponent;
  private type: MResizePointType;
  private isRightSide: 0 | 1;
  private isBottomSide: 0 | 1;
  private slope: number;
  private intercept: number;
  private point: { x: number; y: number };
  private pointCircle!: Circle;

  constructor(svgCanvas: G, component: VComponent, type: MResizePointType) {
    this.parent = svgCanvas;
    this.component = component;
    this.type = type;
    this.isRightSide =
      type === MResizePointType.TOP_RIGHT ||
      type === MResizePointType.BOTTOM_RIGHT
        ? 1
        : 0;
    this.isBottomSide =
      type === MResizePointType.BOTTOM_LEFT ||
      type === MResizePointType.BOTTOM_RIGHT
        ? 1
        : 0;
    this.point = { x: 0, y: 0 };
    this.slope = 0;
    this.intercept = 0;

    this.initialize();
  }

  /**
   * Initializes the resize point by calculating its position,
   * creating SVG elements, and setting up event listeners
   * @private
   */
  private initialize(): void {
    this.calculatePosition();
    this.createSVGElements();
    this.updateSlopeAndIntercept();
    this.initEvents();
  }

  /**
   * Creates the SVG elements for the resize point
   * @private
   */
  private createSVGElements(): void {
    this.pointCircle = this.parent
      .circle(RESIZE_POINT_RADIUS * 2)
      .addClass("resize-point")
      .addClass(this.type)
      .move(
        this.point.x - RESIZE_POINT_RADIUS,
        this.point.y - RESIZE_POINT_RADIUS
      );
  }

  /**
   * Initializes the drag constraints for the resize point
   * @private
   */
  private updateSlopeAndIntercept(): void {
    const bbox = this.component.getBBox();
    const point = {
      x: this.isRightSide * bbox.width + bbox.x,
      y: this.isBottomSide * bbox.height + bbox.y,
    };
    const diagonal = {
      x: this.isRightSide == 0 ? 1 : 0,
      y: this.isBottomSide == 0 ? 1 : 0,
    };
    const diagonalPoint = {
      x: diagonal.x * bbox.width + bbox.x,
      y: diagonal.y * bbox.height + bbox.y,
    };

    if (point.x === diagonalPoint.x) {
      this.slope = Infinity;
      this.intercept = point.x;
    } else {
      this.slope = (diagonalPoint.y - point.y) / (diagonalPoint.x - point.x);
      this.intercept = diagonalPoint.y - this.slope * point.x;
      if (
        (this.isRightSide == 0 && this.isBottomSide == 1) ||
        (this.isRightSide == 1 && this.isBottomSide == 1)
      ) {
        this.intercept += bbox.height;
      } else {
        this.intercept -= bbox.height;
      }
    }
  }

  /**
   * Initializes event listeners for the resize point
   * @private
   */
  private initEvents(): void {
    this.pointCircle.draggable();
    this.pointCircle.on(
      "dragstart.namespace",
      this.onDragStart.bind(this) as EventListener
    );
    this.pointCircle.on(
      "dragmove.namespace",
      this.onDrag.bind(this) as EventListener
    );
    this.pointCircle.on(
      "dragend.namespace",
      this.onDragEnd.bind(this) as EventListener
    );
  }

  /**
   * Handles the start of a drag operation
   * @param event - The drag start event
   * @private
   */
  private onDragStart(event: CustomEvent): void {}

  /**
   * Handles the drag movement
   * @param event - The drag move event
   * @private
   */
  private onDrag(event: CustomEvent): void {
    event.preventDefault();
    const position = event.detail.box;
    const closedPoint = this.closestPointOnSegment(position.x, position.y);
    this.point = PositionConverter.positionToRoundPosition(closedPoint);
    this.updateVisuals();

    const { rectPosition, newWidth, newHeight } =
      this.calculateResizeDimensions();
    if (
      !this.component
        .getmComponent()
        .tryNewSize(rectPosition, newWidth, newHeight)
    ) {
      this.calculatePosition();
      this.updateVisuals();
    }
  }

  /**
   * Calculates the new dimensions and position for resizing
   * @returns Object containing the new position and dimensions
   * @private
   */
  private calculateResizeDimensions(): {
    rectPosition: Position;
    newWidth: number;
    newHeight: number;
  } {
    const rectbbox = this.component.getBBox();
    let rectPosition: Position = { x: 0, y: 0 };
    let newWidth = 0;
    let newHeight = 0;

    if (this.isRightSide === 0 && this.isBottomSide === 0) {
      newWidth = rectbbox.x - this.point.x + rectbbox.width;
      newHeight = rectbbox.y - this.point.y + rectbbox.height;
      rectPosition = { x: this.point.x, y: this.point.y };
    } else if (this.isRightSide === 1 && this.isBottomSide === 0) {
      newWidth = this.point.x - rectbbox.x;
      newHeight = rectbbox.y - this.point.y + rectbbox.height;
      rectPosition = { x: this.point.x - newWidth, y: this.point.y };
    } else if (this.isRightSide === 1 && this.isBottomSide === 1) {
      newWidth = this.point.x - rectbbox.x;
      newHeight = this.point.y - rectbbox.y;
      rectPosition = { x: rectbbox.x, y: rectbbox.y };
    } else if (this.isRightSide === 0 && this.isBottomSide === 1) {
      newWidth = rectbbox.x - this.point.x + rectbbox.width;
      newHeight = this.point.y - rectbbox.y;
      rectPosition = { x: this.point.x, y: this.point.y - newHeight };
    }

    return { rectPosition, newWidth, newHeight };
  }

  private onDragEnd(event: CustomEvent): void {}

  /**
   * Finds the closest point on the diagonal line to the given coordinates
   * @param px - X coordinate to find closest point to
   * @param py - Y coordinate to find closest point to
   * @returns The closest point on the diagonal line
   * @private
   */
  private closestPointOnSegment(
    px: number,
    py: number
  ): { x: number; y: number } {
    if (!isFinite(this.slope)) {
      return { x: this.intercept, y: py };
    }

    let x =
      (px + this.slope * (py - this.intercept)) / (1 + this.slope * this.slope);
    x = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const y = this.slope * x + this.intercept;

    return { x, y };
  }

  /**
   * Updates the visual appearance of the resize point
   */
  private updateVisuals(): void {
    this.pointCircle.move(
      this.point.x - RESIZE_POINT_RADIUS,
      this.point.y - RESIZE_POINT_RADIUS
    );
  }

  /**
   * Calculates the position of the resize point based on the component's position
   */
  private calculatePosition(): void {
    const bbox = this.component.getBBox();
    this.point = {
      x: this.isRightSide * bbox.width + bbox.x,
      y: this.isBottomSide * bbox.height + bbox.y,
    };
  }

  /**
   * Updates the position and visuals of the resize point
   */
  public updatePosition(): void {
    this.calculatePosition();
    this.updateVisuals();
    this.updateSlopeAndIntercept();
  }

  public remove(): void {
    this.pointCircle.off("dragstart.namespace");
    this.pointCircle.off("dragmove.namespace");
    this.pointCircle.off("dragend.namespace");
    this.pointCircle.remove();
  }
}
