import { G, Svg } from "@svgdotjs/svg.js";
import { MComponentPin } from "../models/m-component-pin";
import { Path } from "@svgdotjs/svg.js";
import { GRID_SIZE, USE_45_DEGREE_WIRE_TURNS } from "../constants";
import { PositionConverter } from "../utils/position-converter";
import { PathFinder } from "../utils/path-finder";
import { MTemporaryWiresObserver } from "../contracts";
import { MWireManager } from "../models/m-wire-manager";

export class TemporaryWires implements MTemporaryWiresObserver {
  private canvas: Svg;
  private wireGroup: G;
  private tempWires: Map<number, Path>;

  constructor(parent: Svg, wireGroupId: string) {
    this.canvas = parent;
    this.wireGroup = parent.group().attr({ id: wireGroupId });
    this.tempWires = new Map<number, Path>();

    MWireManager.getInstance().addTemporaryWiresObserver(this);
  }

  onSelectionChange(selectedComponentPins: MComponentPin[]): void {
    if (selectedComponentPins.length > 0) {
      this.canvas.on("mousemove", (e: Event) =>
        this.handleMouseMove(e as MouseEvent, selectedComponentPins)
      );
    } else {
      for (const [id, wire] of this.tempWires) {
        if (wire) {
          wire.remove();
          this.tempWires.delete(id);
        }
      }
      this.canvas.off("mousemove");
    }
  }
  handleMouseMove(
    event: MouseEvent,
    selectedComponentPins: MComponentPin[]
  ): void {
    const mousePositionRaw =
      PositionConverter.convertFormMouseEventToPosition(event);
    const mousePosition =
      PositionConverter.convertFormMouseEventToPositionWithRound(event);
    const pathUpdated: Map<number, boolean> = new Map<number, boolean>();
    for (const [id, wire] of this.tempWires) {
      if (wire) {
        pathUpdated.set(id, false);
      }
    }
    for (const pin of selectedComponentPins) {
      pathUpdated.set(pin.getId(), true);
      const pinPosition = PositionConverter.positionToPairInArray(
        pin.getGlobalPosition()
      );
      const tempWire = this.tempWires.get(pin.getId());
      if (!tempWire) {
        const newWire = this.wireGroup
          .path("")
          .attr({
            fill: "none",
            stroke: "red",
            strokeWidth: 1,
            "data-pin-id": pin.getId(),
          })
          .addClass("temporary-wire");
        this.tempWires.set(pin.getId(), newWire);
      }

      const wire = this.tempWires.get(pin.getId());
      if (wire) {
        const path = PathFinder.getInstance().aStarSearch(
          pinPosition,
          PositionConverter.positionToPairInArray(mousePosition),
          USE_45_DEGREE_WIRE_TURNS
        );
        if (path && path.length > 0) {
          // Start from exact pin position
          const pinGlobalPos = pin.getGlobalPosition();
          let pathString = `M${pinGlobalPos.x} ${pinGlobalPos.y}`;
          
          // Add all grid-aligned waypoints
          path.forEach(([row, col]: [number, number]) => {
            const x = col * GRID_SIZE;  // col is x-axis
            const y = row * GRID_SIZE;  // row is y-axis
            pathString += ` L${x} ${y}`;
          });
          
          // End at exact mouse position
          pathString += ` L${mousePositionRaw.x} ${mousePositionRaw.y}`;
          wire.attr({ d: pathString });
        } else {
          wire.attr({ d: "" });
        }
      }
    }

    for (const [id, updated] of pathUpdated) {
      if (!updated) {
        const wire = this.tempWires.get(id);
        if (wire) {
          wire.remove();
          this.tempWires.delete(id);
        }
      }
    }
  }

  init(): void {}
}
