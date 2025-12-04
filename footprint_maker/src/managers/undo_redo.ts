import { state, lineData, InteractiveDot } from './state_manager';
import { clearAllLines, renderLines, getDotAtPosition, componentToPoints } from '../functions/utils';
import { GREY, BLUE } from '../constants/colors';
import { BlurFilter } from 'pixi.js';
import { Polyline, Component, pointTuple, generateId } from '../types/footprint';

export class HistoryManager {
    undoStack: Command[];
    redoStack: Command[];
    maxStackSize: number;

    constructor() {
        this.undoStack = [];
        this.redoStack = [];
        this.maxStackSize = 50;
    }

    execute(command: Command): any {
        const result = command.execute();
        this.undoStack.push(command);
        if (this.undoStack.length > this.maxStackSize) this.undoStack.shift();
        this.redoStack = [];
        console.log(`Command executed: ${command.constructor.name}`);
        return result;
    }

    undo(): void {
        if (this.undoStack.length === 0) return;
        const command = this.undoStack.pop();
        if (command) {
            command.undo();
            this.redoStack.push(command);
            console.log(`Undid command: ${command.constructor.name}`);
        }
    }

    redo(): void {
        if (this.redoStack.length === 0) return;
        const command = this.redoStack.pop();
        if (command) {
            command.execute();
            this.undoStack.push(command);
            console.log(`Redid command: ${command.constructor.name}`);
        }
    }
}

export abstract class Command {
    id: string;
    constructor() {
        this.id = generateId();
    }
    abstract execute(): any;
    abstract undo(): void;
}

// --- CREATION COMMANDS ---

export class LineCreatedCommand extends Command {
    polyline: Polyline;
    index: number | null = null;
    pivotPoints: InteractiveDot[] = [];

    constructor(polyline: Polyline) {
        super();
        this.polyline = JSON.parse(JSON.stringify(polyline));
    }
//         this.lineIndex = null;
//         this.pivotPoints = [];
    execute(): number {
        state.footprint.connections.push(this.polyline);
        this.index = state.footprint.connections.length - 1;
        this.updatePivots(true);
        renderLines();
        return this.index;
    }

    undo(): void {
        if (this.index !== null) {
            state.footprint.connections.splice(this.index, 1);
            this.updatePivots(false);
            renderLines();
        }
    }

    private updatePivots(active: boolean): void {
        this.polyline.path.forEach(point => {
            const dot = getDotAtPosition(point[0], point[1]);
            if (dot) {
                if (active) state.pivotDots.add(dot);
                else {
                    state.pivotDots.delete(dot);
                    dot.clear();
                    dot.beginFill(GREY);
                    dot.drawCircle(0, 0, 2);
                    dot.endFill();
                    dot.filters = [];
                }
            }
        });
    }
}

export class RectangleCreatedCommand extends Command {
    component: Component;
    index: number | null = null;

    constructor(component: Component) {
        super();
        this.component = JSON.parse(JSON.stringify(component));
    }

    execute(): number {
        state.footprint.components.push(this.component);
        this.index = state.footprint.components.length - 1;
        
        // Register pivots for component corners
        const points = componentToPoints(this.component);
        points.forEach(p => {
            const dot = getDotAtPosition(p[0], p[1]);
            if(dot) state.pivotDots.add(dot);
        });

        renderLines();
        return this.index;
    }

    undo(): void {
        if (this.index !== null) {
            state.footprint.components.splice(this.index, 1);
            renderLines(); // Pivot cleanup handled by clearAllLines in renderLines
        }
    }
}

// --- DELETION COMMAND ---

export class DeleteElementCommand extends Command {
    type: 'connection' | 'component';
    index: number;
    deletedData: Polyline | Component | null = null;

    constructor(type: 'connection' | 'component', index: number) {
        super();
        this.type = type;
        this.index = index;
    }

    execute(): void {
        if (this.type === 'connection') {
            if (this.index >= 0 && this.index < state.footprint.connections.length) {
                this.deletedData = JSON.parse(JSON.stringify(state.footprint.connections[this.index]));
                state.footprint.connections.splice(this.index, 1);
            }
        } else {
            if (this.index >= 0 && this.index < state.footprint.components.length) {
                this.deletedData = JSON.parse(JSON.stringify(state.footprint.components[this.index]));
                state.footprint.components.splice(this.index, 1);
            }
        }
        renderLines();
        state.selectedElement = null;
    }

    undo(): void {
        if (this.deletedData) {
            if (this.type === 'connection') {
                state.footprint.connections.splice(this.index, 0, this.deletedData as Polyline);
            } else {
                state.footprint.components.splice(this.index, 0, this.deletedData as Component);
            }
            renderLines();
        }
    }
}

// --- MODIFICATION COMMANDS ---

export class ModifyConnectionCommand extends Command {
    index: number; // Index in connections array
    originalPath: pointTuple[];
    modifiedPath: pointTuple[];

    constructor(index: number, originalPath: pointTuple[], modifiedPath: pointTuple[]) {
        super();
        this.index = index;
        this.originalPath = JSON.parse(JSON.stringify(originalPath));
        this.modifiedPath = JSON.parse(JSON.stringify(modifiedPath));
    }

    execute(): boolean {
        if (this.index >= 0 && this.index < state.footprint.connections.length) {
            state.footprint.connections[this.index].path = this.modifiedPath;
            renderLines();
            return true;
        }
        return false;
    }

    undo(): boolean {
        if (this.index >= 0 && this.index < state.footprint.connections.length) {
            state.footprint.connections[this.index].path = this.originalPath;
            renderLines();
            return true;
        }
        return false;
    }
}

export class DragElementCommand extends Command {
    type: 'connection' | 'component';
    index: number;
    startX: number; startY: number;
    endX: number; endY: number;
    
    // Store deep copies of original state to avoid reference issues
    originalConnection: Polyline | null = null;
    originalComponent: Component | null = null;

    constructor(type: 'connection' | 'component', index: number, startX: number, startY: number, endX: number, endY: number) {
        super();
        this.type = type;
        this.index = index;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;

        // Capture initial state
        if (type === 'connection' && state.footprint.connections[index]) {
            this.originalConnection = JSON.parse(JSON.stringify(state.footprint.connections[index]));
        } else if (type === 'component' && state.footprint.components[index]) {
            this.originalComponent = JSON.parse(JSON.stringify(state.footprint.components[index]));
        }
    }

    execute(): void {
        const dx = this.endX - this.startX;
        const dy = this.endY - this.startY;

        if (this.type === 'connection') {
            const conn = state.footprint.connections[this.index];
            if (conn) {
                conn.path = conn.path.map(p => [p[0] + dx, p[1] + dy]);
            }
        } else {
            const comp = state.footprint.components[this.index];
            if (comp) {
                comp.position = [comp.position[0] + dx, comp.position[1] + dy];
            }
        }
        renderLines();
    }

    undo(): void {
        if (this.type === 'connection' && this.originalConnection) {
            state.footprint.connections[this.index] = JSON.parse(JSON.stringify(this.originalConnection));
        } else if (this.type === 'component' && this.originalComponent) {
            state.footprint.components[this.index] = JSON.parse(JSON.stringify(this.originalComponent));
        }
        renderLines();
    }
}

export class CopyPasteElementCommand extends Command {
    type: 'connection' | 'component';
    sourceData: Polyline | Component;
    offset: [number, number];
    pastedIndex: number | null = null;

    constructor(type: 'connection' | 'component', sourceData: Polyline | Component, offset: [number, number] = [20, 20]) {
        super();
        this.type = type;
        this.sourceData = JSON.parse(JSON.stringify(sourceData));
        this.offset = offset;
    }

    execute(): void {
        if (this.type === 'connection') {
            const source = this.sourceData as Polyline;
            const newPath: pointTuple[] = source.path.map(p => [
                p[0] + this.offset[0],
                p[1] + this.offset[1]
            ]);

            const newPolyline: Polyline = {
                id: generateId(),
                path: newPath,
                selected: false
            };

            state.footprint.connections.push(newPolyline);
            this.pastedIndex = state.footprint.connections.length - 1;
        } 
        else {
            const source = this.sourceData as Component;
            const newComponent: Component = {
                ...source,
                id: generateId(),
                position: [
                    source.position[0] + this.offset[0],
                    source.position[1] + this.offset[1]
                ]
            };
            
            state.footprint.components.push(newComponent);
            this.pastedIndex = state.footprint.components.length - 1;
            
            // Add pivots for the new component
            const points = componentToPoints(newComponent);
            points.forEach(p => {
                const dot = getDotAtPosition(p[0], p[1]);
                if(dot) state.pivotDots.add(dot);
            });
        }
        
        renderLines();
    }

    undo(): void {
        if (this.pastedIndex !== null) {
            if (this.type === 'connection') {
                state.footprint.connections.splice(this.pastedIndex, 1);
            } else {
                state.footprint.components.splice(this.pastedIndex, 1);
            }
            renderLines();
        }
    }
}

export const historyManager = new HistoryManager();