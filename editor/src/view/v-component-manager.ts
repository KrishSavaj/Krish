import { Svg } from "@svgdotjs/svg.js";
import { MARGIN_BETWEEN_COMPONENTS } from "../constants";
import { G } from "@svgdotjs/svg.js";
import { VComponent } from "./v-component";
import { MComponent } from "../models/m-component";
import { Position } from "../types";
import { PositionConverter } from "../utils/position-converter";
import { MComponentManagerObserver } from "../contracts";
import { MComponentManager } from "../models/m-component-manager";
import { MWireManager } from "../models/m-wire-manager";
import { VirtualTerminal, Vt } from "./vt";

export interface VElementManager {
  selectElementsInBox(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): boolean;
  copySelectedElements(): void;
  pasteCopiedElements(event: MouseEvent): void;
  deleteSelectedElements(): void;
  moveSelectedComponents(dx: number, dy: number): void;
  flipXSelectedElements(): void;
  flipYSelectedElements(): void;
  rotateSelectedElements(): void;
}

export type ComponentMetaData = {
  id: number;
  relpos: Position;
  component: VComponent;
};

export type VTMetaData = {
  id: number;
  relpos: Position;
  designator: string;
  vt: VirtualTerminal;
};

export class VComponentManager
  implements MComponentManagerObserver, VElementManager
{
  private canvas: Svg;
  private componentsGroup: G;
  private static components: VComponent[] = [];
  private static virtualTerminals: VirtualTerminal[] = [];
  private static vtManager: Vt | null = null;
  private copiedComponents: ComponentMetaData[] = [];
  private copiedVTs: VTMetaData[] = [];

  constructor(parent: Svg, componentsGroupId: string) {
    this.canvas = parent;
    this.componentsGroup = parent.group().attr({ id: componentsGroupId });

    MComponentManager.getInstance().addObserver(this);
    
    // Listen for canvas expansion events to update component positions
    this.setupCanvasExpansionListener();
  }

  public static setVtManager(vtManager: Vt): void {
    VComponentManager.vtManager = vtManager;
  }

  onNewComponentAdded(component: MComponent): void {
    // Create a new visual component for the added model component
    const vComponent = this.createNewVComponent(component);
    VComponentManager.components.push(vComponent);
  }

  createNewVComponent(component: MComponent): VComponent {
    return new VComponent(this.canvas, component, this.componentsGroup);
  }

  init(): void {}
  
  /**
   * Setup listener for canvas expansion events
   */
  private setupCanvasExpansionListener(): void {
    window.addEventListener('canvas-expanded', ((event: CustomEvent) => {
      const { offsetX, offsetY } = event.detail;
      this.handleCanvasExpansion(offsetX, offsetY);
    }) as EventListener);
  }
  
  /**
   * Handle canvas expansion by updating all component positions
   */
  private handleCanvasExpansion(offsetX: number, offsetY: number): void {
    if (offsetX === 0 && offsetY === 0) return;
    
    console.log(`[VComponentManager] Shifting ${VComponentManager.components.length} components by (${offsetX}, ${offsetY})`);
    
    // Shift all existing components using the shiftPosition method
    VComponentManager.components.forEach((component) => {
      component.getmComponent().shiftPosition(offsetX, offsetY);
    });
    
    // Also shift virtual terminals
    VComponentManager.virtualTerminals.forEach((vt) => {
      const currentPos = vt.getPosition();
      vt['setPositionDirect']({
        x: currentPos.x + offsetX,
        y: currentPos.y + offsetY
      });
    });
  }

  public static addVirtualTerminal(vt: VirtualTerminal): void {
    VComponentManager.virtualTerminals.push(vt);
  }

  public static removeVirtualTerminal(vt: VirtualTerminal): void {
    VComponentManager.virtualTerminals = VComponentManager.virtualTerminals.filter(
      (v) => v !== vt
    );
  }

  public static getVirtualTerminals(): VirtualTerminal[] {
    return VComponentManager.virtualTerminals;
  }

  public static clearAllVTHighlights(): void {
    VComponentManager.virtualTerminals.forEach((vt) => {
      vt.setHighlighted(false);
    });
  }

  public static isComponentColliding(component: VComponent): boolean {
    if (VComponentManager.components.length <= 1) return false;

    if (component) {
      return VComponentManager.components.some(
        (comp) => comp !== component && this.isColliding(comp, component)
      );
    }

    for (let i = 0; i < VComponentManager.components.length - 1; i++) {
      for (let j = i + 1; j < VComponentManager.components.length; j++) {
        if (
          VComponentManager.isColliding(
            VComponentManager.components[i],
            VComponentManager.components[j]
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private static isColliding(comp1: VComponent, comp2: VComponent): boolean {
    const bbox1 = comp1.getBBox();
    const bbox2 = comp2.getBBox();

    return !(
      bbox1.x + bbox1.width + MARGIN_BETWEEN_COMPONENTS < bbox2.x ||
      bbox1.x > bbox2.x + bbox2.width + MARGIN_BETWEEN_COMPONENTS ||
      bbox1.y + bbox1.height + MARGIN_BETWEEN_COMPONENTS < bbox2.y ||
      bbox1.y > bbox2.y + bbox2.height + MARGIN_BETWEEN_COMPONENTS
    );
  }

  public selectElementsInBox(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): boolean {
    let flag = false;
    const x1 = Math.min(startX, endX);
    const y1 = Math.min(startY, endY);
    const x2 = Math.max(startX, endX);
    const y2 = Math.max(startY, endY);

    VComponentManager.components.forEach((component: VComponent) => {
      const bbox = component.getBBox();
      const isSelected =
        bbox.x < x2 &&
        bbox.x + bbox.width > x1 &&
        bbox.y < y2 &&
        bbox.y + bbox.height > y1;
      if (isSelected) {
        component.select();
        flag = true;
      } else {
        component.deselect();
      }
    });

    VComponentManager.virtualTerminals.forEach((vt: VirtualTerminal) => {
      const bbox = vt.getBBox();
      const isSelected =
        bbox.x < x2 &&
        bbox.x + bbox.width > x1 &&
        bbox.y < y2 &&
        bbox.y + bbox.height > y1;
      if (isSelected) {
        vt.setSelected(true);
        flag = true;
      } else {
        vt.setSelected(false);
      }
    });

    return flag;
  }

  public copySelectedElements(): void {
    this.copiedComponents = VComponentManager.components
      .filter((component) => component.isSelected())
      .map((component) => component.getMetaData());

    this.copiedVTs = VComponentManager.virtualTerminals
      .filter((vt) => vt.getIsSelected())
      .map((vt) => ({
        id: vt.getId(),
        relpos: { ...vt.getPosition() },
        designator: vt.getDesignator(),
        vt: vt,
      }));

    const allElements = [
      ...this.copiedComponents.map(c => ({ relpos: c.relpos })),
      ...this.copiedVTs.map(v => ({ relpos: v.relpos }))
    ];
    if (allElements.length <= 0) return;

    allElements.sort((a, b) => {
      if (a.relpos.x === b.relpos.x) {
        return a.relpos.y - b.relpos.y;
      }
      return a.relpos.x - b.relpos.x;
    });

    const firstPos = { ...allElements[0].relpos };
    
    // Adjust component positions
    for (let i = 0; i < this.copiedComponents.length; i++) {
      this.copiedComponents[i].relpos.x -= firstPos.x;
      this.copiedComponents[i].relpos.y -= firstPos.y;
    }
    
    // Adjust VT positions
    for (let i = 0; i < this.copiedVTs.length; i++) {
      this.copiedVTs[i].relpos.x -= firstPos.x;
      this.copiedVTs[i].relpos.y -= firstPos.y;
    }
  }

  public pasteCopiedElements(event: MouseEvent): void {
    if (this.copiedComponents.length === 0 && this.copiedVTs.length === 0) {
      console.log("No elements to paste");
      return;
    }
    const pos =
      PositionConverter.convertFormMouseEventToPositionWithRound(event);
    const componentMap = new Map<number, VComponent>();
    this.copiedComponents.forEach((metadata) => {
      const vComponent = this.createNewVComponent(
        metadata.component.clone({
          x: pos.x + metadata.relpos.x,
          y: pos.y + metadata.relpos.y,
        })
      );
      componentMap.set(metadata.id, vComponent);
      VComponentManager.components.push(vComponent);
    });

    // Paste virtual terminals
    this.copiedVTs.forEach((metadata) => {
      if (VComponentManager.vtManager) {
        const newVt = VComponentManager.vtManager.cloneVirtualTerminal(
          metadata.vt,
          {
            x: pos.x + metadata.relpos.x,
            y: pos.y + metadata.relpos.y,
          }
        );
      }
    });

    if (this.copiedComponents.length <= 1) return;

    setTimeout(() => {
      this.copiedComponents.forEach((metadata) => {
        const vComponent = componentMap.get(metadata.id);
        if (vComponent) {
          metadata.component.getWires().forEach((wire) => {
            if (wire.getPin1().getComponent().getId() === metadata.id) {
              const pin1Id = wire.getPin1().getId();
              const pin2Id = wire.getPin2().getId();
              const currPin = vComponent.getPinById(pin1Id);
              const otherPin = componentMap
                .get(wire.getPin2().getComponent().getId())
                ?.getPinById(pin2Id);
              if (currPin && otherPin) {
                MWireManager.getInstance().addWire(currPin, otherPin);
              }
            }
          });
        }
      });
    }, 1000);
  }

  public deleteSelectedElements(): void {
    VComponentManager.components
      .filter((component) => component.isSelected())
      .forEach((component) => component.delete());

    VComponentManager.components = VComponentManager.components.filter(
      (component) => !component.isSelected()
    );

    VComponentManager.virtualTerminals
      .filter((vt) => vt.getIsSelected())
      .forEach((vt) => vt.delete());

    VComponentManager.virtualTerminals = VComponentManager.virtualTerminals.filter(
      (vt) => !vt.getIsSelected()
    );
  }

  public moveSelectedComponents(dx: number, dy: number): void {
    VComponentManager.components
      .filter((component) => component.isSelected())
      .forEach((component) => component.move(dx, dy));

    VComponentManager.virtualTerminals
      .filter((vt) => vt.getIsSelected())
      .forEach((vt) => {
        const pos = vt.getPosition();
        vt.setPosition({ x: pos.x + dx, y: pos.y + dy });
      });
  }

  flipXSelectedElements(): void {
    VComponentManager.components
      .filter((component) => component.isSelected())
      .forEach((component) => component.flipX());
    // Virtual terminals don't flip
  }

  flipYSelectedElements(): void {
    VComponentManager.components
      .filter((component) => component.isSelected())
      .forEach((component) => component.flipY());
    // Virtual terminals don't flip
  }

  rotateSelectedElements(): void {
    VComponentManager.components
      .filter((component) => component.isSelected())
      .forEach((component) => component.rotate());
    // Virtual terminals don't rotate
  }
}
