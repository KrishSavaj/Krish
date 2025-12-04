import { G } from "@svgdotjs/svg.js";
import { MWire } from "../models/m-wire";
import { Path } from "@svgdotjs/svg.js";
import { GRID_SIZE } from "../constants";
import { MWireObserver } from "../contracts";
import { MWireManager } from "../models/m-wire-manager";
import { PathFinder } from "../utils/path-finder";
import { Pair } from "../types";

export class Wire implements MWireObserver {
  private parentGroup: G;
  private path: Path;
  private mWire: MWire;
  private currentPath: Pair[] = [];  // Store current path for cleanup
  constructor(mWire: MWire, parentGroup: G) {
    this.mWire = mWire;
    this.parentGroup = parentGroup;
    this.path = this.parentGroup
      .path("")
      .attr({
        fill: "none",
        stroke: "green",
        strokeWidth: 1,
        "data-pin1-id": mWire.getPin1().getId(),
        "data-pin2-id": mWire.getPin2().getId(),
      })
      .addClass("wire-path");
    this.onPathChange(this.mWire);

    this.mWire.addObserver(this);
  }

  onPathChange(mWire: MWire): void {
    const pin1Pos = mWire.getPin1().getGlobalPosition();
    const pin2Pos = mWire.getPin2().getGlobalPosition();

    // Remove old path from density grid before calculating new one
    if (this.currentPath.length > 0) {
      PathFinder.getInstance().removeWirePath(this.currentPath);
    }

    const path = MWireManager.getInstance().getPath(pin1Pos, pin2Pos);
    if (path && path.length > 0) {
      // Record new path in density grid for greedy overlap avoidance
      PathFinder.getInstance().recordWirePath(path);
      this.currentPath = path;
      
      // Start from exact pin1 position
      let pathString = `M${pin1Pos.x} ${pin1Pos.y}`;
      
      // Add all grid-aligned waypoints
      path.forEach(([row, col]: [number, number]) => {
        const x = col * GRID_SIZE;  // col is x-axis
        const y = row * GRID_SIZE;  // row is y-axis
        pathString += ` L${x} ${y}`;
      });
      
      // End at exact pin2 position
      pathString += ` L${pin2Pos.x} ${pin2Pos.y}`;
      this.path.attr({ d: pathString });
    } else {
      this.currentPath = [];
      this.path.attr({ d: "" });
    }
  }
  remove(): void {
    // Remove path from density grid when wire is deleted
    if (this.currentPath.length > 0) {
      PathFinder.getInstance().removeWirePath(this.currentPath);
      this.currentPath = [];
    }
    this.path.remove();
  }
}
