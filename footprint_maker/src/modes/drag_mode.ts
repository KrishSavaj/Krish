import {state, lineData} from '../managers/state_manager.ts';
import { pointTuple } from '../types/footprint.ts';
import { historyManager, DragElementCommand } from '../managers/undo_redo.ts';

export function calculateDragDistance(x1: number, y1: number, x2: number, y2: number): pointTuple {
    return [x2 - x1, y2 - y1];
}

export function dragLine(line: lineData, startX: number, startY: number, endX: number, endY: number): void {
    // We assume the element to be dragged is already selected in state.selectedElement
    // 'line' argument is kept for compatibility but we rely on state
    
    if (!state.selectedElement) {
        console.warn("No element selected for dragging");
        return;
    }

    const command = new DragElementCommand(
        state.selectedElement.type,
        state.selectedElement.index,
        startX,
        startY,
        endX,
        endY
    );
    
    historyManager.execute(command);
    console.log('Element dragged with undo-redo support');
}