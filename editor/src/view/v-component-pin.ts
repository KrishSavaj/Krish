import { G } from "@svgdotjs/svg.js";
import { MComponent } from "../models/m-component";
import { MComponentPin, transformations } from "../models/m-component-pin";
import { Circle } from "@svgdotjs/svg.js";
import { MComponentPinObserver } from "../contracts";
import { ConnectionPointState } from "../types.d";
import { PositionConverter } from "../utils/position-converter";
import { PathFinder } from "../utils/path-finder";
import { Svg } from "@svgdotjs/svg.js";
import { VComponent } from "./v-component";
import { MWireManager } from "../models/m-wire-manager";

export class VComponentPin implements MComponentPinObserver {
  private canvas: Svg;
  private vComponent: VComponent;
  private mComponent: MComponent;
  private mComponentPin: MComponentPin;
  private parent: G;
  private cpCircle: Circle;

  constructor(
    canvas: Svg,
    vComponent: VComponent,
    mComponent: MComponent,
    mComponentPin: MComponentPin,
    parent: G
  ) {
    this.canvas = canvas;
    this.vComponent = vComponent;
    this.mComponent = mComponent;
    this.mComponentPin = mComponentPin;
    this.parent = parent;

    this.cpCircle = this.parent
      .circle(this.mComponentPin.getRadius() * 2)
      .move(
        this.mComponentPin.getPoint().x - this.mComponentPin.getRadius(),
        this.mComponentPin.getPoint().y - this.mComponentPin.getRadius()
      )
      .addClass("component-pin");
    this.cpCircle.attr("data-pin-id", this.mComponentPin.getId());
    this.cpCircle.attr("data-pin-name", this.mComponentPin.getName());
    this.cpCircle.click(this.onClickHandler.bind(this));

    this.mComponentPin.addObserver(this);
  }

  private onClickHandler(event: MouseEvent): void {
    event.stopPropagation();
    MWireManager.getInstance().handlePinClick(this.mComponentPin);
  }

  onStateChange(mComponentPin: MComponentPin): void {
    if (mComponentPin.getState() === ConnectionPointState.ACTIVE) {
      this.cpCircle.addClass("active");
    } else {
      this.cpCircle.removeClass("active");
    }
  }

  onPositionChange(mComponentPin: MComponentPin): void {
    this.cpCircle.move(
      mComponentPin.getPoint().x - mComponentPin.getRadius(),
      mComponentPin.getPoint().y - mComponentPin.getRadius()
    );
    const box = this.vComponent.getBBox();

    const transformedPoint = transformations[
      this.vComponent.getSide(mComponentPin.getSide())
    ](
      box,
      mComponentPin.getAlpha(),
      this.mComponent.getWidth(),
      this.mComponent.getHeight()
    );

    this.mComponentPin.setGlobalPosition(transformedPoint);
  }

  public updateGrid(): void {
    const box = this.vComponent.getBBox();

    const side = this.vComponent.getSide(this.mComponentPin.getSide());
    const alpha = this.vComponent.getAlpha(
      this.mComponentPin.getSide(),
      this.mComponentPin.getAlpha()
    );

    let transformedPoint = transformations[side](
      box,
      alpha,
      box.width,
      box.height
    );

    this.mComponentPin.setGlobalPosition(transformedPoint);

    const point = PositionConverter.positionToPairInArray(transformedPoint);
    // point is [row, col]
    PathFinder.getInstance().unblock(point[0], point[1]);
  }
}
