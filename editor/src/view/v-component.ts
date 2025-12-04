import { G, Image, Rect, Text, Line } from "@svgdotjs/svg.js";
import { MComponent } from "../models/m-component";
import { Box } from "@svgdotjs/svg.js";
import { MComponentPin } from "../models/m-component-pin";
import { MComponentObserver } from "../contracts";
import { ComponentMetaData, VComponentManager } from "./v-component-manager";
import { VComponentPin } from "./v-component-pin";
import { VResizePoint } from "./v-resize-point";
import { ComponentSides, MResizePointType, Position } from "../types.d";
import { PositionConverter } from "../utils/position-converter";
import { MWire } from "../models/m-wire";
import { Svg } from "@svgdotjs/svg.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_SIZE } from "../constants";
import { PathFinder } from "../utils/path-finder";
import Swal from "sweetalert2";
import { CComponent } from "../communication/CComponent";

export class VComponent implements MComponentObserver {
  private canvas: Svg;
  private mComponent: MComponent;
  private parent: G;
  private componentGroup: G;
  private componentImage: Image;
  private componentOutline: Rect;
  private componentResizePointsGroup: G;
  private wasDragging = false;
  private startPosition: Position;

  private componentPinsGroup: G;
  private componentPins: VComponentPin[];
  private resizePoints: VResizePoint[] = [];
  private componentLabelText: Text | null = null;
  private componentLabelBackground: Rect | null = null;
  private componentLabelLine: Line | null = null;
  private componentLabelGroup: G | null = null;
  private labelOffset: Position | null = null; // Offset from component center

  constructor(canvas: Svg, MComponent: MComponent, parent: G) {
    this.canvas = canvas;
    this.mComponent = MComponent;
    this.parent = parent;
    this.componentGroup = this.parent
      .group()
      .attr({ id: `component-${MComponent.getId()}` });
    this.componentImage = this.componentGroup
      .image(MComponent.getSvgPath())
      .size(MComponent.getWidth(), MComponent.getHeight())
      .move(MComponent.getPosition().x, MComponent.getPosition().y)
      .addClass("component-image");
    this.componentOutline = this.componentGroup
      .rect(MComponent.getWidth(), MComponent.getHeight())
      .move(MComponent.getPosition().x, MComponent.getPosition().y)
      .addClass("component-outline");

    this.componentResizePointsGroup = this.componentGroup
      .group()
      .addClass("component-resize-points");

    this.componentPins = [];
    this.componentPinsGroup = this.componentGroup
      .group()
      .addClass("component-pins");

    this.startPosition = { x: 0, y: 0 };

    this.componentGroup.add(this.componentOutline);
    this.componentGroup.add(this.componentImage);
    this.componentGroup.add(this.componentPinsGroup);
    this.componentGroup.add(this.componentResizePointsGroup);

    this.mComponent.addObserver(this);
    this.mComponent.addObserver(new CComponent());

    this.initializeDrag();
    this.addResizePoints();
    this.componentImage.click(this.onClickHandler.bind(this));
    this.componentImage.on("dblclick", this.onDoubleClickHandler.bind(this));

    this.updateGrid();
  }

  private updateGrid(): void {
    const box = this.getBBox();
    const startCol = Math.floor(box.x / GRID_SIZE);
    const startRow = Math.floor(box.y / GRID_SIZE);
    const endCol = Math.floor((box.x + box.width) / GRID_SIZE) + 1;
    const endRow = Math.floor((box.y + box.height) / GRID_SIZE) + 1;

    // Clear all cells with this component's ID first
    PathFinder.getInstance().clearWithId(this.mComponent.getId());

    // Block new cells based on current position
    // grid[row][col] where row = y axis, col = x axis
    let blockedCount = 0;
    for (let col = startCol; col < endCol; col++) {
      for (let row = startRow; row < endRow; row++) {
        if (
          col >= 0 &&
          col < PathFinder.getInstance().getCols() &&
          row >= 0 &&
          row < PathFinder.getInstance().getRows()
        ) {
          PathFinder.getInstance().block(row, col, this.mComponent.getId());
          blockedCount++;
        }
      }
    }

    // Debug: uncomment to see blocking details
    // console.log(`[Component ${this.mComponent.getId()}] Blocked ${blockedCount} cells: col[${startCol}-${endCol}] row[${startRow}-${endRow}]`);

    for (const pin of this.componentPins) {
      pin.updateGrid();
    }
  }

  private addResizePoints(): void {
    const resizePointsTypes = [
      MResizePointType.TOP_LEFT,
      MResizePointType.TOP_RIGHT,
      MResizePointType.BOTTOM_LEFT,
      MResizePointType.BOTTOM_RIGHT,
    ];

    this.resizePoints = resizePointsTypes.map(
      (type) => new VResizePoint(this.componentResizePointsGroup, this, type)
    );
  }

  public getMetaData(): ComponentMetaData {
    return {
      id: this.mComponent.getId(),
      relpos: this.mComponent.getPosition(),
      component: this,
    };
  }

  public clone(position: Position): MComponent {
    return this.mComponent.clone(position);
  }

  public getWires(): MWire[] {
    return this.mComponent.getMWires();
  }

  public onComponentSizeChange(component: MComponent): void {
    this.componentImage.size(component.getWidth(), component.getHeight());
    this.componentImage.move(
      component.getPosition().x,
      component.getPosition().y
    );
    this.componentOutline.size(component.getWidth(), component.getHeight());
    this.componentOutline.move(
      component.getPosition().x,
      component.getPosition().y
    );

    this.resizePoints.forEach((resizePoint) => {
      resizePoint.updatePosition();
    });

    this.updateGridAndWires();
  }

  public getPinById(pinId: number): MComponentPin | undefined {
    return this.mComponent
      .getMComponentPins()
      .find((pin) => pin.getId() === pinId);
  }

  public onSelectedChange(component: MComponent): void {
    if (component.isComponentSelected()) {
      this.componentOutline.addClass("selected");
      this.showComponentLabel();
    } else {
      this.componentOutline.removeClass("selected");
      this.hideComponentLabel();
    }
  }

  public isSelected(): boolean {
    return this.mComponent.isComponentSelected();
  }

  public move(dx: number, dy: number): void {
    const m = this.componentImage.node.getCTM(); // a,b,c,d,e,f
    if (m) {
      const a = m.a,
        b = m.b,
        c = m.c,
        d = m.d;
      const det = a * d - b * c;

      // convert world delta -> local delta: L^-1 * v
      const ldx = (d * dx - c * dy) / det;
      const ldy = (-b * dx + a * dy) / det;

      this.mComponent.setPosition({
        x: this.mComponent.getPosition().x + ldx,
        y: this.mComponent.getPosition().y + ldy,
      });
    }
  }

  onPositionChange(component: MComponent): void {
    this.componentImage.move(
      component.getPosition().x,
      component.getPosition().y
    );
    this.componentOutline.move(
      component.getPosition().x,
      component.getPosition().y
    );

    this.updateGridAndWires();

    this.resizePoints.forEach((resizePoint) => {
      resizePoint.updatePosition();
    });

    // Update label position if visible
    if (this.componentLabelText) {
      this.updateComponentLabelPosition();
    }
  }

  private initializeDrag(): void {
    this.componentImage.draggable();

    this.componentImage.on(
      "dragstart.namespace",
      this.onDragStart.bind(this) as EventListener
    );
    this.componentImage.on(
      "dragmove.namespace",
      this.onDrag.bind(this) as EventListener
    );
    this.componentImage.on(
      "dragend.namespace",
      this.onDragEnd.bind(this) as EventListener
    );
  }

  private onDragStart(event: CustomEvent<{ box: Box }>): void {
    event.preventDefault();
    const box = event.detail.box;

    let position = PositionConverter.positionToRoundPosition({
      x: box.x,
      y: box.y,
    });
    this.mComponent.setPrevPosition({
      x: position.x,
      y: position.y,
    });
    this.startPosition = PositionConverter.positionToRoundPosition(box);

    this.wasDragging = false;
  }

  private onDrag(event: CustomEvent<{ box: Box }>): void {
    event.preventDefault();
    const box = event.detail.box;
    const pos = PositionConverter.positionToRoundPosition(box);
    const dx = pos.x - this.startPosition.x;
    const dy = pos.y - this.startPosition.y;
    if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) return; // No movement
    const currPos = this.mComponent.getPosition();

    const newPos = { x: currPos.x + dx, y: currPos.y + dy };

    // Check for negative position (disallow)
    if (newPos.x < 0 || newPos.y < 0) {
      return; // Don't move into negative coordinates
    }

    this.mComponent.setPosition(newPos);
    // Canvas will auto-expand if component goes beyond current bounds

    this.startPosition = pos;
    this.wasDragging = true;

    if (!VComponentManager.isComponentColliding(this)) {
      this.componentOutline.removeClass("colliding");
    } else {
      this.componentOutline.addClass("colliding");
    }
  }

  private onDragEnd(event: CustomEvent<{ box: Box }>): void {
    event.preventDefault();

    if (VComponentManager.isComponentColliding(this)) {
      this.mComponent.revertPosition();
      this.componentOutline.removeClass("colliding");
    }

    setTimeout(() => {
      this.wasDragging = false;
    }, 0);
  }

  private onClickHandler(event: MouseEvent): void {
    event.preventDefault();
    if (this.wasDragging) {
      return;
    }
    this.mComponent.setSelected(!this.mComponent.isComponentSelected());
  }

  private async onDoubleClickHandler(event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const result = await Swal.fire({
      title: "Edit Component",
      html: `
        <div style="text-align: left;">
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Component Name:</label>
          <input id="swal-component-name" class="swal2-input" style="margin: 0; background-color: #f0f0f0;" value="${this.mComponent.getComponentName()}" readonly disabled>
          
          <label style="display: block; margin-top: 15px; margin-bottom: 5px; font-weight: 500;">Component Value:</label>
          <input id="swal-component-value" class="swal2-input" style="margin: 0;" value="${this.mComponent.getComponentValue()}" placeholder="Enter value">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#0066ff",
      cancelButtonText: "Cancel",
      didOpen: () => {
        const input = document.getElementById(
          "swal-component-value"
        ) as HTMLInputElement;
        if (input) {
          input.focus();
          input.select();

          input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const confirmButton = Swal.getConfirmButton();
              if (confirmButton) {
                confirmButton.click();
              }
            }
          });
        }
      },
      preConfirm: () => {
        const valueInput = document.getElementById(
          "swal-component-value"
        ) as HTMLInputElement;
        const value = valueInput.value.trim();

        // Allow empty values
        return { value };
      },
    });

    if (result.isConfirmed && result.value) {
      this.mComponent.setComponentValue(result.value.value);
      // Update label if it's visible
      if (this.componentLabelText) {
        this.updateComponentLabelText();
      }
    }
  }

  private showComponentLabel(): void {
    // Create label group if it doesn't exist
    if (!this.componentLabelGroup) {
      this.componentLabelGroup = this.componentGroup
        .group()
        .addClass("component-label-group")
        .attr({ "pointer-events": "all" });

      // Make the group draggable with constraints
      this.componentLabelGroup.draggable().on("dragmove", (e: any) => {
        const pos = this.mComponent.getPosition();
        const width = this.mComponent.getWidth();
        const height = this.mComponent.getHeight();
        const componentCenterX = pos.x + width / 2;
        const componentCenterY = pos.y + height / 2;

        // Get the current position of the label group
        const labelBox = this.componentLabelGroup!.bbox();
        const labelCenterX = labelBox.cx;
        const labelCenterY = labelBox.cy;

        // Update offset from component center
        this.labelOffset = {
          x: labelCenterX - componentCenterX,
          y: labelCenterY - componentCenterY,
        };

        // Update the line
        this.updateLabelLine();
      });
    }

    // Create dotted line if it doesn't exist
    if (!this.componentLabelLine) {
      this.componentLabelLine = this.componentGroup
        .line(0, 0, 0, 0)
        .addClass("component-label-line")
        .stroke({ color: "#999", width: 1, dasharray: "3,3" })
        .attr({ "pointer-events": "none" });
    }

    // Create background rectangle in the label group
    if (!this.componentLabelBackground) {
      this.componentLabelBackground = this.componentLabelGroup
        .rect(0, 0)
        .addClass("component-label-bg")
        .fill("#ffffff")
        .stroke({ color: "#ccc", width: 1 })
        .radius(4);
    }

    // Create text in the label group
    if (!this.componentLabelText) {
      this.componentLabelText = this.componentLabelGroup
        .text("")
        .addClass("component-label");
    }

    this.updateComponentLabelText();
    // Use setTimeout to ensure text has rendered before positioning
    setTimeout(() => {
      this.updateComponentLabelPosition();
    }, 0);

    this.componentLabelLine.show();
    this.componentLabelGroup.show();
  }

  private hideComponentLabel(): void {
    if (this.componentLabelGroup) {
      this.componentLabelGroup.hide();
    }
    if (this.componentLabelLine) {
      this.componentLabelLine.hide();
    }
  }

  private updateComponentLabelText(): void {
    if (this.componentLabelText) {
      const name = this.mComponent.getComponentName();
      const value = this.mComponent.getComponentValue();
      // Only show colon if value is not empty
      const labelText = value && value.trim() ? `${name}: ${value}` : name;
      this.componentLabelText.text(labelText);
      // Update position after text changes
      setTimeout(() => {
        this.updateComponentLabelPosition();
      }, 0);
    }
  }

  private updateComponentLabelPosition(): void {
    if (
      this.componentLabelText &&
      this.componentLabelText.node &&
      this.componentLabelGroup
    ) {
      // Get component position from model
      const pos = this.mComponent.getPosition();
      const width = this.mComponent.getWidth();
      const height = this.mComponent.getHeight();

      // Component center
      const componentCenterX = pos.x + width / 2;
      const componentCenterY = pos.y + height / 2;

      // Initialize label offset if not set (first time)
      if (this.labelOffset === null) {
        const margin = 10;
        const textNode = this.componentLabelText.node;
        const textBBox = textNode.getBBox();
        // Position above component: negative Y = (half height + text height + margin)
        this.labelOffset = {
          x: 0,
          y: -(height / 2 + textBBox.height + margin),
        };
      }

      // Get text dimensions
      try {
        const textNode = this.componentLabelText.node;
        const textBBox = textNode.getBBox();

        // Calculate label center position using offset
        const labelCenterX = componentCenterX + this.labelOffset.x;
        const labelCenterY = componentCenterY + this.labelOffset.y;

        // Position text centered
        const padding = 6;
        const textX = labelCenterX - textBBox.width / 2;
        const textY = labelCenterY - textBBox.height / 2;

        // Use x() and y() methods for absolute positioning
        this.componentLabelText.x(textX).y(textY);

        // Position background rectangle
        if (this.componentLabelBackground) {
          this.componentLabelBackground
            .width(textBBox.width + padding * 2)
            .height(textBBox.height + padding * 2)
            .x(textX - padding)
            .y(textY - padding);
        }

        // Update the line
        this.updateLabelLine();
      } catch (e) {
        // Fallback if getBBox fails
        if (this.labelOffset) {
          const textX = componentCenterX + this.labelOffset.x;
          const textY = componentCenterY + this.labelOffset.y;
          this.componentLabelText.x(textX).y(textY);
        }
      }
    }
  }

  private updateLabelLine(): void {
    if (this.componentLabelLine && this.componentLabelGroup) {
      const pos = this.mComponent.getPosition();
      const width = this.mComponent.getWidth();
      const height = this.mComponent.getHeight();
      const componentCenterX = pos.x + width / 2;
      const componentCenterY = pos.y + height / 2;

      const labelBox = this.componentLabelGroup.bbox();
      const labelCenterX = labelBox.cx;
      const labelCenterY = labelBox.cy;

      this.componentLabelLine.plot(
        componentCenterX,
        componentCenterY,
        labelCenterX,
        labelCenterY
      );
    }
  }

  public onComponentValueChange(component: MComponent): void {
    // Update label if it's currently visible
    if (this.componentLabelText && component.isComponentSelected()) {
      this.updateComponentLabelText();
    }
  }

  onComponentRotate(component: MComponent): void {
    let box = this.componentImage.bbox();
    this.componentImage.rotate(90, box.cx, box.cy);

    box = this.componentOutline.bbox(); // element’s bbox in SVG coords
    this.componentOutline.rotate(90, box.cx, box.cy); // 90° clockwise about its center

    box = this.componentPinsGroup.bbox(); // element’s bbox in SVG coords
    this.componentPinsGroup.rotate(90, box.cx, box.cy); // 90° clockwise about its center

    this.updateGridAndWires();
  }

  onPinInitialized(component: MComponent, pins: MComponentPin[]): void {
    // Remove existing pins from componentPinsGroup
    this.componentPinsGroup.clear();
    // Render all pins
    this.componentPins = pins.map(
      (pin) =>
        new VComponentPin(
          this.canvas,
          this,
          component,
          pin,
          this.componentPinsGroup
        )
    );
    this.updateGrid();
  }

  public getSide(curr: ComponentSides): ComponentSides {
    if (this.mComponent.isComponentXFlipped()) {
      if (curr === ComponentSides.LEFT) return ComponentSides.RIGHT;
      if (curr === ComponentSides.RIGHT) return ComponentSides.LEFT;
    }
    if (this.mComponent.isComponentYFlipped()) {
      if (curr === ComponentSides.TOP) return ComponentSides.BOTTOM;
      if (curr === ComponentSides.BOTTOM) return ComponentSides.TOP;
    }

    return (curr + this.mComponent.getNumberOfRotations()) % 4;
  }
  public getAlpha(curr: ComponentSides, alpha: number) {
    if (this.mComponent.isComponentXFlipped()) {
      alpha = 1 - alpha;
    }
    if (this.mComponent.isComponentYFlipped()) {
      alpha = 1 - alpha;
    }
    return alpha;
  }

  public getBBox(): Box {
    return this.componentImage.rbox(this.canvas);
  }
  public getmComponent(): MComponent {
    return this.mComponent;
  }
  public select(): void {
    this.mComponent.setSelected(true);
  }
  public deselect(): void {
    this.mComponent.setSelected(false);
  }

  public delete(): void {
    this.mComponent.delete();
    this.componentGroup.remove();
  }

  private updateGridAndWires(): void {
    this.updateGrid();
    for (const wire of this.mComponent.getMWires()) {
      wire.updatePath();
    }
  }

  onComponentFlipY(component: MComponent): void {
    this.componentImage.scale(1, -1);
    this.componentOutline.scale(1, -1);
    this.componentPinsGroup.scale(1, -1);

    this.updateGridAndWires();
  }

  onComponentFlipX(component: MComponent): void {
    this.componentImage.scale(-1, 1);
    this.componentOutline.scale(-1, 1);
    this.componentPinsGroup.scale(-1, 1);

    this.updateGridAndWires();
  }

  flipX(): void {
    this.mComponent.flipX();
  }

  flipY(): void {
    this.mComponent.flipY();
  }
  rotate(): void {
    this.mComponent.doRotation();
  }
}
