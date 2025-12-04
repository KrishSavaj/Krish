import { CComponentManager } from "../communication/CComponentManager";
import { CWireManager } from "../communication/CWireManager";
import { MComponent } from "./m-component";
import { MComponentManager } from "./m-component-manager";
import { MWire } from "./m-wire";
import { MWireManager } from "./m-wire-manager";

export class Model {
  constructor() {
    const componentManagerObserver = new CComponentManager();
    const wireManagerObserver = new CWireManager();
    MComponentManager.getInstance().addObserver(componentManagerObserver);
    MWireManager.getInstance().addObserver(wireManagerObserver);
  }
  public addComponent(component: MComponent): void {
    MComponentManager.getInstance().addComponent(component);
  }

  public removeComponent(component: MComponent): void {
    MComponentManager.getInstance().removeComponent(component);
  }

  public getComponents(): MComponent[] {
    return MComponentManager.getInstance().getComponents();
  }

  public addWire(wire: MWire): void {
    MWireManager.getInstance().addWire(wire.getPin1(), wire.getPin2());
  }

  public removeWire(wire: MWire): void {
    MWireManager.getInstance().removeWire(wire);
  }
}
