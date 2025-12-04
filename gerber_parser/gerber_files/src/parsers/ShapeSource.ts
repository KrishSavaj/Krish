// src/parsers/ShapeSource.ts

import { CanonicalShape } from "../models/CanonicalShape";

/**
 * Any source (Gerber, IPC2581, ODB++, OpenCascade…) must
 * implement this to produce our shared CanonicalShape list.
 */
export interface ShapeSource {
  /**
   * Load or parse shapes from whatever backend or file,
   * and return them in the neutral CanonicalShape format.
   */
  loadShapes(): Promise<CanonicalShape[]>;
}
