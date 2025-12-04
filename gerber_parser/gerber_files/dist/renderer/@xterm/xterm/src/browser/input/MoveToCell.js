"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveToCellSequence = moveToCellSequence;
const EscapeSequences_1 = require("common/data/EscapeSequences");
/**
 * Concatenates all the arrow sequences together.
 * Resets the starting row to an unwrapped row, moves to the requested row,
 * then moves to requested col.
 */
function moveToCellSequence(targetX, targetY, bufferService, applicationCursor) {
    const startX = bufferService.buffer.x;
    const startY = bufferService.buffer.y;
    // The alt buffer should try to navigate between rows
    if (!bufferService.buffer.hasScrollback) {
        return resetStartingRow(startX, startY, targetX, targetY, bufferService, applicationCursor) +
            moveToRequestedRow(startY, targetY, bufferService, applicationCursor) +
            moveToRequestedCol(startX, startY, targetX, targetY, bufferService, applicationCursor);
    }
    // Only move horizontally for the normal buffer
    let direction;
    if (startY === targetY) {
        direction = startX > targetX ? "D" /* Direction.LEFT */ : "C" /* Direction.RIGHT */;
        return repeat(Math.abs(startX - targetX), sequence(direction, applicationCursor));
    }
    direction = startY > targetY ? "D" /* Direction.LEFT */ : "C" /* Direction.RIGHT */;
    const rowDifference = Math.abs(startY - targetY);
    const cellsToMove = colsFromRowEnd(startY > targetY ? targetX : startX, bufferService) +
        (rowDifference - 1) * bufferService.cols + 1 /* wrap around 1 row */ +
        colsFromRowBeginning(startY > targetY ? startX : targetX, bufferService);
    return repeat(cellsToMove, sequence(direction, applicationCursor));
}
/**
 * Find the number of cols from a row beginning to a col.
 */
function colsFromRowBeginning(currX, bufferService) {
    return currX - 1;
}
/**
 * Find the number of cols from a col to row end.
 */
function colsFromRowEnd(currX, bufferService) {
    return bufferService.cols - currX;
}
/**
 * If the initial position of the cursor is on a row that is wrapped, move the
 * cursor up to the first row that is not wrapped to have accurate vertical
 * positioning.
 */
function resetStartingRow(startX, startY, targetX, targetY, bufferService, applicationCursor) {
    if (moveToRequestedRow(startY, targetY, bufferService, applicationCursor).length === 0) {
        return '';
    }
    return repeat(bufferLine(startX, startY, startX, startY - wrappedRowsForRow(startY, bufferService), false, bufferService).length, sequence("D" /* Direction.LEFT */, applicationCursor));
}
/**
 * Using the reset starting and ending row, move to the requested row,
 * ignoring wrapped rows
 */
function moveToRequestedRow(startY, targetY, bufferService, applicationCursor) {
    const startRow = startY - wrappedRowsForRow(startY, bufferService);
    const endRow = targetY - wrappedRowsForRow(targetY, bufferService);
    const rowsToMove = Math.abs(startRow - endRow) - wrappedRowsCount(startY, targetY, bufferService);
    return repeat(rowsToMove, sequence(verticalDirection(startY, targetY), applicationCursor));
}
/**
 * Move to the requested col on the ending row
 */
function moveToRequestedCol(startX, startY, targetX, targetY, bufferService, applicationCursor) {
    let startRow;
    if (moveToRequestedRow(startY, targetY, bufferService, applicationCursor).length > 0) {
        startRow = targetY - wrappedRowsForRow(targetY, bufferService);
    }
    else {
        startRow = startY;
    }
    const endRow = targetY;
    const direction = horizontalDirection(startX, startY, targetX, targetY, bufferService, applicationCursor);
    return repeat(bufferLine(startX, startRow, targetX, endRow, direction === "C" /* Direction.RIGHT */, bufferService).length, sequence(direction, applicationCursor));
}
/**
 * Utility functions
 */
/**
 * Calculates the number of wrapped rows between the unwrapped starting and
 * ending rows. These rows need to ignored since the cursor skips over them.
 */
function wrappedRowsCount(startY, targetY, bufferService) {
    let wrappedRows = 0;
    const startRow = startY - wrappedRowsForRow(startY, bufferService);
    const endRow = targetY - wrappedRowsForRow(targetY, bufferService);
    for (let i = 0; i < Math.abs(startRow - endRow); i++) {
        const direction = verticalDirection(startY, targetY) === "A" /* Direction.UP */ ? -1 : 1;
        const line = bufferService.buffer.lines.get(startRow + (direction * i));
        if (line?.isWrapped) {
            wrappedRows++;
        }
    }
    return wrappedRows;
}
/**
 * Calculates the number of wrapped rows that make up a given row.
 * @param currentRow The row to determine how many wrapped rows make it up
 */
function wrappedRowsForRow(currentRow, bufferService) {
    let rowCount = 0;
    let line = bufferService.buffer.lines.get(currentRow);
    let lineWraps = line?.isWrapped;
    while (lineWraps && currentRow >= 0 && currentRow < bufferService.rows) {
        rowCount++;
        line = bufferService.buffer.lines.get(--currentRow);
        lineWraps = line?.isWrapped;
    }
    return rowCount;
}
/**
 * Direction determiners
 */
/**
 * Determines if the right or left arrow is needed
 */
function horizontalDirection(startX, startY, targetX, targetY, bufferService, applicationCursor) {
    let startRow;
    if (moveToRequestedRow(targetX, targetY, bufferService, applicationCursor).length > 0) {
        startRow = targetY - wrappedRowsForRow(targetY, bufferService);
    }
    else {
        startRow = startY;
    }
    if ((startX < targetX &&
        startRow <= targetY) || // down/right or same y/right
        (startX >= targetX &&
            startRow < targetY)) { // down/left or same y/left
        return "C" /* Direction.RIGHT */;
    }
    return "D" /* Direction.LEFT */;
}
/**
 * Determines if the up or down arrow is needed
 */
function verticalDirection(startY, targetY) {
    return startY > targetY ? "A" /* Direction.UP */ : "B" /* Direction.DOWN */;
}
/**
 * Constructs the string of chars in the buffer from a starting row and col
 * to an ending row and col
 * @param startCol The starting column position
 * @param startRow The starting row position
 * @param endCol The ending column position
 * @param endRow The ending row position
 * @param forward Direction to move
 */
function bufferLine(startCol, startRow, endCol, endRow, forward, bufferService) {
    let currentCol = startCol;
    let currentRow = startRow;
    let bufferStr = '';
    while (currentCol !== endCol || currentRow !== endRow) {
        currentCol += forward ? 1 : -1;
        if (forward && currentCol > bufferService.cols - 1) {
            bufferStr += bufferService.buffer.translateBufferLineToString(currentRow, false, startCol, currentCol);
            currentCol = 0;
            startCol = 0;
            currentRow++;
        }
        else if (!forward && currentCol < 0) {
            bufferStr += bufferService.buffer.translateBufferLineToString(currentRow, false, 0, startCol + 1);
            currentCol = bufferService.cols - 1;
            startCol = currentCol;
            currentRow--;
        }
    }
    return bufferStr + bufferService.buffer.translateBufferLineToString(currentRow, false, startCol, currentCol);
}
/**
 * Constructs the escape sequence for clicking an arrow
 * @param direction The direction to move
 */
function sequence(direction, applicationCursor) {
    const mod = applicationCursor ? 'O' : '[';
    return EscapeSequences_1.C0.ESC + mod + direction;
}
/**
 * Returns a string repeated a given number of times
 * Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 * @param count The number of times to repeat the string
 * @param str The string that is to be repeated
 */
function repeat(count, str) {
    count = Math.floor(count);
    let rpt = '';
    for (let i = 0; i < count; i++) {
        rpt += str;
    }
    return rpt;
}
