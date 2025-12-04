import { Graphics, Circle} from 'pixi.js';
import { state, InteractiveDot } from '../managers/state_manager';
import { onDotHover, onDotLeave } from '../events/hover_events';
import { finalizeLine } from '../modes/line_draw_mode';
import { completePivotDrag, isPivotDragging, setPivotLineContainer } from '../modes/pivot_mode';
import { DOUBLE_CLICK_THRESHOLD } from '../constants/defaults';
import { onDotClick } from '../events/click_events';

/**
 * Factory function to create a standardized interactive dot
 */
export function createDot(x: number, y: number): InteractiveDot {
    const point = new Graphics() as InteractiveDot;

    // 1. Appearance
    point.beginFill(0x747575); // Grey
    point.drawCircle(0, 0, 2);
    point.endFill();

    point.x = x;
    point.y = y;

    // 2. Interactivity
    point.hitArea = new Circle(0, 0, 12);
    point.interactive = true;
    point.cursor = 'pointer';

    // 3. Event Listeners (using the modularized functions)
    point.on('pointerover', onDotHover);
    point.on('pointerout', onDotLeave);
    
    // Main Click routing
    point.on('pointerdown', (e) => onDotClick.call(point, e));

    // Double Click (Finalize Line)
    point.on('pointertap', (e) => {
        const now = Date.now();
        if (point.lastTapTime && (now - point.lastTapTime) < DOUBLE_CLICK_THRESHOLD) {
            console.log("Double-click: Finalizing line");
            finalizeLine();
            point.lastTapTime = 0; 
        } else {
            point.lastTapTime = now;
        }
    });

    // Right Click (Finalize Line)
    point.on('rightclick', (e) => {
        e.stopPropagation();
        if (e.originalEvent) {
            e.originalEvent.preventDefault();
        }
        console.log("Right-click: Finalizing line");
        finalizeLine();
    });

    // Pivot Drag Release
    point.on('pointerup', (e) => {
        if (state.mode === 1 && isPivotDragging()) {
            completePivotDrag(point.x, point.y);
            e.stopPropagation();
        }
    });

    // 4. Container Logic (Initialize lineContainer on first dot add)
    point.once('added', () => {
        if (!state.lineContainer && point.parent) {
            state.lineContainer = new Graphics();
            point.parent.addChildAt(state.lineContainer, 0);
            setPivotLineContainer(state.lineContainer);
        }
    });

    // 5. Add to State Registry
    state.dots.push(point);
    
    return point;
}