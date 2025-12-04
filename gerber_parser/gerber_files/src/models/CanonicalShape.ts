// src/models/CanonicalShape.ts

/**
 * A single point in our shared, source-neutral format.
 */
export interface CanonicalPoint {
    x: number;   // X coordinate in 2D space
    y: number;   // Y coordinate in 2D space
  }
  
  /**
   * Our source-neutral description of _any_ 2D shape.
   *
   * - `type` distinguishes among various geometric primitives.
   * - `label` gives a human-friendly name for UI or logging.
   * - Depending on `type`, different properties carry the required data.
   */
  export interface CanonicalShape {
    /**
     * The geometric kind of this shape.
     * - 'line':   straight segment between two points
     * - 'circle': full circle (aperture)
     * - 'arc':    circular arc (G02/CW or G03/CCW)
     * - 'flash':  single-point pad/flash (Gerber D03)
     * - 'polygon':regular polygon by center/diameter/sides
     * - 'outline': open or closed polyline/polygon of arbitrary points
     */
    type:    'line'
           | 'circle'
           | 'arc'
           | 'flash'
           | 'polygon'
           | 'outline';
  
    label:   string;  // Human-readable identifier for menus or debugging
  
    /** For types that consist of straight segments (line or outline) */
    points?: CanonicalPoint[];
  
    /** Circle-specific: center location */
    center?: CanonicalPoint;
    /** Circle-specific: radius length */
    radius?: number;
  
    /** Arc-specific: I (X) offset from start point to center */
    iOffset?: number;
    /** Arc-specific: J (Y) offset from start point to center */
    jOffset?: number;
  
    /** Polygon-specific: number of sides */
    sides?: number;
    /** Polygon-specific: diameter across flats */
    diameter?: number;
    /** Polygon-specific: rotation angle in degrees */
    rotation?: number;
  }
  