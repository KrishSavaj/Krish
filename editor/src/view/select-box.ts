import { G, Svg } from "@svgdotjs/svg.js";
import { Rect } from "@svgdotjs/svg.js";
import { VElementManager, VComponentManager } from "./v-component-manager";
import { Position } from "../types";
import { PositionConverter } from "../utils/position-converter";

export class SelectBox {
  private static parent: HTMLElement;
  private canvas: Svg;
  private selectBoxGroup: G;
  private selectionBox: Rect;
  private vElementManager: VElementManager;
  private startPosition: Position;

  constructor(
    parent: Svg,
    selectBoxGroupId: string,
    vElementManager: VElementManager
  ) {
    this.canvas = parent;
    this.selectBoxGroup = parent.group().attr({ id: selectBoxGroupId });
    this.selectionBox = this.selectBoxGroup
      .rect(0, 0)
      .fill("rgba(56, 72, 216, 0.1)")
      .stroke({ color: "#0808ff", width: 1 })
      .attr({ display: "none" }); // Initially hidden
    this.vElementManager = vElementManager;
    this.startPosition = { x: 0, y: 0 };
  }
  static setParent(parent: HTMLElement): void {
    SelectBox.parent = parent;
  }

  init(): void {
    this.mouseEventInitialize();
    this.moveEventInitialize();
  }

  private mouseEventInitialize(): void {
    SelectBox.parent.addEventListener("mousedown", (event: MouseEvent) => {
      if (event.button !== 0) return; // Left click only

      const startPoint = this.canvas.point(event.clientX, event.clientY);

      this.selectionBox.attr({
        x: startPoint.x,
        y: startPoint.y,
        width: 0,
        height: 0,
        display: "none",
      });

      const onMouseMove = (moveEvent: MouseEvent) => {
        const roundToGrid = (value: number) => Math.round(value / 5) * 5;

        const currentPoint = this.canvas.point(
          moveEvent.clientX,
          moveEvent.clientY
        );

        const x = roundToGrid(Math.min(startPoint.x, currentPoint.x));
        const y = roundToGrid(Math.min(startPoint.y, currentPoint.y));
        const width = roundToGrid(Math.abs(currentPoint.x - startPoint.x));
        const height = roundToGrid(Math.abs(currentPoint.y - startPoint.y));

        if (width <= 5 || height <= 5) {
          this.selectionBox.attr({ display: "none" });
          return;
        }
        this.selectionBox.attr({
          x,
          y,
          width,
          height,
          display: "block",
        });
        this.vElementManager.selectElementsInBox(
          startPoint.x,
          startPoint.y,
          currentPoint.x,
          currentPoint.y
        );
      };

      const onMouseUp = (upEvent: MouseEvent) => {
        const roundToGrid = (value: number) => Math.round(value / 5) * 5;
        const endPoint = this.canvas.point(upEvent.clientX, upEvent.clientY);

        const x = roundToGrid(Math.min(startPoint.x, endPoint.x));
        const y = roundToGrid(Math.min(startPoint.y, endPoint.y));
        const width = roundToGrid(Math.abs(endPoint.x - startPoint.x));
        const height = roundToGrid(Math.abs(endPoint.y - startPoint.y));

        this.selectionBox.attr({
          x,
          y,
          width,
          height,
          display: "block",
        });

        if (
          !this.vElementManager.selectElementsInBox(
            startPoint.x,
            startPoint.y,
            endPoint.x,
            endPoint.y
          )
        ) {
          // No elements selected - clear highlights
          VComponentManager.clearAllVTHighlights();
          this.selectionBox.attr({
            width: 0,
            height: 0,
            display: "none",
          });
        }
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }

  private moveEventInitialize(): void {
    this.selectionBox.draggable();
    this.selectionBox.on(
      "dragstart.namespace",
      this.onDragStart.bind(this) as EventListener
    );
    this.selectionBox.on(
      "dragmove.namespace",
      this.onDrag.bind(this) as EventListener
    );
    this.selectionBox.on(
      "dragend.namespace",
      this.onDragEnd.bind(this) as EventListener
    );
  }
  private onDragStart(event: CustomEvent<{ box: Position }>): void {
    event.preventDefault();
    this.selectionBox.attr({ cursor: "move" });
    const box = event.detail.box;
    this.startPosition = PositionConverter.positionToRoundPosition(box);
  }
  private onDrag(event: CustomEvent<{ box: Position }>): void {
    event.preventDefault();
    const box = event.detail.box;
    const pos = PositionConverter.positionToRoundPosition(box);

    const dx = pos.x - this.startPosition.x;
    const dy = pos.y - this.startPosition.y;
    if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) return; // No movement

    const currPos = this.selectionBox.bbox();

    this.selectionBox.attr({
      x: currPos.x + dx,
      y: currPos.y + dy,
    });
    this.vElementManager.moveSelectedComponents(dx, dy);

    this.startPosition = pos;
  }
  private onDragEnd(event: CustomEvent<{ box: Position }>): void {
    event.preventDefault();
  }
}
