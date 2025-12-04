import { MTemporaryWiresObserver, MWireManagerObserver } from "../contracts";
import { ConnectionPointState, Pair, Position } from "../types.d";
import { PathFinder } from "../utils/path-finder";
import { PositionConverter } from "../utils/position-converter";
import { MComponentPin } from "./m-component-pin";
import { MWire } from "./m-wire";
import { MVirtualTerminal } from "./m-vt";
import { USE_45_DEGREE_WIRE_TURNS } from "../constants";
import Swal from "sweetalert2";

export class MWireManager {
  private selectedComponentPin: MComponentPin[];

  private static instance: MWireManager;

  private observers: Set<MWireManagerObserver> =
    new Set<MWireManagerObserver>();

  private temporaryWiresObservers: Set<MTemporaryWiresObserver> =
    new Set<MTemporaryWiresObserver>();

  constructor() {
    this.selectedComponentPin = [];
  }

  handlePinClick(pin: MComponentPin): void {
    let selectedPinsChanged = false;
    if (this.selectedComponentPin.length === 0) {
      this.selectedComponentPin.push(pin);
      selectedPinsChanged = true;
      pin.setState(ConnectionPointState.ACTIVE);
    } else {
      if (this.selectedComponentPin.includes(pin)) {
        this.selectedComponentPin = this.selectedComponentPin.filter(
          (p) => p !== pin
        );
        selectedPinsChanged = true;
        pin.setState(ConnectionPointState.INACTIVE);
      } else {
        const pin1 = this.selectedComponentPin[0];
        if (!pin1) {
          console.error("No selected pin to connect with", pin);
          return;
        }
        if (pin1.getComponent() === pin.getComponent()) {
          this.selectedComponentPin.push(pin);
          selectedPinsChanged = true;
          pin.setState(ConnectionPointState.ACTIVE);
        } else {
          const pin2 = pin;
          
          // Check if both are virtual terminals - prevent VT-to-VT connections
          const isVT1 = pin1.getComponent() instanceof MVirtualTerminal;
          const isVT2 = pin2.getComponent() instanceof MVirtualTerminal;
          
          if (isVT1 && isVT2) {
            // Both are VTs - not allowed
            Swal.fire({
              title: "Invalid Connection",
              text: "Virtual terminals cannot be connected to each other. Please connect to a component instead.",
              icon: "warning",
              confirmButtonText: "OK",
              confirmButtonColor: "#0066ff",
              timer: 3000,
              timerProgressBar: true
            });
            pin1.setState(ConnectionPointState.INACTIVE);
            this.selectedComponentPin.shift();
            selectedPinsChanged = true;
            return;
          }
          
          const wire = this.addWire(pin1, pin2);
          pin1.setState(ConnectionPointState.INACTIVE);
          pin2.setState(ConnectionPointState.INACTIVE);
          this.selectedComponentPin.shift();
          selectedPinsChanged = true;
        }
      }
    }
    if (selectedPinsChanged) {
      this.temporaryWiresObservers.forEach((observer) => {
        observer.onSelectionChange(this.selectedComponentPin);
      });
    }
  }

  addWire(pin1: MComponentPin, pin2: MComponentPin): MWire {
    const wire = new MWire(pin1, pin2);
    pin1.getComponent().pushWire(wire);
    pin2.getComponent().pushWire(wire);
    this.notifyWireAdded(wire);
    return wire;
  }

  removeWire(wire: MWire): void {
    wire.getPin1().getComponent().removeWire(wire);
    wire.getPin2().getComponent().removeWire(wire);
    this.notifyWireRemoved(wire);
  }

  public static getInstance(): MWireManager {
    if (!MWireManager.instance) {
      MWireManager.instance = new MWireManager();
    }
    return MWireManager.instance;
  }

  getPath(start: Position, end: Position, use45DegTurns: boolean = USE_45_DEGREE_WIRE_TURNS): Pair[] {
    const startPos = PositionConverter.positionToPairInArray(start);
    const endPos = PositionConverter.positionToPairInArray(end);
    // Returns path with minimum turns (configurable via USE_45_DEGREE_WIRE_TURNS constant)
    return PathFinder.getInstance().aStarSearch(startPos, endPos, use45DegTurns);
  }
  addObserver(observer: MWireManagerObserver): void {
    this.observers.add(observer);
  }
  removeObserver(observer: MWireManagerObserver): void {
    this.observers.delete(observer);
  }
  addTemporaryWiresObserver(observer: MTemporaryWiresObserver): void {
    this.temporaryWiresObservers.add(observer);
  }
  removeTemporaryWiresObserver(observer: MTemporaryWiresObserver): void {
    this.temporaryWiresObservers.delete(observer);
  }
  private notifyWireAdded(mWire: MWire): void {
    this.observers.forEach((observer) => {
      observer.onWireAdded(mWire);
    });
  }
  private notifyWireRemoved(mWire: MWire): void {
    this.observers.forEach((observer) => {
      observer.onWireRemoved(mWire);
    });
  }
}
