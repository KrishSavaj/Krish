// KEYBOARD HANDLERS

import { centerX, centerY } from '../functions/background';
import { handlePivotDragMove, completePivotDrag, cancelPivotDrag, isPivotDragActive, isPivotDragging} from '../modes/pivot_mode';
import { BLUE, GREY} from '../constants/colors'
import { pasteLine, deleteLine } from '../modes/edit_mode';
import { state } from '../managers/state_manager';
import { resetHoverState } from './hover_events';
import { colorDot, restoreIntersectionDotColor, resetSpecificDots, getDotColor } from '../functions/dot_color_utils';
import { historyManager } from '../managers/undo_redo';
import { clearAllLines, renderLines, clearSelectionHighlight} from '../functions/utils';
import { resetRectangleState } from '../modes/rectangle_mode';
import { finalizeLine } from '../modes/line_draw_mode';

document.addEventListener('keydown', (event: KeyboardEvent) => {
  // 1. Line drawing controls
  if (event.key === 'Escape') {
    if (state.mode === 1 && isPivotDragActive()) {
      cancelPivotDrag();
      console.log('Pivot drag cancelled');
    } else {
      cancelCurrentLine();
      // resetSpecificDots();
      removeGuideline();

      if (state.selectedElement) {
          state.selectedElement = null;
          clearSelectionHighlight();
          console.log('Selection cleared');
      }

      console.log('Escape pressed - cancelled current line');
    }
  }

  if (event.key === 'Enter') {
    finalizeLine();
    event.preventDefault();
    console.log('Enter pressed - finalized line');
  }

  // 2. Edit mode controls (Ctrl+V, Delete)
  if (event.ctrlKey && state.mode === 2 && (event.key === 'v' || event.key === 'V')) {
    if (state.selectedLineIndex !== null) {
      pasteLine();
      console.log('Line pasted at index:', state.selectedLineIndex);
    }
    event.preventDefault();
  }

  if (state.mode === 2 && event.key === 'Delete') {
    if (state.selectedLineIndex !== null) {
      deleteLine();
      console.log('Line deleted at index:', state.selectedLineIndex);
    }
  }

  // 3. Drag and drop mode controls
  if (state.mode === 3 && event.key === 'Escape') {
    state.selectedDot = null;
    state.isLineSelected = false;
    state.selectedElement = null; // Clear new selection state too
    console.log('Drag and drop selection cleared');
  }

  // 4. Mode Switching
  
  // Default Mode (Ctrl+0)
  if (event.ctrlKey && event.key === '0') {
    if (state.mode === 4) {
      resetRectangleState();
    }
    state.mode = 0;
    console.log('Mode switched to DEFAULT');
    event.preventDefault();
  }

  // Pivot Mode (Ctrl+1 / Ctrl+P)
  if (event.ctrlKey && (event.key === 'p' || event.key === 'P' || event.key === '1')) {
    const newMode = state.mode === 0 ? 1 : 0;

    if (newMode === 1) {
      enablePivotDragGlobalHandlers();
      console.log('Mode switched to PIVOT DRAG MODE');
    } else {
      disablePivotDragGlobalHandlers();
      cancelPivotDrag(); 
      console.log('Mode switched to DEFAULT');
    }

    state.mode = newMode;
    event.preventDefault();
  }

  // Edit Mode (Ctrl+2 / Ctrl+E)
  if (event.ctrlKey && (event.key === 'e' || event.key === 'E' || event.key === '2')) {
    state.mode = state.mode === 2 ? 0 : 2;
    console.log(`Mode switched to ${state.mode === 2 ? 'EDIT MODE' : 'DEFAULT'}`);
    event.preventDefault();
  }

  // Drag Mode (Ctrl+3 / Ctrl+D)
  if (event.ctrlKey && (event.key === 'd' || event.key === 'D' || event.key === '3')) {
    state.mode = state.mode === 3 ? 0 : 3;
    console.log(`Mode switched to ${state.mode === 3 ? 'DRAG & DROP MODE' : 'DEFAULT'}`);
    event.preventDefault();
  }

  // Rectangle Mode (Ctrl+4 / Ctrl+B)
  if (event.ctrlKey && (event.key === 'b' || event.key === 'B' || event.key === '4')) {
    const newMode = state.mode === 4 ? 0 : 4;
    state.mode = newMode;
    resetRectangleState();

    if (state.mode === 4) {
      console.log('Mode switched to RECTANGLE MODE');
    } else {
      console.log('Mode switched to DEFAULT');
    }
    event.preventDefault();
  }

  // 5. Rendering controls
  if (event.key === 'r' || event.key === 'R') {
    console.log('R pressed - refreshing all lines');
    clearAllLines();
    renderLines(state.footprint);
  }

  // 6. Undo/Redo controls
  if (event.ctrlKey && event.key === 'z' && !event.shiftKey) {
    historyManager.undo();
    console.log('Undo performed');
    event.preventDefault();
  }

  if ((event.ctrlKey && event.key === 'y') || (event.ctrlKey && event.shiftKey && event.key === 'z')) {
    historyManager.redo();
    console.log('Redo performed');
    event.preventDefault();
  }

  // 7. Save / Export JSON (Ctrl+S)
  if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
    event.preventDefault();
    downloadFootprintJson();
  }
});

// Prevent browser context menu
document.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault();
});

// GLOBAL DRAG HANDLERS

export let globalMouseMoveHandler: ((event: MouseEvent) => void) | null = null;
export let globalMouseUpHandler: ((event: MouseEvent) => void) | null = null;

export function enablePivotDragGlobalHandlers(): void {
  if (globalMouseMoveHandler) return;

  globalMouseMoveHandler = (event: MouseEvent) => {
    // Check STATE mode instead of local var
    if (state.mode === 1 && isPivotDragging()) {
      const canvas = (event.target as HTMLElement).closest('canvas') || document.querySelector('canvas');
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left - centerX);
      const y = Math.round(event.clientY - rect.top - centerY);

      handlePivotDragMove(x, y);
    }
  };

  globalMouseUpHandler = (event: MouseEvent) => {
    // Check STATE mode
    if (state.mode === 1 && isPivotDragging()) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left - centerX);
      const y = Math.round(event.clientY - rect.top - centerY);
      
      completePivotDrag(x, y);
      event.preventDefault();
    }
  };

  document.addEventListener('mousemove', globalMouseMoveHandler);
  document.addEventListener('mouseup', globalMouseUpHandler);

  console.log('Global pivot drag handlers enabled');
}

export function disablePivotDragGlobalHandlers(): void {
  if (globalMouseMoveHandler) {
    document.removeEventListener('mousemove', globalMouseMoveHandler);
    globalMouseMoveHandler = null;
  }
  if (globalMouseUpHandler) {
    document.removeEventListener('mouseup', globalMouseUpHandler);
    globalMouseUpHandler = null;
  }
}

// LOCAL HELPER FUNCTIONS

// Helper to download JSON
function downloadFootprintJson() {

   // Replacer function: returns undefined if key is "selected", removing it from output
    const replacer = (key: string, value: any) => {
        if (key === 'selected') {
            return undefined;
        }
        return value;
    };
    // 1. Convert state to JSON string
    const jsonString = JSON.stringify(state.footprint, replacer, 2);
    
    // 2. Log to console
    console.log("--- FOOTPRINT DATA ---");
    console.log(jsonString);

    // 3. Trigger Download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "footprint.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function cancelCurrentLine(): void {
    console.log("Cancelling current line...");
    
    // Handle rectangle mode cancellation
    if (state.mode === 4 && state.isRectangleInProgress) {
        resetRectangleState();
        return;
    }

    // Remove current line graphics
    if (state.currentLine) {
        if (state.lineContainer) {
            state.lineContainer.removeChild(state.currentLine);
        }
        state.currentLine.destroy();
    }
    
    resetSpecificDots();
    // Reset pivot visuals for current line
    state.currentPath.forEach((point) => {
        const pivotDot = state.dots.find(dot => dot.x === point[0] && dot.y === point[1]);
        if (pivotDot && state.pivotDots.has(pivotDot)) {
            // Only reset if it's not a finalized (BLUE) pivot
            const isFinalized = (pivotDot.tint === BLUE || (pivotDot as any).fillColor === BLUE);
            if (!isFinalized) {
                state.pivotDots.delete(pivotDot);
                colorDot(pivotDot, GREY);
            }
        }
    });
    
    // Clean up intersection dot
    if (state.intersectionDot) {
        restoreIntersectionDotColor(state.intersectionDot);
    }
    
    state.resetDrawingState();
    resetHoverState();
    resetSpecificDots();
    
    if (state.hoveredDot) {
        // getDotColor with 'true' will return GREEN for a regular dot, 
        // or RED for a pivot, preserving logical consistency
        colorDot(state.hoveredDot, getDotColor(state.hoveredDot, true));
    }

    console.log("Line cancelled and all state reset");
}

function removeGuideline(): void {
    if (state.tempGuideLine && state.lineContainer) {
        state.lineContainer.removeChild(state.tempGuideLine);
        state.tempGuideLine.destroy();
        state.tempGuideLine = null;
    }
}