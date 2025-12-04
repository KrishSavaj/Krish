// ============================================================================
// PCB FOOTPRINT DATA STRUCTURES
// ============================================================================

export type pointTuple = [number, number];

export interface Component {
    id: string;              // internal UUID 
    componentId: string;     // functional ID 
    name: string;            // e.g., "Resistor"
    pins: pointTuple[];      // coordinates relative to position
    width: number;
    height: number;
    position: pointTuple;    // Absolute position [x, y]
    rotation: number;        // 0, 90, 180, 270
    color?: string;          // Hex string
    selected?: boolean;      // Runtime state (not saved to JSON)
}

export interface Polyline {
    id: string;
    component1?: string;     // UUID of start component
    component2?: string;     // UUID of end component
    pin1?: number;          // Index of pin on component1
    pin2?: number;          // Index of pin on component2
    path: pointTuple[];      
    selected?: boolean;      // Runtime state
}

export interface Footprint {
    components: Component[];
    connections: Polyline[];
    metadata?: {
        version?: string;
        lastModified?: string;
    };
}

// Helper for generating UUIDs
export function generateId(): string {
    return 'u' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}