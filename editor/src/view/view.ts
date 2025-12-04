import { Svg, SVG } from "@svgdotjs/svg.js";
import { Grid } from "./grid";
import { TemporaryWires } from "./temporary-wires";
import { SelectBox } from "./select-box";
import { Vt } from "./vt";
import { CANVAS_HEIGHT, CANVAS_WIDTH, initializeCanvasDimensions } from "../constants";
import { VComponentManager } from "./v-component-manager";
import { PositionConverter } from "../utils/position-converter";
import { VContextMenu } from "./v-context-menu";
import { VWireManager } from "./v-wire-manager";
import { SideMenu } from "./side-menu";
import { CanvasManager } from "../utils/canvas-manager";

export class View {
  private parentId: string;
  private canvas: Svg;

  private grid: Grid;
  private temporaryWires: TemporaryWires;
  private wireManager: VWireManager;
  private vComponentManager: VComponentManager;
  private selectBox: SelectBox;
  private vt: Vt;
  private vContextMenu: VContextMenu;
  private sideMenu: SideMenu;

  constructor(parentId: string) {
    // Initialize canvas dimensions based on screen size
    initializeCanvasDimensions();
    
    this.parentId = parentId;
    let parent = "#" + parentId;
    let element = document.querySelector(parent);
    if (parentId === undefined || parentId === null || !element) {
      document.body.innerHTML += `<div id="${parentId}"></div>`;
    }

    element = document.querySelector(parent);
    PositionConverter.canvas = element as HTMLElement;
    SelectBox.setParent(element as HTMLElement);

    this.canvas = SVG()
      .addTo(parent)
      .size(CANVAS_WIDTH, CANVAS_HEIGHT)
      .viewbox(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      .panZoom({
        // zooming
        zoomMin: 0.2,
        zoomMax: 8,
        zoomFactor: 0.2, // step for programmatic zoomIn/Out

        wheelZoom: false, // wheel zoom enabled (cursor-centric)

        // panning
        panButton: 1, // left mouse button drags to pan (0=left, 1=middle, 2=right)
        oneFingerPan: false, // touch devices: 1-finger pan, 2-finger pinch zoom
      });

    this.grid = new Grid(this.canvas, "gridGroup");
    this.wireManager = new VWireManager(this.canvas, "wiresGroup");
    this.temporaryWires = new TemporaryWires(
      this.canvas,
      "temporaryWiresGroup"
    );
    this.vComponentManager = new VComponentManager(
      this.canvas,
      "componentGroup"
    );
    this.vt = new Vt(this.canvas, "vtGroup");
    this.selectBox = new SelectBox(
      this.canvas,
      "selectBoxGroup",
      this.vComponentManager
    );
    this.vContextMenu = new VContextMenu(
      this.canvas,
      element as HTMLElement,
      this.vComponentManager,
      this.vt
    );

    // Register Vt manager with VComponentManager for copy/paste support
    VComponentManager.setVtManager(this.vt);

    // Initialize side menu
    this.sideMenu = new SideMenu(this.vt);
    
    // Initialize canvas manager for auto-expansion
    CanvasManager.getInstance().initialize(this.canvas, () => {
      this.grid.updateDimensions();
    });

    this.initView();
  }

  private initView(): void {
    this.grid.init();
    this.temporaryWires.init();
    this.wireManager.init();
    this.selectBox.init();
    this.vt.init();
    this.sideMenu.init();
    
    // Handle window resize to update canvas dimensions
    this.setupResizeHandler();
  }
  
  /**
   * Set up window resize handler to update canvas on screen size changes
   */
  private setupResizeHandler(): void {
    let resizeTimeout: number;
    
    window.addEventListener('resize', () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        initializeCanvasDimensions();
        // Update canvas size
        this.canvas.size(CANVAS_WIDTH, CANVAS_HEIGHT);
        this.canvas.viewbox(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // Reinitialize grid to match new dimensions
        this.grid.updateDimensions();
      }, 250);
    });
  }
}
