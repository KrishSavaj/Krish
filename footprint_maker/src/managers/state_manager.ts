import { Graphics } from 'pixi.js';
import { Footprint, pointTuple} from '../types/footprint';

// Forward declaration
export interface InteractiveDot extends Graphics {
    lastTapTime?: number;
    x: number;
    y: number;
    parentComponentId?: string; // Link dot to a specific component
}
export type lineData = pointTuple[];

class StateManager {
    // Singleton Instance
    private static instance: StateManager;

    // --- Application Data ---
    public footprint: Footprint = {
        components: [],
        connections: []
    };
    public renderedGraphics: Graphics[] = []; // The Pixi objects
    public dots: InteractiveDot[] = [];
    public pivotDots: Set<InteractiveDot> = new Set();
    public lineContainer: Graphics | null = null;

    // Selection Highlight ---
    public selectionHighlight: Graphics | null = null; 

    // --- Application State ---
    public mode: number = 0;
    public isLineCompleted: boolean = true;
    public currentLine: Graphics | null = null;
    public currentPath: pointTuple[] = [];
    
    // --- Selection State ---
    public selectedDot: InteractiveDot | null = null;
    public hoveredDot: InteractiveDot | null = null;
    // to know selcted a - connection or component
    public selectedElement: { type: 'connection' | 'component', index: number } | null = null;

    // Legacy getter/setters to map to selectedElement for old code
    public get selectedLineIndex(): number | null {
        return this.selectedElement ? this.selectedElement.index : null;
    }
    public set selectedLineIndex(val: number | null) {
        // No-op or log warning, we should use selectedElement directly
        console.warn("Attempted to set selectedLineIndex directly. Use selectedElement.");
    }

    // public selectedLineIndex: number | null = null;
    public isLineSelected: boolean = false;
    public highlightedNeighbors: InteractiveDot[] = [];

    // --- Rectangle State ---
    public isRectangleInProgress: boolean = false;

    // --- Temporary Visuals ---
    public tempGuideLine: Graphics | null = null;
    public rectPreviewLine: Graphics | null = null;
    public intersectionDot: InteractiveDot | null = null;

    private constructor() {}

    public static getInstance(): StateManager {
        if (!StateManager.instance) {
            StateManager.instance = new StateManager();
        }
        return StateManager.instance;
    }

    // --- Helper Methods ---

    public resetDrawingState() {
        this.currentLine = null;
        this.currentPath = [];
        this.isLineCompleted = true;
        this.selectedDot = null;
        this.highlightedNeighbors = [];
        
        // Clear guides
        if (this.tempGuideLine && this.lineContainer) {
            this.lineContainer.removeChild(this.tempGuideLine);
            this.tempGuideLine.destroy();
            this.tempGuideLine = null;
        }
    }
}

export const state = StateManager.getInstance();