import { G, Svg, Rect, Text, Box } from "@svgdotjs/svg.js";
import { Position, ComponentSides } from "../types.d";
import { MVirtualTerminal } from "../models/m-vt";
import { VComponentPin } from "./v-component-pin";
import Swal from "sweetalert2";
import "@svgdotjs/svg.draggable.js";

export class VirtualTerminal {
  private canvas: Svg;
  private mVt: MVirtualTerminal;
  private isSelected: boolean;
  private terminalGroup: G;
  private terminalRect: Rect;
  private designatorText: Text;
  private vPin: VComponentPin;
  private gridSize: number = 5;
  private readonly designatorLengthLimit: number = 10;

  constructor(
    canvas: Svg,
    id: number,
    designator: string,
    vtGroup: G,
    position: Position
  ) {
    this.canvas = canvas;
    this.mVt = new MVirtualTerminal(id, designator, position);
    this.isSelected = false;

    this.terminalGroup = vtGroup.group().attr({ id: `vt-group-${id}` });

    this.terminalRect = this.terminalGroup
      .rect(50, 30)
      .fill("lightgray")
      .stroke({ color: "black", width: 1 })
      .move(position.x, position.y)
      .attr({ id: `vt-${id}` });

    this.designatorText = this.terminalGroup
      .text(designator)
      .move(position.x + 5, position.y + 5)
      .font({ size: 12, family: "Arial" })
      .attr({ id: `vt-text-${id}` });

    this.drawInit();
    this.updateSize();

    // Create the component pin (connection point)
    this.vPin = new VComponentPin(
      this.canvas,
      this as any, // VirtualTerminal acts like VComponent
      this.mVt as any, // MVirtualTerminal acts like MComponent
      this.mVt.getPin(),
      this.terminalGroup
    );

    // Setup custom pin click handler for auto-side adjustment
    this.setupPinClickHandler();
  }

  private isValidDesignator(designator: string | null): string {
    if (designator == null) return "";
    designator = designator.trim();
    if (designator.trim() == "") return "";
    if (designator.length > this.designatorLengthLimit) return "";
    if (!/^[a-zA-Z0-9' ]+$/.test(designator)) return "";
    return designator;
  }

  private drawInit(): void {
    // Double-click handler for editing designator
    const handleDoubleClick = async (event: Event) => {
      event.stopPropagation();
      event.preventDefault();

      const result = await Swal.fire({
        title: "Edit Virtual Terminal",
        html: `
          <div style="text-align: left;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Designator:</label>
            <input id="swal-designator" class="swal2-input" style="margin: 0;" value="${this.mVt.getDesignator()}" maxlength="10">
            <div style="margin-top: 10px; font-size: 12px; color: #666;">
              <em>Note: Pin side will automatically adjust to the nearest connection</em>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Save",
        confirmButtonColor: "#0066ff",
        cancelButtonText: "Cancel",
        didOpen: () => {
          // Auto-focus the designator input field
          const input = document.getElementById("swal-designator") as HTMLInputElement;
          if (input) {
            input.focus();
            input.select(); // Select all text for easy replacement
            
            // Handle Enter key to submit
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
          const designatorInput = document.getElementById(
            "swal-designator"
          ) as HTMLInputElement;
          const designator = designatorInput.value.trim();

          if (!designator) {
            Swal.showValidationMessage("Designator cannot be empty");
            return null;
          }

          if (!/^[a-zA-Z0-9' ]+$/.test(designator)) {
            Swal.showValidationMessage(
              "Designator can only contain letters, numbers, and spaces"
            );
            return null;
          }

          return { designator: designator.toUpperCase() };
        },
      });

      if (result.isConfirmed && result.value) {
        this.setDesignator(result.value.designator);
        this.designatorText.text(result.value.designator);
        this.updateSize();
      }
    };

    // Add double-click to both text and rect
    this.designatorText.on("dblclick", handleDoubleClick);
    this.terminalRect.on("dblclick", handleDoubleClick);

    // Click on text also selects
    this.designatorText.on("click", (event) => {
      event.stopPropagation();
      this.setSelected(!this.getIsSelected(), true); // true = individual click
    });

    this.terminalRect.on("click", (event) => {
      event.stopPropagation();
      this.setSelected(!this.getIsSelected(), true); // true = individual click
    });

    // Make both rect and text draggable
    this.terminalRect.draggable();
    this.designatorText.draggable();

    // Rect drag handlers
    this.terminalRect.on(
      "dragstart.namespace",
      this.onDragStart.bind(this) as EventListener
    );
    this.terminalRect.on(
      "dragmove.namespace",
      this.onDrag.bind(this) as EventListener
    );
    this.terminalRect.on(
      "dragend.namespace",
      this.onDragEnd.bind(this) as EventListener
    );

    // Text drag handlers (same as rect)
    this.designatorText.on(
      "dragstart.namespace",
      this.onDragStart.bind(this) as EventListener
    );
    this.designatorText.on(
      "dragmove.namespace",
      this.onDrag.bind(this) as EventListener
    );
    this.designatorText.on(
      "dragend.namespace",
      this.onDragEnd.bind(this) as EventListener
    );
  }

  private onDrag(event: CustomEvent<{ box: Box }>): void {
    event.preventDefault();
    const position = event.detail.box;
    const posX = Math.round(position.x / this.gridSize) * this.gridSize;
    const posY = Math.round(position.y / this.gridSize) * this.gridSize;
    this.updatePosition(posX, posY);
    this.vPin.onPositionChange(this.mVt.getPin());

    // Update all connected wires during drag
    const wires = this.mVt.getWires();
    wires.forEach((wire) => {
      wire.updatePath();
    });
  }

  private updatePosition(x: number, y: number): void {
    this.mVt.setPosition({ x, y });
    const pos = this.mVt.getPosition();
    this.terminalRect.move(pos.x, pos.y);
    this.designatorText.move(pos.x + 5, pos.y + 5);
    this.updateSize();
  }

  private onDragStart(event: CustomEvent<{ box: Position }>): void {}

  private onDragEnd(event: CustomEvent<{ box: Position }>): void {
    const pos = this.mVt.getPosition();
    this.terminalRect.move(pos.x, pos.y);
    this.designatorText.move(pos.x + 5, pos.y + 5);

    // Auto-adjust pin side based on connected wires
    this.autoAdjustPinSide();

    this.vPin.onPositionChange(this.mVt.getPin());

    // Final wire update at end of drag
    const wires = this.mVt.getWires();
    wires.forEach((wire) => {
      wire.updatePath();
    });
  }

  private updateSize(): void {
    const pos = this.mVt.getPosition();
    const rectHeight = 20;
    const textWidth =
      (Math.round(this.designatorText.bbox().width / 5) + 2) * 5;
    const widthPadding = (textWidth - this.designatorText.bbox().width) / 2;
    const heightPadding = (rectHeight - this.designatorText.bbox().height) / 2;

    this.terminalRect.size(textWidth, rectHeight);
    this.terminalRect.move(pos.x, pos.y);

    this.designatorText.move(pos.x + widthPadding, pos.y + heightPadding);

    // Update model dimensions so pin position is calculated correctly
    this.mVt.setWidth(textWidth);
    this.mVt.setHeight(rectHeight);

    // Update pin position after size change
    if (this.vPin) {
      this.vPin.onPositionChange(this.mVt.getPin());
    }
  }

  public getGroup(): G {
    return this.terminalGroup;
  }

  public getBBox(): Box {
    return this.terminalRect.bbox();
  }

  public getId(): number {
    return this.mVt.getId();
  }

  public getPosition(): Position {
    return this.mVt.getPosition();
  }

  public setPosition(position: Position): void {
    this.mVt.setPosition(position);
    const pos = this.mVt.getPosition();
    this.terminalRect.move(pos.x, pos.y);
    this.designatorText.move(pos.x + 5, pos.y + 5);
    this.updateSize();

    // Update pin and wires
    if (this.vPin) {
      this.vPin.onPositionChange(this.mVt.getPin());
    }
    const wires = this.mVt.getWires();
    wires.forEach((wire) => {
      wire.updatePath();
    });
  }

  public getDesignator(): string {
    return this.mVt.getDesignator();
  }

  public setDesignator(designator: string): void {
    this.mVt.setDesignator(designator);
  }

  // Methods needed by VComponentPin to act like VComponent
  public getSide(side: any): any {
    return side; // Virtual terminal doesn't rotate
  }

  public getAlpha(side: any, alpha: number): number {
    return alpha; // Virtual terminal doesn't transform
  }

  public getIsSelected(): boolean {
    return this.isSelected;
  }

  public setSelected(selected: boolean, isIndividualClick: boolean = false): void {
    if (selected) {
      // Only clear all if it's an individual click
      if (isIndividualClick) {
        this.clearAllSelectionsAndHighlights();
      }
      
      // Select this VT
      this.isSelected = true;
      this.terminalGroup.addClass("selected");
      
      // Only highlight matching designators if it's an individual click
      if (isIndividualClick) {
        this.highlightMatchingDesignators();
      }
    } else {
      this.isSelected = false;
      this.terminalGroup.removeClass("selected");
      // Always remove all highlighting when any VT is deselected
      this.unhighlightAllDesignators();
    }
    // Recalculate text centering after selection state change
    // (stroke width changes from 2 to 3, affecting layout)
    setTimeout(() => {
      this.updateSize();
    }, 0);
  }

  private clearAllSelectionsAndHighlights(): void {
    const VComponentManager = require('./v-component-manager').VComponentManager;
    const allVTs = VComponentManager.getVirtualTerminals();
    
    // Clear all VT selections and highlights
    allVTs.forEach((vt: VirtualTerminal) => {
      vt.isSelected = false;
      vt.terminalGroup.removeClass("selected");
      vt.terminalGroup.removeClass("highlighted");
    });
  }

  private highlightMatchingDesignators(): void {
    const VComponentManager = require('./v-component-manager').VComponentManager;
    const allVTs = VComponentManager.getVirtualTerminals();
    const myDesignator = this.mVt.getDesignator();
    
    allVTs.forEach((vt: VirtualTerminal) => {
      if (vt !== this && vt.getDesignator() === myDesignator) {
        vt.setHighlighted(true);
      }
    });
  }

  private unhighlightAllDesignators(): void {
    const VComponentManager = require('./v-component-manager').VComponentManager;
    const allVTs = VComponentManager.getVirtualTerminals();
    
    allVTs.forEach((vt: VirtualTerminal) => {
      vt.setHighlighted(false);
    });
  }

  public setHighlighted(highlighted: boolean): void {
    if (highlighted) {
      this.terminalGroup.addClass("highlighted");
    } else {
      this.terminalGroup.removeClass("highlighted");
    }
  }

  public getMVt(): MVirtualTerminal {
    return this.mVt;
  }

  private setupPinClickHandler(): void {
    // Find the pin circle element and override its click handler
    setTimeout(() => {
      const pinElement = this.terminalGroup.findOne(".component-pin") as any;
      if (pinElement) {
        pinElement.off("click"); // Remove default handler
        pinElement.click((event: MouseEvent) => {
          event.stopPropagation();

          // Get the MWireManager to check if there's a selected pin
          const wireManager =
            require("../models/m-wire-manager").MWireManager.getInstance();
          const selectedPins = (wireManager as any).selectedComponentPin;

          // If there's a selected pin (first click), adjust this VT's pin side
          if (selectedPins && selectedPins.length > 0) {
            const otherPin = selectedPins[0];
            const otherPinPos = otherPin.getGlobalPosition();
            this.updatePinSideToNearest(otherPinPos);
          }

          // Continue with normal wire creation
          wireManager.handlePinClick(this.mVt.getPin());
        });
      }
    }, 0);
  }

  private autoAdjustPinSide(): void {
    // Get all connected wires
    const wires = this.mVt.getWires();
    if (wires.length === 0) return; // No wires, keep current side

    // Calculate average position of all connected pins
    let totalX = 0;
    let totalY = 0;
    let count = 0;

    wires.forEach((wire) => {
      const pin1 = wire.getPin1();
      const pin2 = wire.getPin2();

      // Get the other pin (not this terminal's pin)
      const otherPin =
        wire.getPin1().getComponent().getId() === this.mVt.getId()
          ? pin2
          : pin1;
      const otherPos = otherPin.getGlobalPosition();

      totalX += otherPos.x;
      totalY += otherPos.y;
      count++;
    });

    if (count > 0) {
      const avgPosition = { x: totalX / count, y: totalY / count };
      this.updatePinSideToNearest(avgPosition);
    }
  }

  public updatePinSideToNearest(targetPosition: Position): void {
    const vtPos = this.mVt.getPosition();
    const width = this.mVt.getWidth();
    const height = this.mVt.getHeight();

    // Calculate center of each side
    const sides = [
      { side: ComponentSides.LEFT, x: vtPos.x, y: vtPos.y + height / 2 },
      {
        side: ComponentSides.RIGHT,
        x: vtPos.x + width,
        y: vtPos.y + height / 2,
      },
      { side: ComponentSides.TOP, x: vtPos.x + width / 2, y: vtPos.y },
      {
        side: ComponentSides.BOTTOM,
        x: vtPos.x + width / 2,
        y: vtPos.y + height,
      },
    ];

    // Find closest side to target
    let closestSide = ComponentSides.LEFT;
    let minDistance = Infinity;

    sides.forEach(({ side, x, y }) => {
      const dx = targetPosition.x - x;
      const dy = targetPosition.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        minDistance = distance;
        closestSide = side;
      }
    });

    // Update pin side if it changed
    if (closestSide !== this.mVt.getPinSide()) {
      // Store existing wires
      const existingWires = [...this.mVt.getWires()];
      const wireManager =
        require("../models/m-wire-manager").MWireManager.getInstance();

      // Store connected pins for each wire (compare by component id to avoid incompatible-type comparison)
      const wireConnections = existingWires.map((wire) => ({
        pin1: wire.getPin1(),
        pin2: wire.getPin2(),
        thisIsPin1: wire.getPin1().getComponent().getId() === this.mVt.getId(),
      }));

      // Remove old wires
      existingWires.forEach((wire) => {
        wireManager.removeWire(wire);
      });

      // Change pin side
      this.mVt.setPinSide(closestSide);
      this.recreatePin();

      // Recreate wires with new pin
      wireConnections.forEach(({ pin1, pin2, thisIsPin1 }) => {
        const newPin = this.mVt.getPin();
        if (thisIsPin1) {
          wireManager.addWire(newPin, pin2);
        } else {
          wireManager.addWire(pin1, newPin);
        }
      });
    }
  }

  private recreatePin(): void {
    // Remove old pin visual
    const oldPinElement = this.terminalGroup.findOne(
      `[data-pin-id="${this.mVt.getId()}"]`
    );
    if (oldPinElement) {
      oldPinElement.remove();
    }

    // Create new pin with new side
    this.vPin = new VComponentPin(
      this.canvas,
      this as any,
      this.mVt as any,
      this.mVt.getPin(),
      this.terminalGroup
    );

    // Setup click handler for new pin
    this.setupPinClickHandler();

    // Update pin position
    requestAnimationFrame(() => {
      this.vPin.onPositionChange(this.mVt.getPin());
    });
  }

  public delete(): void {
    // Remove all wires connected to this terminal
    const wires = this.mVt.getWires();
    wires.forEach((wire) => {
      const wireManager =
        require("../models/m-wire-manager").MWireManager.getInstance();
      wireManager.removeWire(wire);
    });
    // Remove the visual group
    this.terminalGroup.remove();
  }

  public move(dx: number, dy: number): void {
    const pos = this.mVt.getPosition();
    const newX = pos.x + dx;
    const newY = pos.y + dy;
    this.updatePosition(newX, newY);

    // Auto-adjust pin side based on connected wires
    this.autoAdjustPinSide();

    this.vPin.onPositionChange(this.mVt.getPin());

    // Update connected wires
    const wires = this.mVt.getWires();
    wires.forEach((wire) => {
      wire.updatePath();
    });
  }
}

export class Vt {
  private canvas: Svg;
  private vtGroup: G;
  private terminals: VirtualTerminal[] = [];
  private count: number = 0;

  constructor(parent: Svg, vtGroupId: string) {
    this.canvas = parent;
    this.vtGroup = parent.group().attr({ id: vtGroupId });
  }

  public getCanvas(): Svg {
    return this.canvas;
  }

  public getVtGroup(): G {
    return this.vtGroup;
  }

  /**
   * Initializes the VT view.
   * Currently, this method does not perform any operations.
   */
  init(): void {}

  public addVirtualTerminal(position: Position): VirtualTerminal {
    const designator = `VT${this.count}`;
    const terminal = new VirtualTerminal(
      this.canvas,
      this.count++,
      designator,
      this.vtGroup,
      position
    );
    this.terminals.push(terminal);

    // Register with VComponentManager
    const VComponentManager =
      require("./v-component-manager").VComponentManager;
    VComponentManager.addVirtualTerminal(terminal);

    console.log(
      `Added Virtual Terminal: ${designator} at ${JSON.stringify(position)}`
    );
    return terminal;
  }

  public removeTerminal(terminal: VirtualTerminal): void {
    const index = this.terminals.indexOf(terminal);
    if (index > -1) {
      this.terminals.splice(index, 1);
    }
  }

  public getTerminals(): VirtualTerminal[] {
    return this.terminals;
  }

  public cloneVirtualTerminal(
    vt: VirtualTerminal,
    position: Position
  ): VirtualTerminal {
    const designator = `VT${this.count}`;
    const terminal = new VirtualTerminal(
      this.canvas,
      this.count++,
      designator,
      this.vtGroup,
      position
    );
    this.terminals.push(terminal);

    // Register with VComponentManager
    const VComponentManager =
      require("./v-component-manager").VComponentManager;
    VComponentManager.addVirtualTerminal(terminal);

    return terminal;
  }
}
