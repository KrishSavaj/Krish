# PCB Viewer

A sophisticated 3D PCB visualization application leveraging Three.js for rendering printed circuit boards with components, traces, and annotations in real-time.

## Installation

```bash
# Install dependencies, this step may take a while
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technical Overview

### Core Architecture
- **Rendering Engine**: Three.js WebGL renderer with custom geometry processing
- **Component System**: Modular architecture for PCB elements (board, components, traces)
- **Asset Pipeline**: Multi-format 3D model support with automated positioning system
- **Scene Management**: Dynamic scene graph with optimized batch rendering

### Key Features
- **PCB Generation Engine**
  - Parametric PCB mesh generation with configurable dimensions
  - Dynamic hole placement using Three.js Path and Shape systems
  - Extrusion-based geometry with customizable depth and bevel settings
  - Material system with PBR (Physically Based Rendering) support

- **3D Model Integration**
  - Multi-format loader system supporting:
    - GLB (GL Transmission Format)
    - STL (Stereolithography)
    - OBJ (Wavefront)
    - VRML/WRL (Virtual Reality Modeling Language)
  - Automated model positioning with bounding box calculations
  - Dynamic scale and rotation management
  - Collision detection and prevention system

- **Trace Visualization**
  - Vector-based path generation with thickness control
  - Dynamic tessellation for curved paths
  - Optimized geometry batching for performance
  - Start/end pad generation with circular geometry

- **Scene Optimization**
  - Optimized lighting with multiple point lights
  - Efficient camera controls with damping

## Technical Implementation

### Core Components

#### PCB Generation
```typescript
createPCBWithHoles(
  width: number,
  height: number,
  depth: number,
  holes: Array<{
    position: { x: number; z: number },
    radius: number
  }>
): THREE.Mesh
```

#### Scene Configuration

```typescript
interface TextConfig {
  text: string;
  position: { x: number; z: number };
  angle: number;
  size: number;
  isTop: boolean;
}

interface WiringConfig {
  points: { x: number; z: number }[];
  thickness: number;
  color: number;
  isTop: boolean;
}
```

### Project Structure

```
pcb-viewer/
├── src/
│   ├── renderer.ts          # Main rendering pipeline
│   └── main.ts              # Application entry point
├── components/
│   ├── createAxisLabels.ts  # Renders the labels of the axes 
│   ├── createPCBPlane.ts    # Creates the PCB base plane with holes
│   ├── createText.ts        # Renders all the text concurrently
│   └── createWirings.ts     # Renders all the wires concurrently
└── public/
    └── models/             # 3D model assets
```

### Performance Considerations

- Geometry instancing for repeated components
- Optimized lighting calculations with limited point lights and ambient lighting
- Batched geometry updates

### Dependencies

```json
{
  "dependencies": {
    "three": "^0.x.x",
    "@types/three": "^0.x.x"
  }
}
```

### Browser Support

- WebGL 2.0 compatible browsers
- Hardware acceleration recommended
- Minimum recommended resolution: 1024x768

## Live Demo & Development

- **Live Demo**: [PCB Viewer](https://pcb-viewer.netlify.app/)
- **Development Server**: http://localhost:5173 (default Vite configuration)

## License

MIT License - See `LICENSE` for details.

---

### Made with ❤️ by [Riddhidipta Pal](https://github.com/CodingLife1024)

For bug reports and feature requests, please open an issue on the GitHub repository.