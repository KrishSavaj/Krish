import { ComponentSides, ConnectionPointState, Position } from "../types.d";
import { MComponentPin } from "./m-component-pin";
import { MWire } from "./m-wire";

export class MVirtualTerminal {
  private readonly id: number;
  private designator: string;
  private position: Position;
  private pin: MComponentPin;
  private wires: MWire[] = [];
  private width: number = 50;
  private height: number = 20;
  private pinSide: ComponentSides = ComponentSides.LEFT;

  constructor(
    id: number,
    designator: string,
    position: Position,
    pinSide: ComponentSides = ComponentSides.LEFT
  ) {
    this.id = id;
    this.designator = designator;
    this.position = position;
    this.pinSide = pinSide;

    // Create a single pin on the specified side for the virtual terminal
    this.pin = new MComponentPin(
      id,
      designator,
      0.5, // centered
      pinSide,
      this as any, // Virtual terminal acts like a component
      2,
      ConnectionPointState.INACTIVE
    );
  }
  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: Position): void {
    this.position = position;
    this.pin.updatePosition(this.position);
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getId(): number {
    return this.id;
  }

  public getDesignator(): string {
    return this.designator;
  }

  public setDesignator(designator: string): void {
    this.designator = designator;
  }

  public getPin(): MComponentPin {
    return this.pin;
  }

  public pushWire(wire: MWire): void {
    this.wires.push(wire);
  }

  public removeWire(wire: MWire): void {
    const index = this.wires.indexOf(wire);
    if (index > -1) {
      this.wires.splice(index, 1);
    }
  }

  public getWires(): MWire[] {
    return this.wires;
  }

  public getPinSide(): ComponentSides {
    return this.pinSide;
  }

  public setPinSide(side: ComponentSides): void {
    this.pinSide = side;
    
    // Store old pin's connections before recreating
    const oldPin = this.pin;
    
    // Recreate the pin with new side
    this.pin = new MComponentPin(
      this.id,
      this.designator,
      0.5,
      side,
      this as any,
      2,
      ConnectionPointState.INACTIVE
    );
    
    // Transfer observers from old pin to new pin
    if (oldPin) {
      const observers = (oldPin as any).observers;
      if (observers) {
        observers.forEach((observer: any) => {
          this.pin.addObserver(observer);
        });
      }
    }
  }
}
