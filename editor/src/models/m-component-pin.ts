import { CONNECTION_POINT_RADIUS } from "../constants";
import { MComponentPinObserver } from "../contracts";
import { ComponentSides, ConnectionPointState, Position } from "../types.d";
import { PositionConverter } from "../utils/position-converter";
import { MComponent } from "./m-component";

export class MComponentPin {
  private readonly id: number;
  private readonly radius: number;
  private readonly name: string;
  private readonly alpha: number;
  private readonly component: MComponent;

  private globalPos: Position;
  private side: ComponentSides;
  private state: ConnectionPointState;
  private point: Position;

  private observers = new Set<MComponentPinObserver>();

  constructor(
    id: number,
    name: string,
    alpha: number,
    side: ComponentSides,
    parent: MComponent,
    radius: number = CONNECTION_POINT_RADIUS,
    state: ConnectionPointState = ConnectionPointState.INACTIVE
  ) {
    this.id = id;
    this.name = name;
    this.side = side;
    this.radius = radius;
    this.alpha = alpha;
    this.state = state;
    this.component = parent;
    this.point = parent.getPosition();
    this.updatePoint();
    this.globalPos = this.point;
  }

  // Getters
  public getId(): number {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getSide(): ComponentSides {
    return this.side;
  }
  public getPoint(): Position {
    return this.point;
  }
  public getRadius(): number {
    return this.radius;
  }
  public getAlpha(): number {
    return this.alpha;
  }
  public getState(): ConnectionPointState {
    return this.state;
  }
  public getComponent(): MComponent {
    return this.component;
  }

  // Setters
  public setPoint(point: Position): void {
    if (!point || typeof point.x !== "number" || typeof point.y !== "number") {
      throw new Error("Invalid point provided");
    }
    if (point.x < 0 || point.y < 0) {
      throw new Error("Point coordinates must be non-negative");
    }
    if (this.point.x === point.x && this.point.y === point.y) {
      return; // No change in position
    }

    this.point = point;
  }
  public setState(state: ConnectionPointState): void {
    if (!Object.values(ConnectionPointState).includes(state)) {
      throw new Error("Invalid state provided");
    }
    if (this.state === state) {
      return; // No change in state
    }
    this.state = state;
    this.notifyStateChange();
  }
  public addObserver(observer: MComponentPinObserver): void {
    if (!observer || typeof observer.onPositionChange !== "function") {
      throw new Error("Invalid observer provided");
    }
    this.observers.add(observer);
  }
  public removeObserver(observer: MComponentPinObserver): void {
    if (!observer || typeof observer.onPositionChange !== "function") {
      throw new Error("Invalid observer provided");
    }
    this.observers.delete(observer);
  }

  public updatePosition(component: Position): void {
    if (
      !component ||
      typeof component.x !== "number" ||
      typeof component.y !== "number"
    ) {
      throw new Error("Invalid component position provided");
    }
    this.updatePoint();
    this.notifyPositionChange();
  }

  private updatePoint(): void {
    this.point = transformations[this.side](
      this.component.getPosition(),
      this.alpha,
      this.component.getWidth(),
      this.component.getHeight()
    );
  }

  private notifyPositionChange(): void {
    this.observers.forEach((observer) => {
      observer.onPositionChange(this);
    });
  }
  private notifyStateChange(): void {
    this.observers.forEach((observer) => {
      observer.onStateChange(this);
    });
  }
  public setGlobalPosition(position: Position): void {
    this.globalPos = PositionConverter.positionToRoundPosition(position);
  }
  getGlobalPosition(): Position {
    return this.globalPos;
  }
}

export const transformations: Record<
  ComponentSides,
  (point: Position, alpha: number, width: number, height: number) => Position
> = {
  [ComponentSides.TOP]: (
    point: Position,
    alpha: number,
    width: number,
    height: number
  ): Position => {
    return PositionConverter.positionToRoundPosition({
      x: point.x + alpha * width,
      y: point.y,
    });
  },
  [ComponentSides.LEFT]: (
    point: Position,
    alpha: number,
    width: number,
    height: number
  ): Position => {
    return PositionConverter.positionToRoundPosition({
      x: point.x,
      y: point.y + (1 - alpha) * height,
    });
  },
  [ComponentSides.BOTTOM]: (
    point: Position,
    alpha: number,
    width: number,
    height: number
  ): Position => {
    return PositionConverter.positionToRoundPosition({
      x: point.x + (1 - alpha) * width,
      y: point.y + height,
    });
  },
  [ComponentSides.RIGHT]: (
    point: Position,
    alpha: number,
    width: number,
    height: number
  ): Position => {
    return PositionConverter.positionToRoundPosition({
      x: point.x + width,
      y: point.y + alpha * height,
    });
  },
};
