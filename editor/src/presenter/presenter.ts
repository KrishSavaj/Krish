import { MComponent } from "../models/m-component";
import { MWireManager } from "../models/m-wire-manager";
import { Model } from "../models/model";
import { View } from "../view/view";

export class Presenter {
  private model: Model;
  private view: View;
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    let temp1 = new MComponent(
      1,
      "Sample Element",
      200,
      300,
      100,
      100,
      "images/sample.svg"
    );
    let temp2 = new MComponent(
      2,
      "Sample Element",
      315,
      330,
      100,
      100,
      "images/sample.svg"
    );
    this.addComponent(temp1);
    this.addComponent(temp2);

    setTimeout(() => {
      this.makeRandomConnection(temp1, temp2);
    }, 1000);
  }

  public addComponent(component: MComponent): void {
    this.model.addComponent(component);
  }

  public makeRandomConnection(
    component1: MComponent,
    component2: MComponent
  ): void {
    const pin1 = component1.getRandomPin();
    const pin2 = component2.getRandomPin();

    const pin3 = component1.getRandomPin();
    const pin4 = component2.getRandomPin();

    if (pin1 && pin2) {
      MWireManager.getInstance().addWire(pin1, pin2);
      MWireManager.getInstance().addWire(pin2, pin3);
      MWireManager.getInstance().addWire(pin3, pin4);
    } else {
      console.error(
        "Cannot connect pins: one or both components have no pins."
      );
    }
  }
}
