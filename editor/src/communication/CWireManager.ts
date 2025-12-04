/**
 * MWireManagerObserverCom
 *
 * Concrete observer that watches wire add/remove events
 * and will send ZMQ requests. For now, it logs to console.
 */

import { MWireManagerObserver } from "../contracts";
import { MWire } from "../models/m-wire";

export class CWireManager implements MWireManagerObserver {
  constructor() {
    console.log("🔗 MWireManagerObserverCom initialized");
  }

  onWireAdded(mWire: MWire): void {
    const pin1 = mWire.getPin1();
    const pin2 = mWire.getPin2();

    console.log(`➕ [ZMQ] addWire:`, {
      id: mWire.getId(),
      connPoint1: {
        canvasComponentId: pin1.getComponent().getId(),
        pinId: pin1.getId(),
      },
      connPoint2: {
        canvasComponentId: pin2.getComponent().getId(),
        pinId: pin2.getId(),
      },
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("addWire", {
    //   id: mWire.getId(),
    //   connPoint1: {
    //     canvasComponentId: pin1.getComponent().getId().toString(),
    //     pinId: pin1.getId().toString()
    //   },
    //   connPoint2: {
    //     canvasComponentId: pin2.getComponent().getId().toString(),
    //     pinId: pin2.getId().toString()
    //   }
    // });
  }

  onWireRemoved(mWire: MWire): void {
    console.log(`❌ [ZMQ] deleteWire:`, {
      id: mWire.getId(),
    });

    // TODO: Send ZMQ request
    // await this.client.sendRequest("deleteWire", {
    //   id: mWire.getId()
    // });
  }
}
