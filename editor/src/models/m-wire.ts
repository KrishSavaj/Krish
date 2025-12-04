import { MWireObserver } from "../contracts";
import { MComponentPin } from "./m-component-pin";
import { MWireManager } from "./m-wire-manager";

export class MWire {
  private readonly id: number;
  private readonly pin1: MComponentPin;
  private readonly pin2: MComponentPin;

  private observers: Set<MWireObserver> = new Set<MWireObserver>();

  constructor(pin1: MComponentPin, pin2: MComponentPin) {
    this.id = Date.now();
    this.pin1 = pin1;
    this.pin2 = pin2;

    this.updatePath();
  }
  getId(): number {
    return this.id;
  }
  getPin1(): MComponentPin {
    return this.pin1;
  }
  getPin2(): MComponentPin {
    return this.pin2;
  }

  updatePath(): void {
    this.notifyPathChange();
  }

  remove(): void {
    MWireManager.getInstance().removeWire(this);
  }

  public addObserver(observer: MWireObserver): void {
    this.observers.add(observer);
  }
  public removeObserver(observer: MWireObserver): void {
    this.observers.delete(observer);
  }
  private notifyPathChange(): void {
    this.observers.forEach((observer) => {
      observer.onPathChange(this);
    });
  }
}
