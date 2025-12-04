import { G } from "@svgdotjs/svg.js";
import { Wire } from "./v-wire";
import { Svg } from "@svgdotjs/svg.js";
import { MWireManagerObserver } from "../contracts";
import { MWireManager } from "../models/m-wire-manager";
import { MWire } from "../models/m-wire";

export class VWireManager implements MWireManagerObserver {
  private canvas: Svg;
  private wireGroup: G;
  private wires: Map<number, Wire>;

  constructor(parent: Svg, wireGroupId: string) {
    this.canvas = parent;
    this.wireGroup = parent.group().attr({ id: wireGroupId });
    this.wires = new Map<number, Wire>();

    MWireManager.getInstance().addObserver(this);
  }
  onWireAdded(mWire: MWire): void {
    const wire = new Wire(mWire, this.wireGroup);
    this.wires.set(mWire.getId(), wire);
  }
  onWireRemoved(mWire: MWire): void {
    const wire = this.wires.get(mWire.getId());
    if (wire) {
      wire.remove();
      this.wires.delete(mWire.getId());
    }
  }
  init(): void {}
}
