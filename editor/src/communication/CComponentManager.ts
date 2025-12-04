/**
 * MComponentManagerObserverCom
 *
 * Concrete observer that watches component add/remove events
 * and will send ZMQ requests. For now, it logs to console.
 */

import { MComponentManagerObserver } from "../contracts";
import { MComponent } from "../models/m-component";

export class CComponentManager implements MComponentManagerObserver {
  constructor() {
    console.log("🔗 MComponentManagerObserverCom initialized");
  }

  onNewComponentAdded(component: MComponent): void {
    const position = component.getPosition();

    console.log(`➕ [ZMQ] addComponent:`, {
      componentId: component.getComponentName(),
      canvasComponentId: component.getId(),
      position: { x: position.x, y: position.y },
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("addComponent", {
    //   componentId: component.getComponentName(),
    //   canvasComponentId: component.getId().toString(),
    //   position: { x: position.x, y: position.y }
    // });
  }

  onComponentRemoved(component: MComponent): void {
    console.log(`❌ [ZMQ] deleteComponents:`, {
      canvasComponentIds: [component.getId()],
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("deleteComponents", {
    //   canvasComponentIds: [component.getId().toString()]
    // });
  }
}
