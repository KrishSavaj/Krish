import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_SIZE } from "../constants";
import { Pair } from "../types";

/**
 * Represents a direction with its name and delta values
 */
interface Direction {
  readonly name: string;
  readonly dx: number;
  readonly dy: number;
}

/**
 * Represents details of a cell in the path finding algorithm
 */
interface CellDetails {
  readonly f: number;
  readonly g: number;
  readonly h: number;
  readonly bends: number;
  readonly parentI: number;
  readonly parentJ: number;
  readonly direction: string | null;
}

class Cell {
  parent_i: number;
  parent_j: number;
  f: number;
  g: number;
  h: number;
  bends: number;

  constructor() {
    this.parent_i = 0;
    this.parent_j = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.bends = 0;
  }
}

/**
 * A min-heap implementation for the A* algorithm
 */
class MinHeap {
  private readonly heap: Array<{ f: number; position: Pair }>;

  constructor() {
    this.heap = [];
  }

  /**
   * Swaps two elements in the heap
   * @param i - First index
   * @param j - Second index
   */
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
   * Pushes a new element into the heap
   * @param node - The node to push
   */
  public push(node: { f: number; position: Pair }): void {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Bubbles up a newly added element to maintain heap property
   * @param index - The index of the element to bubble up
   */
  private bubbleUp(index: number): void {
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && this.heap[index].f < this.heap[parentIndex].f) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  /**
   * Pops the minimum element from the heap
   * @returns The minimum element or null if heap is empty
   */
  public pop(): { f: number; position: Pair } | null {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }
    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return root;
  }

  /**
   * Bubbles down the root element to maintain heap property
   * @param index - The index to start bubbling down from
   */
  private bubbleDown(index: number): void {
    let smallest = index;
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;

    if (
      leftChild < this.heap.length &&
      this.heap[leftChild].f < this.heap[smallest].f
    ) {
      smallest = leftChild;
    }

    if (
      rightChild < this.heap.length &&
      this.heap[rightChild].f < this.heap[smallest].f
    ) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.bubbleDown(smallest);
    }
  }

  /**
   * Checks if the heap is empty
   * @returns True if the heap is empty
   */
  public isEmpty(): boolean {
    return this.heap.length === 0;
  }
}

interface Segment {
  direction: string;
  length: number;
  type?: string;
}

/**
 * Implements the A* path finding algorithm
 */
export class PathFinder {
  private static instance: PathFinder;
  private readonly rows: number;
  private readonly cols: number;
  private readonly grid: number[][];
  private wireDensityGrid: number[][];  // Tracks number of wires passing through each cell
  // DIRECTIONS: dx affects row (y-axis), dy affects col (x-axis)
  // grid[row][col] where row is y and col is x
  private static readonly DIRECTIONS: readonly Direction[] = [
    { name: "Top", dx: -1, dy: 0 },      // Moving up decreases row
    { name: "Bottom", dx: 1, dy: 0 },    // Moving down increases row
    { name: "Left", dx: 0, dy: -1 },     // Moving left decreases col
    { name: "Right", dx: 0, dy: 1 },     // Moving right increases col
  ];

  /**
   * Creates a new PathFinder instance
   * Grid dimensions are calculated based on current canvas size
   */
  constructor() {
    this.initializeGrid();
  }
  
  /**
   * Initialize or reinitialize the grid based on current canvas dimensions
   */
  private initializeGrid(): void {
    this.cols = Math.floor(CANVAS_WIDTH / GRID_SIZE);
    this.rows = Math.floor(CANVAS_HEIGHT / GRID_SIZE);
    this.grid = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(0)
    );
    this.wireDensityGrid = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(0)
    );
  }
  
  /**
   * Reinitialize grid when canvas dimensions change
   * Preserves existing blocked cells by transferring them to new grid
   * @param offsetX - Horizontal offset if canvas expanded left
   * @param offsetY - Vertical offset if canvas expanded top
   */
  public reinitializeGrid(offsetX: number = 0, offsetY: number = 0): void {
    const oldGrid = this.grid;
    const oldRows = this.rows;
    const oldCols = this.cols;
    
    // Calculate offset in grid cells
    const cellOffsetX = Math.floor(offsetX / GRID_SIZE);
    const cellOffsetY = Math.floor(offsetY / GRID_SIZE);
    
    // Create new grid with updated dimensions
    const newCols = Math.floor(CANVAS_WIDTH / GRID_SIZE);
    const newRows = Math.floor(CANVAS_HEIGHT / GRID_SIZE);
    const newGrid = Array.from({ length: newRows }, () =>
      Array(newCols).fill(0)
    );
    
    // Transfer blocked cells from old grid to new grid with offset
    for (let oldRow = 0; oldRow < oldRows; oldRow++) {
      for (let oldCol = 0; oldCol < oldCols; oldCol++) {
        if (oldGrid[oldRow][oldCol] !== 0) {
          const newRow = oldRow + cellOffsetY;
          const newCol = oldCol + cellOffsetX;
          
          // Ensure new position is within bounds
          if (newRow >= 0 && newRow < newRows && newCol >= 0 && newCol < newCols) {
            newGrid[newRow][newCol] = oldGrid[oldRow][oldCol];
          }
        }
      }
    }
    
    // Update instance variables
    this.cols = newCols;
    this.rows = newRows;
    this.grid = newGrid;
    
    // Reinitialize wire density grid
    this.wireDensityGrid = Array.from({ length: newRows }, () =>
      Array(newCols).fill(0)
    );
    
    console.log(
      `[PathFinder] Grid resized to ${this.cols}×${this.rows} cells ` +
      `(${CANVAS_WIDTH}×${CANVAS_HEIGHT} px)` +
      (cellOffsetX > 0 || cellOffsetY > 0 
        ? ` with offset (${cellOffsetX}, ${cellOffsetY}) cells`
        : '')
    );
  }

  /**
   * Blocks a cell in the grid
   * @param row - Row index
   * @param col - Column index
   * @param id - The ID to set for the blocked cell
   */
  public block(row: number, col: number, id: number): void {
    if (this.isUnBlocked(row, col) || this.grid[row][col] === id) {
      this.grid[row][col] = id;
    }
  }

  /**
   * Clears all cells with the given ID
   * @param id - The ID to clear
   */
  public clearWithId(id: number): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] === id) {
          this.grid[i][j] = 0;
        }
      }
    }
  }

  /**
   * Unblocks a cell in the grid
   * @param row - Row index
   * @param col - Column index
   */
  public unblock(row: number, col: number): void {
    if (this.isValid(row, col)) {
      this.grid[row][col] = 0;
    }
  }

  /**
   * Checks if a position is valid
   * @param row - Row index
   * @param col - Column index
   * @returns True if the position is valid
   */
  private isValid(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  /**
   * Checks if a cell is unblocked
   * @param row - Row index
   * @param col - Column index
   * @returns True if the cell is unblocked
   */
  private isUnBlocked(row: number, col: number): boolean {
    return this.grid[row][col] === 0;
  }

  /**
   * Checks if a position is the destination
   * @param row - Row index
   * @param col - Column index
   * @param dest - Destination position
   * @returns True if the position is the destination
   */
  private isDestination(row: number, col: number, dest: Pair): boolean {
    return row === dest[0] && col === dest[1];
  }

  /**
   * Calculates the heuristic value for A*
   * Uses Manhattan distance for orthogonal (90-degree) pathfinding
   * @param row - Row index
   * @param col - Column index
   * @param dest - Destination position
   * @returns The heuristic value
   */
  private calculateHValue(row: number, col: number, dest: Pair): number {
    // Manhattan distance is optimal for grid-based orthogonal movement
    return Math.abs(row - dest[0]) + Math.abs(col - dest[1]);
  }

  /**
   * Calculates overlap penalty based on wire density at this cell
   * Enhanced approach: heavily penalize cells with existing wires and consider neighboring density
   * @param row - Row index
   * @param col - Column index
   * @returns The overlap penalty cost
   */
  private calculateOverlapPenalty(row: number, col: number): number {
    const density = this.wireDensityGrid[row][col];
    
    // Stronger exponential penalty: 0 wires = 0, 1 wire = 20, 2 wires = 80, 3 wires = 180
    // This strongly discourages overlapping existing wires
    let penalty = density > 0 ? density * density * 20 : 0;
    
    // Look-ahead penalty: also consider adjacent cells' wire density
    // This helps avoid routing into congested areas
    let adjacentDensity = 0;
    let validNeighbors = 0;
    
    for (const { dx, dy } of PathFinder.DIRECTIONS) {
      const adjRow = row + dx;
      const adjCol = col + dy;
      if (this.isValid(adjRow, adjCol)) {
        adjacentDensity += this.wireDensityGrid[adjRow][adjCol];
        validNeighbors++;
      }
    }
    
    // Add a smaller penalty based on average adjacent density
    // This encourages paths to stay away from congested areas
    if (validNeighbors > 0) {
      const avgAdjacentDensity = adjacentDensity / validNeighbors;
      penalty += avgAdjacentDensity * 5;
    }
    
    return penalty;
  }

  /**
   * Traces the path from destination to source
   * @param cellDetails - The cell details matrix
   * @param dest - Destination position
   * @returns The path as an array of positions
   */
  private tracePath(cellDetails: CellDetails[][], dest: Pair): Pair[] {
    const path: Pair[] = [];
    let [row, col] = dest;

    while (
      !(
        cellDetails[row][col].parentI === row &&
        cellDetails[row][col].parentJ === col
      )
    ) {
      path.push([row, col]);
      [row, col] = [
        cellDetails[row][col].parentI,
        cellDetails[row][col].parentJ,
      ];
    }

    path.push([row, col]);
    path.reverse();

    const aggregatedPath: Pair[] = [path[0]];

    for (let i = 1; i < path.length - 1; i++) {
      const prev = aggregatedPath[aggregatedPath.length - 1];
      const current = path[i];
      const next = path[i + 1];

      if (
        !(
          (prev[0] === current[0] && current[0] === next[0]) ||
          (prev[1] === current[1] && current[1] === next[1])
        )
      ) {
        aggregatedPath.push(current);
      }
    }

    aggregatedPath.push(path[path.length - 1]);
    return aggregatedPath;
  }

  /**
   * Performs A* search to find a path from source to destination
   * @param src - Source position as [row, col]
   * @param dest - Destination position as [row, col]
   * @param use45DegTurns - If true, enables 45-degree diagonal turns after finding orthogonal path
   * @returns The path as an array of [row, col] positions
   */
  public aStarSearch(src: Pair, dest: Pair, use45DegTurns: boolean = false): Pair[] {
    // Debug: uncomment to see grid state
    // this.debugGrid(src, dest);
    
    if (!this.isValid(src[0], src[1]) || !this.isValid(dest[0], dest[1])) {
      console.error(
        `[PathFinder] Invalid position - src: [${src[0]}, ${src[1]}], dest: [${dest[0]}, ${dest[1]}], ` +
        `grid size: ${this.cols}x${this.rows}`
      );
      if (this.isValid(src[0], src[1])) {
        console.error("Destination is invalid");
      } else {
        console.error("Source is invalid");
      }
      return [];
    }
    if (
      !this.isUnBlocked(src[0], src[1]) ||
      !this.isUnBlocked(dest[0], dest[1])
    ) {
      console.error(
        `[PathFinder] Blocked position - src: [${src[0]}, ${src[1]}] (blocked: ${this.grid[src[0]][src[1]]}), ` +
        `dest: [${dest[0]}, ${dest[1]}] (blocked: ${this.grid[dest[0]][dest[1]]})`
      );
      this.debugGrid(src, dest);
      if (this.isUnBlocked(src[0], src[1])) {
        console.error("Destination is blocked");
      } else {
        console.error("Source is blocked");
      }
      return [];
    }
    if (this.isDestination(src[0], src[1], dest)) {
      console.warn("[PathFinder] Already at destination");
      return [];
    }

    const closedList: boolean[][] = Array(this.rows)
      .fill(0)
      .map(() => Array(this.cols).fill(false));

    const cellDetails: CellDetails[][] = Array(this.rows)
      .fill(0)
      .map(() =>
        Array(this.cols)
          .fill(0)
          .map(() => ({
            f: Infinity,
            g: Infinity,
            h: Infinity,
            bends: 0,
            parentI: -1,
            parentJ: -1,
            direction: null,
          }))
      );

    let [i, j] = src;
    cellDetails[i][j] = {
      f: 0,
      g: 0,
      h: 0,
      bends: 0,
      parentI: i,
      parentJ: j,
      direction: null,
    };

    const openList = new MinHeap();
    openList.push({ f: 0, position: [i, j] });

    while (!openList.isEmpty()) {
      const { position } = openList.pop()!;
      [i, j] = position;
      closedList[i][j] = true;

      for (const { name, dx, dy } of PathFinder.DIRECTIONS) {
        const newRow = i + dx;
        const newCol = j + dy;

        // Check if the new position is valid and not blocked by a component
        if (this.isValid(newRow, newCol) && this.isUnBlocked(newRow, newCol)) {
          const gNew = cellDetails[i][j].g + 1;
          const hNew = this.calculateHValue(newRow, newCol, dest);
          
          // Count direction changes (turns) - penalize them to minimize bends
          const bendsNew =
            cellDetails[i][j].direction !== null && cellDetails[i][j].direction !== name
              ? cellDetails[i][j].bends + 1
              : cellDetails[i][j].bends;
          
          // Enhanced overlap avoidance: add penalty for cells with existing wires
          const overlapPenalty = this.calculateOverlapPenalty(newRow, newCol);
          
          // Combine all costs with balanced weights:
          // - gNew: actual distance traveled (weight: 1)
          // - hNew: estimated distance to goal (weight: 1) 
          // - bendPenalty: minimize turns (weight: 8, reduced from 10 to allow flexibility for overlap avoidance)
          // - overlapPenalty: avoid wire congestion (weight: 1, but internally scaled higher)
          const bendPenalty = bendsNew * 8;
          const fNew = gNew + hNew + bendPenalty + overlapPenalty;

          if (this.isDestination(newRow, newCol, dest)) {
            cellDetails[newRow][newCol] = {
              ...cellDetails[newRow][newCol],
              parentI: i,
              parentJ: j,
            };
            const orthogonalPath = this.tracePath(cellDetails, dest);
            return use45DegTurns
              ? this.shortenPathWithDiagonals(orthogonalPath)
              : orthogonalPath;
          }

          if (!closedList[newRow][newCol]) {
            if (cellDetails[newRow][newCol].f > fNew) {
              openList.push({ f: fNew, position: [newRow, newCol] });
              cellDetails[newRow][newCol] = {
                f: fNew,
                g: gNew,
                h: hNew,
                bends: bendsNew,
                parentI: i,
                parentJ: j,
                direction: name,
              };
            }
          }
        }
      }
    }

    console.error(
      `[PathFinder] Failed to find path from [${src[0]}, ${src[1]}] to [${dest[0]}, ${dest[1]}]`
    );
    console.error('[PathFinder] All possible paths are blocked by components');
    this.debugGrid(src, dest);
    return [];
  }

  private shortenPathWithDiagonals(rectilinearPath: Pair[]): Pair[] {
    if (rectilinearPath && rectilinearPath.length <= 2) return rectilinearPath;
    
    // Keep original start and end points to maintain pin connections
    const originalStart = rectilinearPath[0];
    const originalEnd = rectilinearPath[rectilinearPath.length - 1];
    
    // Also preserve the first and last segments (they should remain orthogonal to pins)
    // Only apply diagonals to the middle sections
    if (rectilinearPath.length <= 4) {
      // Too short to optimize - need at least 2 segments at each end + middle
      return rectilinearPath;
    }
    
    // Work with the middle section only (don't modify endpoints)
    const workingPath = [...rectilinearPath];

    function getSegments(coords: Pair[]): Segment[] {
      const segments: Segment[] = [];
      for (let i = 0; i < coords.length - 1; i++) {
        // coords are [row, col] where row=y, col=x
        const [row1, col1] = coords[i];
        const [row2, col2] = coords[i + 1];
        
        if (row1 === row2) {
          // Same row, moving horizontally (changing column)
          const direction = col2 > col1 ? "right" : "left";
          segments.push({ direction, length: Math.abs(col2 - col1) });
        } else if (col1 === col2) {
          // Same column, moving vertically (changing row)
          const direction = row2 > row1 ? "down" : "up";
          segments.push({ direction, length: Math.abs(row2 - row1) });
        } else {
          throw new Error("Path is not rectilinear.");
        }
      }
      return segments;
    }

    function getDiagonalDirection(current: Segment, next: Segment): string {
      const dirMap: Record<string, string> = {
        "up-right": "right-up",
        "right-up": "right-up",
        "up-left": "left-up",
        "left-up": "left-up",
        "down-right": "right-down",
        "right-down": "right-down",
        "down-left": "left-down",
        "left-down": "left-down",
      };
      const key = `${current.direction}-${next.direction}`;
      if (!(key in dirMap)) {
        throw new Error("Invalid direction");
      }
      return dirMap[key];
    }

    /**
     * Converts orthogonal segments to diagonal where possible
     * Processes forward to maximize continuous diagonal segments and minimize turns
     */
    function replaceWithDiagonals(segments: Segment[]): Segment[] {
      const result: Segment[] = [];
      let i = 0;
      
      while (i < segments.length) {
        const current = segments[i];
        
        // Check if we can merge this segment with the next one into a diagonal
        if (i < segments.length - 1) {
          const next = segments[i + 1];
          
          // Check if current and next segments are perpendicular (can form diagonal)
          const canFormDiagonal = 
            (current.direction === "up" && ["left", "right"].includes(next.direction)) ||
            (current.direction === "down" && ["left", "right"].includes(next.direction)) ||
            (["left", "right"].includes(current.direction) && next.direction === "up") ||
            (["left", "right"].includes(current.direction) && next.direction === "down");
          
          if (canFormDiagonal) {
            const minLength = Math.min(current.length, next.length);
            const remainingCurrent = current.length - minLength;
            const remainingNext = next.length - minLength;
            const diagonalDir = getDiagonalDirection(current, next);
            
            // Add remaining part of current segment if any
            if (remainingCurrent > 0) {
              result.push({ ...current, length: remainingCurrent });
            }
            
            // Add the diagonal segment
            result.push({
              type: "diagonal",
              direction: diagonalDir,
              length: minLength,
            });
            
            // Add remaining part of next segment if any
            if (remainingNext > 0) {
              result.push({ ...next, length: remainingNext });
            }
            
            // Skip both segments as we've processed them
            i += 2;
            continue;
          }
        }
        
        // No diagonal possible, add current segment as-is
        result.push(current);
        i++;
      }
      
      return result;
    }

    function getCoordinatesFromSegments(
      segments: Segment[],
      start: Pair
    ): Pair[] {
      // start is [row, col] where row=y, col=x
      let [row, col] = start;
      const coords: Pair[] = [[row, col]];
      
      for (const seg of segments) {
        if (seg.type === "diagonal") {
          switch (seg.direction) {
            case "right-up":
              col += seg.length;  // right increases column
              row -= seg.length;  // up decreases row
              break;
            case "right-down":
              col += seg.length;  // right increases column
              row += seg.length;  // down increases row
              break;
            case "left-up":
              col -= seg.length;  // left decreases column
              row -= seg.length;  // up decreases row
              break;
            case "left-down":
              col -= seg.length;  // left decreases column
              row += seg.length;  // down increases row
              break;
          }
        } else {
          switch (seg.direction) {
            case "right":
              col += seg.length;
              break;
            case "left":
              col -= seg.length;
              break;
            case "up":
              row -= seg.length;  // up decreases row (y decreases)
              break;
            case "down":
              row += seg.length;  // down increases row (y increases)
              break;
          }
        }
        coords.push([row, col]);
      }
      return coords;
    }

    const segments = getSegments(workingPath);
    
    // Protect first and last segments - they must remain orthogonal to connect to pins at 90 degrees
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    
    // Only apply diagonals to middle segments (index 1 to length-2)
    const middleSegments = segments.slice(1, -1);
    const modifiedMiddle = replaceWithDiagonals(middleSegments);
    
    // Reconstruct with protected endpoints
    const finalSegments = [firstSegment, ...modifiedMiddle, lastSegment];
    
    const diagonalPath = getCoordinatesFromSegments(finalSegments, workingPath[0]);
    
    // Ensure the path starts and ends at the original pin positions
    if (diagonalPath.length > 0) {
      diagonalPath[0] = originalStart;
      diagonalPath[diagonalPath.length - 1] = originalEnd;
    }
    
    return this.checkforOverlapWithComponent(diagonalPath, rectilinearPath);
  }

  /**
   * Checks if a diagonal path segment intersects with any blocked cells
   * If any diagonal passes through a component, fall back to orthogonal path
   */
  private checkforOverlapWithComponent(
    positions: Pair[],
    rectilinearPath: Pair[]
  ): Pair[] {
    // Check each segment in the path
    for (let i = 0; i < positions.length - 1; i++) {
      const [row1, col1] = positions[i];
      const [row2, col2] = positions[i + 1];

      // Check if this is a diagonal segment
      if (row1 !== row2 && col1 !== col2) {
        // This is a diagonal - check all cells along the diagonal
        if (this.isDiagonalBlocked(row1, col1, row2, col2)) {
          console.warn('[PathFinder] Diagonal path would pass through component, using orthogonal path');
          return rectilinearPath; // Fall back to safe orthogonal path
        }
      }
    }

    return positions;
  }
  
  /**
   * Checks if a diagonal line segment passes through any blocked cells
   * Uses Bresenham's line algorithm to check all cells along the diagonal
   */
  private isDiagonalBlocked(row1: number, col1: number, row2: number, col2: number): boolean {
    // Get all cells that the diagonal passes through
    const rowStep = row2 > row1 ? 1 : -1;
    const colStep = col2 > col1 ? 1 : -1;
    const steps = Math.abs(row2 - row1); // For 45-degree diagonals, row and col steps are equal
    
    let row = row1;
    let col = col1;
    
    // Check each cell along the diagonal path
    for (let step = 0; step <= steps; step++) {
      if (this.isValid(row, col) && !this.isUnBlocked(row, col)) {
        // This cell is blocked by a component
        return true;
      }
      
      // Check the adjacent cells that the diagonal crosses
      // A diagonal from (r1,c1) to (r2,c2) also passes through edges of adjacent cells
      if (step < steps) {
        // Check the two cells adjacent to this diagonal segment
        const nextRow = row + rowStep;
        const nextCol = col + colStep;
        
        // Check the cell at (row, nextCol) - horizontal neighbor
        if (this.isValid(row, nextCol) && !this.isUnBlocked(row, nextCol)) {
          return true;
        }
        
        // Check the cell at (nextRow, col) - vertical neighbor
        if (this.isValid(nextRow, col) && !this.isUnBlocked(nextRow, col)) {
          return true;
        }
      }
      
      row += rowStep;
      col += colStep;
    }
    
    return false;
  }

  public getCols(): number {
    return this.cols;
  }
  public getRows(): number {
    return this.rows;
  }
  public getGrid(): number[][] {
    return this.grid;
  }
  
  /**
   * Debug helper to visualize the grid state
   * Shows which cells are blocked and by which component ID
   */
  public debugGrid(src?: Pair, dest?: Pair): void {
    console.log('=== PathFinder Grid State ===');
    console.log(`Grid size: ${this.cols} cols × ${this.rows} rows`);
    
    const blockedCells: {[key: number]: number} = {};
    let totalBlocked = 0;
    
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] !== 0) {
          totalBlocked++;
          const id = this.grid[row][col];
          blockedCells[id] = (blockedCells[id] || 0) + 1;
        }
      }
    }
    
    console.log(`Total blocked cells: ${totalBlocked}`);
    console.log('Blocked by component ID:', blockedCells);
    
    if (src) {
      const srcBlocked = this.grid[src[0]]?.[src[1]] || 0;
      console.log(`Source [${src[0]}, ${src[1]}]: ${srcBlocked === 0 ? 'FREE' : 'BLOCKED by ' + srcBlocked}`);
    }
    
    if (dest) {
      const destBlocked = this.grid[dest[0]]?.[dest[1]] || 0;
      console.log(`Dest [${dest[0]}, ${dest[1]}]: ${destBlocked === 0 ? 'FREE' : 'BLOCKED by ' + destBlocked}`);
    }
    
    console.log('============================');
  }
  
  /**
   * Records a wire path to update wire density grid
   * Call this after successfully routing a wire to track its path
   * @param path - The path as array of [row, col] positions
   */
  public recordWirePath(path: Pair[]): void {
    for (const [row, col] of path) {
      if (this.isValid(row, col)) {
        this.wireDensityGrid[row][col]++;
      }
    }
  }
  
  /**
   * Removes a wire path from the density grid
   * Call this when a wire is deleted to update the grid
   * @param path - The path as array of [row, col] positions
   */
  public removeWirePath(path: Pair[]): void {
    for (const [row, col] of path) {
      if (this.isValid(row, col) && this.wireDensityGrid[row][col] > 0) {
        this.wireDensityGrid[row][col]--;
      }
    }
  }
  
  /**
   * Gets the wire density at a specific cell (for debugging)
   * @param row - Row index
   * @param col - Column index
   * @returns Number of wires passing through this cell
   */
  public getWireDensity(row: number, col: number): number {
    if (this.isValid(row, col)) {
      return this.wireDensityGrid[row][col];
    }
    return 0;
  }
  
  /**
   * Clears all wire density data (useful for resetting)
   */
  public clearWireDensity(): void {
    this.wireDensityGrid = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(0)
    );
  }
  
  /**
   * Gets a visualization of the wire density grid for debugging
   * Shows hotspots where multiple wires overlap
   */
  public debugWireDensity(): void {
    console.log('=== Wire Density Heatmap ===');
    
    let maxDensity = 0;
    let overlapCount = 0;
    const densityHistogram: {[key: number]: number} = {};
    
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const density = this.wireDensityGrid[row][col];
        if (density > 0) {
          densityHistogram[density] = (densityHistogram[density] || 0) + 1;
          if (density > 1) overlapCount++;
          if (density > maxDensity) maxDensity = density;
        }
      }
    }
    
    console.log(`Max wire density: ${maxDensity} wires in one cell`);
    console.log(`Cells with overlaps (2+ wires): ${overlapCount}`);
    console.log('Density distribution:', densityHistogram);
    console.log('============================');
  }
  
  public static getInstance(): PathFinder {
    if (!PathFinder.instance) {
      PathFinder.instance = new PathFinder();
    }
    return PathFinder.instance;
  }
}
