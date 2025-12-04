import { Svg } from "@svgdotjs/svg.js";
import { ContextMenu, MenuItem } from "../utils/context-menu";
import { VElementManager } from "./v-component-manager";
import { Point } from "@svgdotjs/svg.js";
import { Box } from "@svgdotjs/svg.js";
import { Vt } from "./vt";

export class VContextMenu {
  private canvas: Svg;
  private menuScope: HTMLElement;
  private menuItems: MenuItem[];
  private contextMenu: ContextMenu;
  private vElementManager: VElementManager;
  private vt: Vt;

  private readonly zoomStep = 1.2;
  private readonly initViewBox: Box;

  private level = 1;

  constructor(
    canvas: Svg,
    menuScope: HTMLElement,
    vElementManager: VElementManager,
    vt: Vt
  ) {
    this.canvas = canvas;
    this.menuScope = menuScope;
    this.vElementManager = vElementManager;
    this.vt = vt;
    this.menuItems = [];
    this.contextMenu = new ContextMenu({
      scope: this.menuScope,
      customClass: "canvas-context-menu",
      menuItems: this.menuItems,
    });
    this.initializeMenuItems();
    for (const item of this.menuItems) {
      this.contextMenu.addItem(item);
    }
    this.initViewBox = this.canvas.viewbox();
  }

  private initializeMenuItems(): void {
    this.menuItems = [
      {
        label: "Copy",
        callback: () => {
          this.vElementManager.copySelectedElements();
        },
        class: "copy-action",
      },
      {
        label: "Paste",
        callback: (event: MouseEvent) => {
          this.vElementManager.pasteCopiedElements(event);
        },
        class: "paste-action",
      },
      {
        label: "Delete",
        callback: () => {
          this.vElementManager.deleteSelectedElements();
        },
        class: "delete-action",
      },
      {
        label: "Zoom In",
        callback: (event: MouseEvent) => {
          this.handleZoomIn(event);
        },
        class: "zoom-in-action",
      },
      {
        label: "Zoom Out",
        callback: (event: MouseEvent) => {
          this.handleZoomOut(event);
        },
        class: "zoom-out-action",
      },
      {
        label: "Zoom Reset",
        callback: () => {
          this.handleZoomReset();
        },
        class: "zoom-reset-action",
      },
      {
        label: "Flip X",
        callback: () => {
          this.handleFlipX();
        },
        class: "flip-x-action",
      },
      {
        label: "Flip Y",
        callback: () => {
          this.handleFlipY();
        },
        class: "flip-y-action",
      },
      {
        label: "Rotate",
        callback: () => {
          this.handleRotate();
        },
        class: "rotate-action",
      },
      {
        label: "Add Virtual Terminal",
        callback: (event: MouseEvent) => {
          this.handleAddVirtualTerminal(event);
        },
        class: "add-vt-action",
      },
    ];
  }

  public addClassToMenuItem(itemLabel: string, className: string): void {
    if (!this.contextMenu) {
      console.error("Context menu is not initialized.");
      return;
    }
    this.contextMenu.addItemClassByLabel(itemLabel, className);
  }
  public removeClassFromMenuItem(itemLabel: string, className: string): void {
    if (this.contextMenu) {
      this.contextMenu.removeItemClassByLabel(itemLabel, className);
    } else {
      console.error("Context menu is not initialized.");
    }
  }
  private handleZoomIn(event: MouseEvent): void {
    const point = this.canvas.point(event.clientX, event.clientY);
    this.zoomBy(this.zoomStep, point);
  }
  private handleZoomOut(event: MouseEvent): void {
    const point = this.canvas.point(event.clientX, event.clientY);
    this.zoomBy(1 / this.zoomStep, point);
  }
  private handleZoomReset(): void {
    this.level = 1;
    this.canvas.viewbox(
      this.initViewBox.x,
      this.initViewBox.y,
      this.initViewBox.width,
      this.initViewBox.height
    );
  }

  private zoomBy(factor: number, point: Point): void {
    const clamp = (v: number, a: number, b: number) => {
      return Math.max(a, Math.min(b, v));
    };
    const min = 0.25,
      max = 8;
    this.level = clamp(this.level * factor, min, max);
    this.canvas.zoom(this.level, point);
  }

  private handleFlipX(): void {
    this.vElementManager.flipXSelectedElements();
  }

  private handleFlipY(): void {
    this.vElementManager.flipYSelectedElements();
  }

  private handleRotate(): void {
    this.vElementManager.rotateSelectedElements();
  }

  private handleAddVirtualTerminal(event: MouseEvent): void {
    const point = this.canvas.point(event.clientX, event.clientY);
    this.vt.addVirtualTerminal({ x: point.x, y: point.y });
  }
}
