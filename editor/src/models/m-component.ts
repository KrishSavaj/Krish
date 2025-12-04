import {
  ComponentSides,
  ConnectionPointData,
  Position,
  RotationCount,
} from "../types.d";
import { MComponentPin } from "./m-component-pin";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { MComponentObserver, MComponentObserverCom } from "../contracts";
import { MWire } from "./m-wire";
import { PositionConverter } from "../utils/position-converter";
import { CanvasManager } from "../utils/canvas-manager";
import { CComponent } from "../communication/CComponent";

export class MComponent {
  private readonly componentName: string; // immutable
  private componentValue: string = ""; // mutable, default empty string
  private name: string;
  private width: number;
  private height: number;
  private prevPosition: Position;
  private position: Position;
  private isSelected: boolean = false;
  private mComponentPins: MComponentPin[];
  private mWires: MWire[];
  private numberOfRotations: RotationCount;
  private isXFlipped: boolean = false;
  private isYFlipped: boolean = false;

  private readonly id: number;
  private readonly aspectRatio: number;
  private readonly minWidth: number;
  private readonly minHeight: number;
  private readonly svgPath: string;

  private observers = new Set<MComponentObserver | MComponentObserverCom>();

  constructor(
    id: number,
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    svgPath: string,
    componentValue: string = ""
  ) {
    this.id = id;
    this.position = { x, y };
    this.name = name;
    this.componentName = name; // immutable copy
    this.componentValue = componentValue;
    this.width = width;
    this.height = height;
    this.aspectRatio = width / height;
    this.minWidth = width / 2;
    this.minHeight = height / 2;
    this.prevPosition = { x: 0, y: 0 };
    this.svgPath = svgPath;

    this.mComponentPins = [];
    this.mWires = [];
    this.numberOfRotations = 0;

    // Initialize
    this.init();
  }

  private init() {
    this.loadSVG();
  }

  // Getters and Setters
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getComponentName(): string {
    return this.componentName;
  }

  public getComponentValue(): string {
    return this.componentValue;
  }

  public setComponentValue(value: string): void {
    this.componentValue = value;
    this.notifyComponentValueChange();
  }

  public getPosition(): Position {
    return this.position;
  }

  public getWidth(): number {
    return this.width;
  }
  public getHeight(): number {
    return this.height;
  }
  public getAspectRatio(): number {
    return this.aspectRatio;
  }
  public getMinWidth(): number {
    return this.minWidth;
  }
  public getMinHeight(): number {
    return this.minHeight;
  }
  public getSvgPath(): string {
    return this.svgPath;
  }
  public getPrevPosition(): Position {
    return this.prevPosition;
  }
  public isComponentSelected(): boolean {
    return this.isSelected;
  }
  public getMComponentPins(): MComponentPin[] {
    return this.mComponentPins;
  }
  public getNumberOfRotations(): RotationCount {
    return this.numberOfRotations;
  }
  public getMWires(): MWire[] {
    return this.mWires;
  }

  public isComponentXFlipped(): boolean {
    return this.isXFlipped;
  }

  public isComponentYFlipped(): boolean {
    return this.isYFlipped;
  }

  public flipX(): void {
    this.isXFlipped = !this.isXFlipped;
    this.notifyFlipX();
  }

  public flipY(): void {
    this.isYFlipped = !this.isYFlipped;
    this.notifyFlipY();
  }

  public clone(position: Position): MComponent {
    const clone = new MComponent(
      this.id + 100,
      this.name,
      position.x,
      position.y,
      this.width,
      this.height,
      this.svgPath
    );
    return clone;
  }

  public doRotation(): void {
    this.numberOfRotations = ((this.numberOfRotations + 1) &
      3) as RotationCount;

    this.notifyComponentRotate();
  }

  public tryNewSize(
    position: Position,
    width: number,
    height: number
  ): boolean {
    if (width < this.minWidth || height < this.minHeight) {
      console.error("Width or height is less than minimum allowed size.");
      return false;
    }

    // Check and expand canvas if needed (allows negative positions with auto-expansion)
    const offset = CanvasManager.getInstance().checkAndExpandCanvas(
      position.x,
      position.y,
      width,
      height
    );

    // Apply offset if canvas expanded left or top
    const adjustedPosition = {
      x: position.x + offset.offsetX,
      y: position.y + offset.offsetY,
    };

    this.prevPosition = { ...this.position };
    this.position = adjustedPosition;
    this.width = width;
    this.height = height;

    this.mComponentPins.forEach((pin) => {
      pin.updatePosition(this.position);
    });
    this.notifyResize();

    return true;
  }

  private notifyResize(): void {
    this.observers.forEach((observer) => {
      observer.onComponentSizeChange(this);
    });
  }

  public setPosition(position: Position): void {
    if (this.position.x === position.x && this.position.y === position.y) {
      return; // No change in position
    }

    // Round position but keep original for expansion check
    const roundedPosition = PositionConverter.positionToRoundPosition(position);

    // Check if canvas needs expansion BEFORE applying position
    // This allows detecting negative positions
    const offset = CanvasManager.getInstance().checkAndExpandCanvas(
      roundedPosition.x,
      roundedPosition.y,
      this.width,
      this.height
    );

    // Apply offset if canvas expanded left or top
    this.position = {
      x: roundedPosition.x + offset.offsetX,
      y: roundedPosition.y + offset.offsetY,
    };

    this.mComponentPins.forEach((pin) => {
      pin.updatePosition(this.position);
    });

    this.notifyPositionChange();
  }

  public setSelected(isSelected: boolean): void {
    if (this.isSelected === isSelected) {
      return; // No change in selection state
    }

    this.isSelected = isSelected;
    this.notifySelectedChange();
  }
  public setName(name: string): void {
    this.name = name;
  }
  public setWidth(width: number): void {
    if (width < this.minWidth) {
      throw new Error("Width cannot be less than minimum value.");
    }
    this.width = width;
  }
  public setHeight(height: number): void {
    if (height < this.minHeight) {
      throw new Error("Height cannot be less than minimum value.");
    }
    this.height = height;
  }

  public setPrevPosition(prevPosition: Position): void {
    this.prevPosition = prevPosition;
  }

  /**
   * Shift position by offset without triggering canvas expansion
   * Used when canvas expands left/top and all components need to shift
   */
  public shiftPosition(offsetX: number, offsetY: number): void {
    this.position.x += offsetX;
    this.position.y += offsetY;

    this.mComponentPins.forEach((pin) => {
      pin.updatePosition(this.position);
    });

    this.notifyPositionChange();
  }

  public toString(): string {
    return `MComponent [id=${this.id}, name=${this.name}, position=(${this.position.x}, ${this.position.y}), width=${this.width}, height=${this.height}]`;
  }
  public equals(other: MComponent): boolean {
    return this.id === other.id;
  }

  // Set up connection points
  private loadSVG(): void {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.svgPath, true);
    xhr.responseType = "document";

    xhr.onload = () => {
      if (xhr.status === 200) {
        const svgDocument = xhr.responseXML;
        if (svgDocument?.documentElement.nodeName === "svg") {
          this.addConnectionPoints(svgDocument.documentElement);
        } else {
          console.error("Error: The loaded file is not a valid SVG.");
        }
      } else {
        console.error("Error loading SVG:", xhr.status, xhr.statusText);
      }
    };

    xhr.onerror = () => {
      console.error("Network error while trying to load SVG.");
    };

    xhr.send();
  }

  private addConnectionPoints(svg: HTMLElement): void {
    if (svg.dataset["version"] !== "0.0.1") {
      console.error("Invalid SVG version");
      return;
    }

    const cps = svg.dataset["connectionPoints"];
    if (!cps) {
      console.warn("No connection points found in SVG.");
      return;
    }

    try {
      const cpsObj = JSON.parse(cps);
      const handleConnectionPoint = (
        cps: ConnectionPointData[],
        side: ComponentSides
      ) => {
        cps.forEach((cp) => {
          this.mComponentPins.push(
            new MComponentPin(cp.id, cp.name, cp.location, side, this)
          );
        });
        this.notifyComponentPinsInitialized();
      };

      handleConnectionPoint(cpsObj.top, ComponentSides.TOP);
      handleConnectionPoint(cpsObj.left, ComponentSides.LEFT);
      handleConnectionPoint(cpsObj.bottom, ComponentSides.BOTTOM);
      handleConnectionPoint(cpsObj.right, ComponentSides.RIGHT);
    } catch (error) {
      console.error("Error parsing connection points:", error);
    }
  }

  private notifyComponentPinsInitialized(): void {
    this.observers.forEach((observer) => {
      if ("onPinInitialized" in observer) {
        observer.onPinInitialized(this, this.mComponentPins);
      }
    });
  }

  public addObserver(observer: MComponentObserver | CComponent): void {
    this.observers.add(observer);
  }
  public removeObserver(observer: MComponentObserver | CComponent): void {
    this.observers.delete(observer);
  }

  private notifyPositionChange(): void {
    this.observers.forEach((observer) => {
      observer.onPositionChange(this);
    });
  }

  public getRandomPin(): MComponentPin {
    if (this.mComponentPins.length === 0) {
      throw new Error("No connection points available.");
    }
    const randomIndex = Math.floor(Math.random() * this.mComponentPins.length);
    return this.mComponentPins[randomIndex];
  }

  private notifySelectedChange(): void {
    this.observers.forEach((observer) => {
      if ("onSelectedChange" in observer) {
        observer.onSelectedChange(this);
      }
    });
  }

  private notifyComponentRotate(): void {
    this.observers.forEach((observer) => {
      observer.onComponentRotate(this);
    });
  }

  public revertPosition(): void {
    this.setPosition(this.prevPosition);
  }

  public pushWire(wire: MWire): void {
    this.mWires.push(wire);
  }
  public removeWire(wire: MWire): void {
    this.mWires = this.mWires.filter((w) => w !== wire);
  }

  public delete(): void {
    // Remove all wires connected to this component
    this.mWires.forEach((wire) => wire.remove());
  }

  private notifyFlipX(): void {
    this.observers.forEach((observer) => {
      observer.onComponentFlipX(this);
    });
  }

  private notifyFlipY(): void {
    this.observers.forEach((observer) => {
      observer.onComponentFlipY(this);
    });
  }

  private notifyComponentValueChange(): void {
    this.observers.forEach((observer) => {
      if (
        "onComponentValueChange" in observer &&
        typeof (observer as any).onComponentValueChange === "function"
      ) {
        (observer as any).onComponentValueChange(this);
      }
    });
  }
}
