# FootPrint-Maker

A React application built with PixiJS for designing PCB footprints with precision line drawing, editing capabilities, and geometric constraints.

## 🚀 Getting Started

### Installation
```bash
npm install
npm run dev
```

The application will open in your browser with an interactive grid where you can create precise PCB footprint designs.

## 📖 User Guide

### Core Concepts

- **Grid-based drawing**: All elements snap to a 20-unit grid for precision.
- **Data Structure**: Designs are saved as a `Footprint` containing `Components` (rectangles) and `Connections` (polylines).
- **Angle constraints**: Lines are constrained to 45-degree increments.
- **Pivot points**: Blue dots that mark line vertices and connection points.
- **Interactive feedback**: Visual previews, intersection snapping, and glow effects.
- **Frontend**: React + PixiJS for high-performance graphics.
- **History**: Command pattern for undo/redo functionality.

### Color Coding System

| Color | Meaning |
|-------|---------|
| 🔵 **Blue** | Finalized pivot points (Connection vertices) |
| 🔴 **Red** | Currently active point or pivot being dragged |
| 🟡 **Yellow** | Highlighted neighbors |
| 🟢 **Green** | Hovered interactive points |
| ⚪ **Grey** | Regular grid points |
| 🔵 **Cyan** | Preview lines, guidelines, and temporary graphics |
| 🟣 **Magenta** | Special intersection points while drawing lines, Selection Glow (Edit/Drag modes)|

## 🎯 Five Operating Modes

### Mode 0: Default (Line Drawing)
**Hotkeys:** `Ctrl + 0`

Create precise **Connections** (Polylines) with angle constraints.

**Workflow:**
1. **Click** any point to start a line.
2. **Move mouse** to see direction preview (auto-snaps to allowed angles).
3. **Click** additional points to extend the line.
4. **Finalize** the line using:
   - Right-click on the last point
   - Double-click the last point
   - Press `Enter`

**Controls:**
- `Escape` - Cancel current line
- `Right-click` / `Double-click` / Enter` - Finalize line

---

### Mode 1: Pivot Drag (Connection Modification)
**Hotkeys:** `Ctrl + 1` or `Ctrl + P`

Modify existing **Connections** by moving pivot points. The adjacent segments will automatically adjust to maintain valid angles.

**Workflow:**
1. **Click** any pivot point on a Connection.
2. **Second click options:**
   - **Same point** → Cancel action (no history save) *need to be implemented*
   - **Different point** → Move pivot instantly
   - **Click + drag** → Live preview while dragging

**Features:**
- Only supports Connections 
- Automatic angle constraint preservation
- Smart path re-routing (inserting intermediate points if necessary).
- Visual preview during movement on drag
- Undo/redo support

**Controls:**
- `Escape` - Cancel current operation

---

### Mode 2: Edit (Select/Copy/Paste/Delete)
**Hotkeys:** `Ctrl + 2` or `Ctrl + E`

Manage both Components and Connections with copy, paste, and delete operations.

**Workflow:**
1. **Click** any pivot point to select the entire line *modify to select entire line*
2. **Actions:**
   - `Ctrl + V` - Paste selected line (can copy with offset)
   - `Delete` - Remove selected line

**Features:**
- Copy/Paste preserves element properties (dimensions, paths).
- Visual Feedback: The selected element will glow **Magenta**.
- Multiple paste operations create additional copies
- Full undo/redo support
- Selection persists until `Escape` is pressed, mode is switched or element is removed.

---

### Mode 3: Drag & Drop (Movement)
**Hotkeys:** `Ctrl + 3` or `Ctrl + D`

Move entire elements (Components or Connections) to new positions.

**Workflow:**
1. **Click** any pivot point to select the line *modify to be selectable on clicking any line*
2. **Click** destination point to move the entire line
3. **Or press `Escape`** to cancel selection

**Features:**
- Visual feedback for selected elements.
- Moves complex shape as a single unit.
- Preserves line shape and angles

---

### Mode 4: Rectangle (Component Creation)
**Hotkeys:** `Ctrl + 4` or `Ctrl + B`

Create **Components** (functional parts represented as rectangles).

**Workflow:**
1. **Click** first corner point
2. **Move mouse** to see preview rectangle
3. **Click** diagonally opposite corner to create rectangle
4. **Enter \ Click** - End current component

**Constraints and features:**
- Points cannot be identical
- Points cannot form a zero-width or zero-height line.
- Automatically generates a `Component` entry with a unique ID.
- Preview available for visual feedback

---

## 🎮 Global Controls

### Universal Commands
- `Ctrl + Z` - Undo last action
- `Ctrl + Y` or `Ctrl + Shift + Z` - Redo action
- `Ctrl + S` - **Export JSON**: Downloads footprint.json (cleans internal selection states).
- `R` - Refresh/re-render canvas.
- `Escape` - Clear selection / Cancel operation / Reset state.

### Mode Switching
| Hotkey | Mode | Purpose |
|--------|------|---------|
| `Ctrl + 0` | Default | Connection creation |
| `Ctrl + 1` or `Ctrl + P` | Pivot Drag | Connection vertex editing |
| `Ctrl + 2` or `Ctrl + E` | Edit | Select/Copy/paste/delete |
| `Ctrl + 3` or `Ctrl + D` | Drag & Drop | Move lines |
| `Ctrl + 4` or `Ctrl + B` | Rectangle | Create rectangles |


## 🐛 Known Issues & Roadmap

### 🎨 UI & Visual Feedback
- **Toolbar Missing**: The interface is currently purely keyboard-driven. A visual toolbar for mode switching and actions is planned.
- **Visual Artifacts**: Complex interactions (rapid switching/undoing) may cause temporary color inconsistencies.
- **Axis Rendering**: Dots located exactly on the hidden X/Y axes occasionally display color inconsistencies compared to the rest of the grid.
- **Selection Visibility**: The selection highlight (glow) works but could be visually more prominent.

### 📐 Logic & Constraints
- **Grid Dependency**: Intersection calculation and line finalization are strictly bound to the 20-unit grid. Projected intersections that fall between grid points are not currently supported.
- **Component Overlap**: There is currently no logic to prevent components (rectangles) from overlapping one another.
- **Connection Points**: Components do not yet have defined "pins" or connection nodes.

### 🛠 Bugs & State Management
- **Mode Switching Cleanup**: Switching modes while an operation is active (e.g., halfway through drawing a line) may occasionally fail to reset visual indicators (like neighbor highlights) back to their default state.
- **Deletion Indexing**: Deleting a specifically *pasted* line can sometimes cause the selection highlight to shift incorrectly to an adjacent array index.
- **Manual Refresh**: Due to PixiJS rendering optimizations, some edge-case history operations might not update the canvas immediately, requiring the `R` key.

### 🏗 Architecture & Integration
- **Pipeline Integration**: The application currently generates random/dummy IDs locally. Integration with the main PCB pipeline (messaging mechanism, ID syncing) is required.
- **Code Structure**: The codebase requires further modularization and class abstraction to handle increasing complexity.

### 🔮 Feature Roadmap
- **Import Functionality**: Currently supports JSON export only. Loading/Importing JSON back into the editor is in development.
- **Group Operations**: Support for selecting, dragging, pasting, and deleting multiple elements (groups) at once.
- **Smart Layouts**: Moving a component shouldautomatically adjust adjacent components or reroute attached connections.
- **Pivot Deletion**: Ability to delete a specific vertex (pivot) from a polyline without deleting the entire connection.