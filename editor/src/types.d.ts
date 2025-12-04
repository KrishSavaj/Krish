export type Position = { x: number; y: number };
export type Pair = [number, number];

export enum ComponentSides {
  TOP = 0,
  RIGHT = 1,
  BOTTOM = 2,
  LEFT = 3,
}
export enum ConnectionPointState {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export type ConnectionPointData = {
  id: number;
  name: string;
  location: number;
};

export enum MResizePointType {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

export type RotationCount = 0 | 1 | 2 | 3;
