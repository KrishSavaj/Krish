import { ViewportCanvas, loadSkin } from "t2dutils/GUI";

declare global {
  interface Window {
    app: PCBDevGUI;
    toggleCategory: (id: string) => void;
  }
}

class PCBDevGUI {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  zoom = 1.0;
  panX = 0;
  panY = 0;
  isDragging = false;
  dragStart = { x: 0, y: 0 };
  selectedObjects: Array<{ x: number; y: number; width: number; height: number }> = [];
  currentTool: string = "select";
  gridVisible = true;
  currentProject: any = null;

  private viewport = new ViewportCanvas();

  constructor() {
    // Mount generic canvas into our DOM container
    const vp = document.getElementById("canvasViewport")!;
    this.viewport.el.id = "mainCanvas";
    this.viewport.el.style.display = "none"; // shown after welcome dismissed
    this.viewport.mount(vp);

    this.canvas = this.viewport.el;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("2D context not available");
    this.ctx = ctx;

    this.init();
  }

  /* ------------------------------- lifecycle ------------------------------ */

  init() {
    this.setupCanvas();
    this.setupEventListeners();
    this.setupToolHandlers();
    this.setupPanelHandlers();

    console.log("PCBDev GUI initialized");
    this.showNotification("PCBDev GUI loaded successfully!", "success");
  }

  setupCanvas() {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    const container = this.canvas.parentElement as HTMLElement;
    const rect = container.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    this.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this.canvas.style.width = rect.width + "px";
    this.canvas.style.height = rect.height + "px";

    // reset transform each resize
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    if (this.currentProject) this.render();
  }

  /* ------------------------------- DOM wiring ----------------------------- */

  setupEventListeners() {
    // Canvas mouse events
    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
    this.canvas.addEventListener("mouseup", (e) => this.onMouseUp(e));
    this.canvas.addEventListener("mouseleave", (e) => this.onMouseUp(e));
    this.canvas.addEventListener("wheel", (e) => this.onWheel(e), { passive: false });

    // Keyboard
    document.addEventListener("keydown", (e) => this.onKeyDown(e));

    // File input
    document.getElementById("fileInput")!.addEventListener("change", (e) => this.handleFileInput(e as any));

    // Welcome quick actions
    document.getElementById("createProjectBtn")!.addEventListener("click", () => this.newProject());
    document.getElementById("openFileBtn")!.addEventListener("click", () =>
      (document.getElementById("fileInput") as HTMLInputElement).click()
    );
  }

  setupToolHandlers() {
    // Toolbar buttons
    (document.getElementById("newProjectBtn") as HTMLButtonElement).addEventListener("click", () => this.newProject());
    (document.getElementById("openProjectBtn") as HTMLButtonElement).addEventListener("click", () => this.openProject());
    (document.getElementById("saveProjectBtn") as HTMLButtonElement).addEventListener("click", () => this.saveProject());

    (document.getElementById("undoBtn") as HTMLButtonElement).addEventListener("click", () => this.undo());
    (document.getElementById("redoBtn") as HTMLButtonElement).addEventListener("click", () => this.redo());

    (document.getElementById("gerberBtn") as HTMLButtonElement).addEventListener("click", () => this.openTool("gerber_parser"));
    (document.getElementById("kicadBtn") as HTMLButtonElement).addEventListener("click", () => this.openTool("kicad_parser"));
    (document.getElementById("viewer3dBtn") as HTMLButtonElement).addEventListener("click", () => this.openTool("3dviewer"));

    // Sidebar tool selection
    document.querySelectorAll<HTMLDivElement>(".tool-item").forEach((item) => {
      item.addEventListener("click", () => {
        const tool = item.dataset.tool!;
        this.selectTool(tool);
        document.querySelectorAll(".tool-item").forEach((t) => t.classList.remove("active"));
        item.classList.add("active");
      });
    });

    // Canvas tabs
    document.querySelectorAll<HTMLButtonElement>(".canvas-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabType = tab.dataset.tab!;
        this.switchCanvasView(tabType);
        document.querySelectorAll(".canvas-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });

    // Zoom controls
    (document.getElementById("zoomInBtn") as HTMLButtonElement).addEventListener("click", () => this.zoomIn());
    (document.getElementById("zoomOutBtn") as HTMLButtonElement).addEventListener("click", () => this.zoomOut());
    (document.getElementById("zoomFitBtn") as HTMLButtonElement).addEventListener("click", () => this.zoomToFit());
    (document.getElementById("zoomToFitBtn") as HTMLButtonElement).addEventListener("click", () => this.zoomToFit());
    (document.getElementById("gridToggleBtn") as HTMLButtonElement).addEventListener("click", () => {
      this.gridVisible = !this.gridVisible;
      this.render();
    });
  }

  setupPanelHandlers() {
    // Sidebar collapse
    (document.getElementById("sidebarCollapseBtn") as HTMLButtonElement).addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar")!;
      sidebar.classList.toggle("collapsed");
      const btn = document.getElementById("sidebarCollapseBtn") as HTMLButtonElement;
      btn.textContent = sidebar.classList.contains("collapsed") ? "▶" : "◀";
    });

    // Properties panel collapse
    (document.getElementById("propertiesCollapseBtn") as HTMLButtonElement).addEventListener("click", () => {
      const panel = document.getElementById("propertiesPanel")!;
      panel.classList.toggle("collapsed");
      const btn = document.getElementById("propertiesCollapseBtn") as HTMLButtonElement;
      btn.textContent = panel.classList.contains("collapsed") ? "◀" : "▶";
    });

    // Layer checkboxes
    document.querySelectorAll<HTMLInputElement>(".layer-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const li = (e.target as HTMLInputElement).closest(".layer-item")!;
        const layerName = (li.querySelector(".layer-name") as HTMLElement).textContent!;
        this.toggleLayer(layerName, (e.target as HTMLInputElement).checked);
      });
    });
  }

  /* --------------------------- Mouse / keyboard --------------------------- */

  onMouseDown(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / this.zoom - this.panX;
    const y = (e.clientY - rect.top) / this.zoom - this.panY;

    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      this.isDragging = true;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.canvas.style.cursor = "move";
    } else if (e.button === 0) {
      this.handleCanvasClick(x, y, e);
    }
    e.preventDefault();
  }

  onMouseMove(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const worldX = ((e.clientX - rect.left) / this.zoom - this.panX).toFixed(2);
    const worldY = ((e.clientY - rect.top) / this.zoom - this.panY).toFixed(2);
    (document.getElementById("mousePosition") as HTMLElement).textContent = `X: ${worldX} Y: ${worldY}`;

    if (this.isDragging) {
      const deltaX = e.clientX - this.dragStart.x;
      const deltaY = e.clientY - this.dragStart.y;
      this.panX += deltaX / this.zoom;
      this.panY += deltaY / this.zoom;
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.render();
    }
  }

  onMouseUp(_e: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false;
      this.canvas.style.cursor = "crosshair";
    }
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(10, this.zoom * zoomFactor));
    if (newZoom !== this.zoom) {
      const worldX = mouseX / this.zoom - this.panX;
      const worldY = mouseY / this.zoom - this.panY;
      this.zoom = newZoom;
      this.panX = mouseX / this.zoom - worldX;
      this.panY = mouseY / this.zoom - worldY;
      this.updateZoomDisplay();
      this.render();
    }
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "n": e.preventDefault(); this.newProject(); break;
        case "o": e.preventDefault(); this.openProject(); break;
        case "s": e.preventDefault(); this.saveProject(); break;
        case "=": case "+": e.preventDefault(); this.zoomIn(); break;
        case "-": e.preventDefault(); this.zoomOut(); break;
        case "0": e.preventDefault(); this.zoomToFit(); break;
      }
    }
  }

  /* ------------------------------- Project I/O ---------------------------- */

  newProject() {
    this.currentProject = {
      name: "Untitled Project",
      created: new Date(),
      modified: new Date(),
      layers: [],
      components: [],
      traces: [],
      vias: []
    };
    this.hideWelcomeMessage();
    this.render();
    this.showNotification("New project created", "success");
  }

  openProject() {
    (document.getElementById("fileInput") as HTMLInputElement).click();
  }

  saveProject() {
    if (!this.currentProject) {
      this.showNotification("No project to save", "error");
      return;
    }
    const projectData = JSON.stringify(this.currentProject, null, 2);
    this.downloadFile(projectData, "project.pcbdev", "application/json");
    this.showNotification("Project saved", "success");
  }

  handleFileInput(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop()!.toLowerCase();

    if (["gbr","grb","gtl","gbl","gto","gbo","gts","gbs"].includes(ext)) {
      this.parseGerberFile(file);
    } else if (["kicad_pcb","pro","sch"].includes(ext)) {
      this.parseKicadFile(file);
    } else if (["pcbdev","json"].includes(ext)) {
      this.loadProjectFromFile(file);
    } else {
      this.showNotification("Unsupported file format", "error");
    }
  }

  parseGerberFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Parsing Gerber:", file.name);
      this.hideWelcomeMessage();
      this.switchCanvasView("gerber");
      this.showNotification(`Gerber file "${file.name}" loaded`, "success");
    };
    reader.readAsText(file);
  }

  parseKicadFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Parsing KiCad:", file.name);
      this.hideWelcomeMessage();
      this.newProject();
      this.showNotification(`KiCad file "${file.name}" loaded`, "success");
    };
    reader.readAsText(file);
  }

  loadProjectFromFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        this.currentProject = data;
        this.hideWelcomeMessage();
        this.render();
        this.showNotification(`Project "${data.name}" loaded`, "success");
      } catch {
        this.showNotification("Invalid project file format", "error");
      }
    };
    reader.readAsText(file);
  }

  /* -------------------------------- Render -------------------------------- */

  render() {
    if (!this.canvas || !this.ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = this.canvas.width / dpr;
    const h = this.canvas.height / dpr;

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.save();
    this.ctx.translate(this.panX, this.panY);
    this.ctx.scale(this.zoom, this.zoom);

    if (this.gridVisible) this.drawGrid();
    this.drawPCB();
    this.drawSelection();

    this.ctx.restore();
  }

  drawGrid() {
    const gridSize = 1.27;
    const dpr = window.devicePixelRatio || 1;
    const w = this.canvas.width / dpr;
    const h = this.canvas.height / dpr;

    const startX = Math.floor(-this.panX / this.zoom / gridSize) * gridSize;
    const startY = Math.floor(-this.panY / this.zoom / gridSize) * gridSize;
    const endX = startX + w / this.zoom + gridSize;
    const endY = startY + h / this.zoom + gridSize;

    this.ctx.strokeStyle = "rgba(255,255,255,0.1)";
    this.ctx.lineWidth = 0.5 / this.zoom;

    this.ctx.beginPath();
    for (let x = startX; x <= endX; x += gridSize) {
      this.ctx.moveTo(x, startY);
      this.ctx.lineTo(x, endY);
    }
    for (let y = startY; y <= endY; y += gridSize) {
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(endX, y);
    }
    this.ctx.stroke();
  }

  drawPCB() {
    this.ctx.strokeStyle = "#00ff00";
    this.ctx.lineWidth = 0.2;
    this.ctx.fillStyle = "rgba(0,255,0,0.3)";

    // Traces
    this.ctx.beginPath();
    this.ctx.moveTo(10, 10);
    this.ctx.lineTo(50, 10);
    this.ctx.lineTo(50, 30);
    this.ctx.lineTo(80, 30);
    this.ctx.stroke();

    // Pads
    this.ctx.fillStyle = "#ff6600";
    this.ctx.fillRect(8, 8, 4, 4);
    this.ctx.fillRect(78, 28, 4, 4);

    // Via
    this.ctx.fillStyle = "#666666";
    this.ctx.beginPath();
    this.ctx.arc(50, 20, 1, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();

    // Outline
    this.ctx.strokeStyle = "#ffff00";
    this.ctx.lineWidth = 0.1;
    this.ctx.strokeRect(0, 0, 100, 60);
  }

  drawSelection() {
    if (this.selectedObjects.length === 0) return;
    this.ctx.strokeStyle = "#0080ff";
    this.ctx.lineWidth = 1 / this.zoom;
    this.ctx.setLineDash([2 / this.zoom, 2 / this.zoom]);
    this.selectedObjects.forEach((o) => this.ctx.strokeRect(o.x - 2, o.y - 2, o.width + 4, o.height + 4));
    this.ctx.setLineDash([]);
  }

  /* --------------------------------- Tools -------------------------------- */

  selectTool(toolName: string) {
    this.currentTool = toolName;
    console.log(`Selected tool: ${toolName}`);
    this.showNotification(`Tool selected: ${toolName}`, "info");
  }

  openTool(toolName: string) {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    switch (toolName) {
      case "gerber_parser":
        fileInput.accept = ".gbr,.grb,.gtl,.gbl,.gto,.gbo,.gts,.gbs";
        fileInput.click();
        break;
      case "kicad_parser":
        fileInput.accept = ".kicad_pcb,.pro,.sch";
        fileInput.click();
        break;
      case "3dviewer":
        this.switchCanvasView("3d");
        break;
      default:
        this.showNotification(`Tool ${toolName} will be implemented soon`, "info");
    }
  }

  switchCanvasView(viewType: string) {
    switch (viewType) {
      case "design":
        if (this.currentProject) this.render();
        else this.showWelcomeMessage();
        break;
      case "3d":
        this.render3DView();
        break;
      case "gerber":
        this.renderGerberView();
        break;
    }
  }

  render3DView() {
    this.hideWelcomeMessage();
    const dpr = window.devicePixelRatio || 1;
    const w = this.canvas.width / dpr;
    const h = this.canvas.height / dpr;
    this.ctx.fillStyle = "#1a1a1a";
    this.ctx.fillRect(0, 0, w, h);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("3D View - Coming Soon", w / 2, h / 2);
  }

  renderGerberView() {
    this.hideWelcomeMessage();
    const dpr = window.devicePixelRatio || 1;
    const w = this.canvas.width / dpr;
    const h = this.canvas.height / dpr;
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, w, h);
    this.ctx.fillStyle = "#00ff00";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Gerber Preview - Load a Gerber file", w / 2, h / 2);
  }

  zoomIn() { this.zoom = Math.min(10, this.zoom * 1.2); this.updateZoomDisplay(); this.render(); }
  zoomOut() { this.zoom = Math.max(0.1, this.zoom / 1.2); this.updateZoomDisplay(); this.render(); }
  zoomToFit() { this.zoom = 1.0; this.panX = 0; this.panY = 0; this.updateZoomDisplay(); this.render(); }

  updateZoomDisplay() {
    const zoomPercent = Math.round(this.zoom * 100);
    (document.getElementById("zoomLevel") as HTMLElement).textContent = `Zoom: ${zoomPercent}%`;
  }

  /* --------------------------------- UI misc ------------------------------ */

  hideWelcomeMessage() {
    (document.getElementById("welcomeMessage") as HTMLElement).style.display = "none";
    this.canvas.style.display = "block";
  }
  showWelcomeMessage() {
    (document.getElementById("welcomeMessage") as HTMLElement).style.display = "block";
    this.canvas.style.display = "none";
  }

  handleCanvasClick(x: number, y: number, _ev: MouseEvent) {
    console.log(`Canvas clicked at (${x}, ${y})`);
  }

  toggleLayer(layerName: string, visible: boolean) {
    console.log(`Layer ${layerName} ${visible ? "shown" : "hidden"}`);
    this.render();
  }

  undo() { this.showNotification("Undo functionality coming soon", "info"); }
  redo() { this.showNotification("Redo functionality coming soon", "info"); }

  showNotification(message: string, type: "success"|"error"|"info" = "info") {
    const n = document.createElement("div");
    n.className = `notification notification-${type}`;
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => {
      n.style.animation = "slideOutRight 0.3s ease-in forwards";
      setTimeout(() => document.body.removeChild(n), 300);
    }, 3000);
  }

  downloadFile(content: string, filename: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }
}

/* ------------------------------- helpers --------------------------------- */

window.toggleCategory = function toggleCategory(categoryId: string) {
  const tools = document.getElementById(`${categoryId}-tools`) as HTMLElement;
  const header = tools.previousElementSibling as HTMLElement;
  const arrow = header.querySelector("span:last-child") as HTMLElement;
  if (tools.style.display === "none") {
    tools.style.display = "block"; arrow.textContent = "▼";
  } else {
    tools.style.display = "none"; arrow.textContent = "▶";
  }
};

/* ------------------------------- bootstrap -------------------------------- */

document.addEventListener("DOMContentLoaded", async () => {
  // Optionally apply generic skin tokens
  try {
    const skin = await loadSkin();
    document.documentElement.style.setProperty("--primary", skin.colors.accent || "#2563eb");
    document.body.style.color = skin.colors.text || "#f1f5f9";
    document.body.style.background = skin.colors.bg || "#1e293b";
  } catch { /* skin optional */ }

  const app = new PCBDevGUI();
  window.app = app;
});
