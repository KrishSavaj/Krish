import {state, lineData} from '../managers/state_manager.ts';
import { pointTuple } from '../types/footprint.ts';
import { historyManager, DeleteElementCommand, CopyPasteElementCommand } from '../managers/undo_redo.ts';
import { clearSelectionHighlight, getAllRenderablePaths } from '../functions/utils';
/**
 * Checks if a point exists on any line
 * @returns [found, lineIndex, pointIndex]
 */
export function findLine(x: number, y: number): [boolean, number, number] {

    const allPaths = getAllRenderablePaths();

    for (let i = 0; i < allPaths.length; i++) {
        const line = allPaths[i].path;
        for (let j = 0; j < line.length; j++) {
            if (line[j][0] === x && line[j][1] === y) {
                // Determine selection type and index
                state.selectedElement = {
                    type: allPaths[i].type,
                    index: allPaths[i].index
                };
                return [true, i, j]; // Found the point in the line
            }
        }
    }
    return [false, -1, -1]; // No matching line found
}

// Keep a counter for paste operations
let pasteCounter = 0;

// Add function to reset paste counter
export function resetPasteCounter(): void {
    pasteCounter = 0;
    console.log('Paste counter reset');
}

export function pasteLine(): void {
    if (!state.selectedElement) {
            console.warn("Nothing selected to paste");
            return;
        }

        const { type, index } = state.selectedElement;
        
        const baseOffset = 20;
        const offsetMultiplier = pasteCounter + 1;
        const offset: pointTuple = [baseOffset * offsetMultiplier, baseOffset * offsetMultiplier];

        let sourceData;
        
        if (type === 'connection') {
            sourceData = state.footprint.connections[index];
        } else {
            sourceData = state.footprint.components[index];
        }

        if (sourceData) {
            const command = new CopyPasteElementCommand(type, sourceData, offset);
            historyManager.execute(command);
            pasteCounter++;    
            console.log(`${type} pasted`);
        }
}

export function deleteLine(): void {
    if (state.selectedElement) {
        const command = new DeleteElementCommand(state.selectedElement.type, state.selectedElement.index);
        historyManager.execute(command);
        console.log(`Deleted ${state.selectedElement.type} at index ${state.selectedElement.index}`);
        clearSelectionHighlight();
        state.selectedElement = null;
    } else {
        console.warn("Nothing selected to delete");
    }
}