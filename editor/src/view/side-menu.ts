import { components } from "../all_components";
import { Vt } from "./vt";
import { PositionConverter } from "../utils/position-converter";
import { MComponentManager } from "../models/m-component-manager";
import { MComponent } from "../models/m-component";

export class SideMenu {
  private menuElement: HTMLDivElement;
  private vtManager: Vt;

  constructor(vtManager: Vt) {
    this.vtManager = vtManager;
    this.menuElement = this.createMenu();
    this.attachToDOM();
  }

  private createMenu(): HTMLDivElement {
    const menu = document.createElement("div");
    menu.id = "side-menu";
    menu.className = "side-menu";

    // Virtual Terminal Section
    const vtSection = this.createVTSection();
    menu.appendChild(vtSection);

    // Components Section
    const componentsSection = this.createComponentsSection();
    menu.appendChild(componentsSection);

    return menu;
  }

  private createVTSection(): HTMLDivElement {
    const section = document.createElement("div");
    section.className = "side-menu-section";

    const heading = document.createElement("h3");
    heading.textContent = "Virtual Terminal";
    heading.className = "side-menu-heading";
    section.appendChild(heading);

    const vtItem = document.createElement("div");
    vtItem.className = "side-menu-item vt-item";
    vtItem.draggable = true;

    // Create a generic terminal image/icon
    const vtIcon = document.createElement("div");
    vtIcon.className = "vt-icon";
    vtIcon.innerHTML = `
      <svg width="50" height="30" viewBox="0 0 50 30">
        <rect x="0" y="0" width="50" height="30" fill="lightgray" stroke="black" stroke-width="1" rx="4"/>
        <text x="25" y="20" font-size="12" font-family="Arial" text-anchor="middle" fill="black">VT</text>
      </svg>
    `;

    const vtLabel = document.createElement("span");
    vtLabel.textContent = "Virtual Terminal";
    vtLabel.className = "side-menu-label";

    vtItem.appendChild(vtIcon);
    vtItem.appendChild(vtLabel);

    // Drag handlers for VT
    vtItem.addEventListener("dragstart", (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData("item-type", "virtual-terminal");
        e.dataTransfer.effectAllowed = "copy";
      }
    });

    section.appendChild(vtItem);
    return section;
  }

  private createComponentsSection(): HTMLDivElement {
    const section = document.createElement("div");
    section.className = "side-menu-section";

    const heading = document.createElement("h3");
    heading.textContent = "Components";
    heading.className = "side-menu-heading";
    section.appendChild(heading);

    const componentsContainer = document.createElement("div");
    componentsContainer.className = "components-container";

    // Add each component from all_components.ts
    components.forEach((component) => {
      const item = document.createElement("div");
      item.className = "side-menu-item component-item";
      item.draggable = true;

      const img = document.createElement("img");
      img.src = component.filePath;
      img.alt = component.name;
      img.className = "component-thumbnail";
      img.width = 40;
      img.height = 40;

      const label = document.createElement("span");
      label.textContent = component.name;
      label.className = "side-menu-label";

      item.appendChild(img);
      item.appendChild(label);

      // Drag handlers for components
      item.addEventListener("dragstart", (e: DragEvent) => {
        if (e.dataTransfer) {
          e.dataTransfer.setData("item-type", "component");
          e.dataTransfer.setData("component-id", component.id);
          e.dataTransfer.effectAllowed = "copy";
        }
      });

      componentsContainer.appendChild(item);
    });

    section.appendChild(componentsContainer);
    return section;
  }

  private attachToDOM(): void {
    document.body.appendChild(this.menuElement);
    this.setupDropZone();
  }

  private setupDropZone(): void {
    const svgWrapper = document.querySelector("#svg-wrapper") as HTMLElement;
    if (!svgWrapper) return;

    svgWrapper.addEventListener("dragover", (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
      }
    });

    svgWrapper.addEventListener("drop", (e: DragEvent) => {
      e.preventDefault();
      if (!e.dataTransfer) return;

      const itemType = e.dataTransfer.getData("item-type");

      // Convert screen coordinates to canvas coordinates
      const canvasPos = PositionConverter.convertFormMouseEventToPosition(
        e as MouseEvent
      );

      if (itemType === "virtual-terminal") {
        // Create a new virtual terminal at the drop position
        this.vtManager.addVirtualTerminal(canvasPos);
      } else if (itemType === "component") {
        const componentId = e.dataTransfer.getData("component-id");
        const component = components.find((c) => c.id === componentId);
        if (component) {
          // Create a new MComponent instance
          const newComponent = new MComponent(
            Date.now(), // Use timestamp as unique ID
            component.name,
            canvasPos.x,
            canvasPos.y,
            component.width,
            component.height,
            component.filePath
          );
          // Add component to manager
          MComponentManager.getInstance().addComponent(newComponent);
        }
      }
    });
  }

  public init(): void {
    // Menu is already created and attached
  }
}
