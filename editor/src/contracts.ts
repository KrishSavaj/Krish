import { MComponent } from "./models/m-component";
import { MComponentPin } from "./models/m-component-pin";
import { MWire } from "./models/m-wire";

export interface MComponentObserverCom {
  onPositionChange(component: MComponent): void;
  onComponentRotate(component: MComponent): void;
  onComponentSizeChange(component: MComponent): void;
  onComponentFlipY(component: MComponent): void;
  onComponentFlipX(component: MComponent): void;
}

export interface MComponentPinObserver {
  onPositionChange(mComponentPin: MComponentPin): void;
  onStateChange(mComponentPin: MComponentPin): void;
}

export interface MComponentObserver extends MComponentObserverCom {
  onSelectedChange(component: MComponent): void;
  onPinInitialized(component: MComponent, pins: MComponentPin[]): void;
  onComponentValueChange?(component: MComponent): void;
  onPinLabelsVisibilityChange?(component: MComponent): void;
}

export interface MComponentManagerObserver {
  onNewComponentAdded(component: MComponent): void;
  onComponentRemoved(component: MComponent): void;
}

export interface MWireObserver {
  onPathChange(mWire: MWire): void;
  onSelectedChange?(mWire: MWire): void;
}

export interface MWireManagerObserver {
  onWireAdded(mWire: MWire): void;
  onWireRemoved(mWire: MWire): void;
}

export interface MTemporaryWiresObserver {
  onSelectionChange(selectedComponentPins: MComponentPin[]): void;
}

// ============================================================================
// Concrete Observer Implementations
// ============================================================================

// export * from "./observers/model-observers";

// Communication Observers (for ZMQ sync)
// export { MWireManagerObserverCom } from "./observers/MWireManagerObserverCom";
// export { MComponentManagerObserverCom } from "./observers/MComponentManagerObserverCom";
// export { MComponentObserverCom } from "./observers/MComponentObserverCom";

// ============================================================================
// Communication Module (ZeroMQ)
// ============================================================================

// export * from "./communicate";
