/**
 * MComponentObserverCom
 *
 * Concrete observer that watches individual component changes
 * (move, rotate, resize, flip, etc.) and will send ZMQ requests.
 * For now, it logs to console.
 */

import { MComponentObserverCom } from "../contracts";
import { MComponent } from "../models/m-component";
import { MComponentPin } from "../models/m-component-pin";

export class CComponent implements MComponentObserverCom {
  constructor() {
    console.log("🔗 MComponentObserverCom initialized");
  }

  onPositionChange(component: MComponent): void {
    const position = component.getPosition();

    console.log(`📍 [ZMQ] moveComponent:`, {
      canvasComponentId: component.getId(),
      position: { x: position.x, y: position.y },
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("moveComponent", {
    //   canvasComponentId: component.getId().toString(),
    //   position: { x: position.x, y: position.y }
    // });
  }

  onComponentRotate(component: MComponent): void {
    const rotation = component.getNumberOfRotations();

    console.log(`🔄 [ZMQ] rotateComponents:`, {
      canvasComponentIds: [component.getId()],
      rotation: rotation * 90,
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("rotateComponents", {
    //   canvasComponentIds: [component.getId().toString()]
    // });
  }

  onComponentSizeChange(component: MComponent): void {
    const width = component.getWidth();
    const height = component.getHeight();
    const position = component.getPosition();

    console.log(`📏 [ZMQ] resizeComponent:`, {
      canvasComponentId: component.getId(),
      width: width,
      height: height,
      position: { x: position.x, y: position.y },
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("resizeComponent", {
    //   canvasComponentId: component.getId().toString(),
    //   width,
    //   height,
    //   position: { x: position.x, y: position.y }
    // });
  }

  onComponentFlipY(component: MComponent): void {
    console.log(`↕️  [ZMQ] flipY:`, {
      canvasComponentIds: [component.getId()],
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("flipY", {
    //   canvasComponentIds: [component.getId().toString()]
    // });
  }

  onComponentFlipX(component: MComponent): void {
    console.log(`↔️  [ZMQ] flipX:`, {
      canvasComponentIds: [component.getId()],
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("flipX", {
    //   canvasComponentIds: [component.getId().toString()]
    // });
  }
}
