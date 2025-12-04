// src/parsers/GerberParser.ts

// Import the ShapeSource interface so our parser matches the expected contract
import { ShapeSource } from "./ShapeSource";

// Import the canonical, source-neutral shape types that our editor core understands
import { CanonicalShape, CanonicalPoint } from "../models/CanonicalShape";

/**
 * GerberParser
 *
 * Implements the ShapeSource interface to turn raw Gerber data
 * into our common CanonicalShape objects.
 */
export class GerberParser implements ShapeSource {
  /**
   * @param gerberText
   *   The full text of a Gerber file (RS-274X) as a string.
   *   In the future this might come from a C++ PCBBaseline exporter
   *   or direct file read in JS.
   */
  constructor(private gerberText: string) {}

  /**
   * loadShapes()
   *
   * Reads through the supplied Gerber text and emits a Promise
   * that resolves to an array of CanonicalShape objects.
   *
   * Right now this is a stub—so it just logs a warning and returns []
   * so that the editor will compile and run without errors.
   *
   * Later, you’ll replace this body with:
   * 1. Call into your PCBBaseline importGerber(...) binding
   * 2. Receive back a vector<Shape> or JSON from C++
   * 3. Map that into our CanonicalShape interface
   */
  async loadShapes(): Promise<CanonicalShape[]> {
    // Inform the developer that this method needs a real implementation
    console.warn("GerberParser.loadShapes() is still a stub");
    // Return an empty array for now to satisfy the interface
    return [];
  }
}
