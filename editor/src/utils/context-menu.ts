// ---------- helpers & styles ----------

function clampIndex(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Minimal public interfaces you asked for
export type MenuItem = {
  label: string;
  callback?: (ev: MouseEvent) => unknown;
  class?: string; // initial classes (space-separated)
};

export type ContextMenuOptions = {
  scope: HTMLElement;
  menuItems: MenuItem[];
  customClass?: string;
};

type InternalItem = {
  data: MenuItem; // current data
  el: HTMLLIElement; // DOM node
  classes: Set<string>; // live class set for dynamic updates
};

export class ContextMenu {
  private scope: HTMLElement;
  private menu: HTMLUListElement;
  private items: InternalItem[] = [];
  private isOpen = false;
  private highlightedIndex = -1;
  private customClass?: string;

  // For cleanup
  private boundContextHandler: (e: MouseEvent) => void;
  private boundClickHandler: (e: MouseEvent) => void;
  private boundKeyHandler: (e: KeyboardEvent) => void;
  private boundResizeScrollHandler: () => void;

  constructor(opts: ContextMenuOptions) {
    this.scope = opts.scope;
    this.customClass = opts.customClass;
    this.menu = this.createMenuRoot();

    // Build items
    this.setItems(opts.menuItems);

    // Wire up
    this.boundContextHandler = (e) => this.onContextMenu(e);
    this.boundClickHandler = (e) => this.onGlobalClick(e as MouseEvent);
    this.boundKeyHandler = (e) => this.onKeydown(e);
    this.boundResizeScrollHandler = () => this.close();

    this.scope.addEventListener("contextmenu", this.boundContextHandler);
    document.addEventListener("click", this.boundClickHandler, true);
    document.addEventListener("keydown", this.boundKeyHandler, true);
    window.addEventListener("resize", this.boundResizeScrollHandler);
    window.addEventListener("scroll", this.boundResizeScrollHandler, true);
  }

  /** Replace all items */
  public setItems(menuItems: MenuItem[]) {
    this.items = [];
    this.menu.innerHTML = "";
    menuItems.forEach((item, idx) =>
      this.items.push(this.createItem(item, idx))
    );
    this.items.forEach((it) => this.menu.appendChild(it.el));
  }

  /** Open programmatically at coordinates */
  public openAt(x: number, y: number) {
    this.renderAt(x, y);
  }

  /** Close the menu */
  public close() {
    if (!this.isOpen) return;
    this.menu.style.display = "none";
    this.isOpen = false;
    this.highlightedIndex = -1;
  }

  /** Destroy and clean listeners */
  public destroy() {
    this.close();
    this.scope.removeEventListener("contextmenu", this.boundContextHandler);
    document.removeEventListener("click", this.boundClickHandler, true);
    document.removeEventListener("keydown", this.boundKeyHandler, true);
    window.removeEventListener("resize", this.boundResizeScrollHandler);
    window.removeEventListener("scroll", this.boundResizeScrollHandler, true);
    this.menu.remove();
  }

  /** Add an item (optionally at index) */
  public addItem(item: MenuItem, index?: number) {
    const at = clampIndex(index ?? this.items.length, 0, this.items.length);
    const internal = this.createItem(item, at);
    if (at === this.items.length) {
      this.items.push(internal);
      this.menu.appendChild(internal.el);
    } else {
      this.items.splice(at, 0, internal);
      this.menu.insertBefore(internal.el, this.menu.children[at] || null);
    }
    this.reindexItems();
  }

  /** Remove item at index */
  public removeItem(index: number) {
    const at = clampIndex(index, 0, this.items.length - 1);
    const [removed] = this.items.splice(at, 1);
    removed.el.remove();
    this.reindexItems();
  }

  /** Update label */
  public setItemLabel(index: number, label: string) {
    const item = this.getItem(index);
    item.data.label = label;
    item.el.textContent = label;
  }

  /** Update callback */
  public setItemCallback(index: number, cb?: (ev: MouseEvent) => unknown) {
    const item = this.getItem(index);
    item.data.callback = cb;
  }

  /** Replace the item’s classes from a space-separated string */
  public setItemClass(index: number, classString: string) {
    const item = this.getItem(index);
    // Clear existing
    item.classes.forEach((c) => item.el.classList.remove(c));
    item.classes.clear();
    // Add new
    classString
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((c) => {
        item.classes.add(c);
        item.el.classList.add(c);
      });
  }

  public addItemClassByLabel(label: string, className: string) {
    const index = this.items.findIndex(
      (it) =>
        this.trimAndRemoveSpaces(it.data.label) ===
        this.trimAndRemoveSpaces(label)
    );
    if (index >= 0) {
      this.addItemClass(index, className);
    } else {
      throw new Error(`Menu item with label "${label}" not found`);
    }
  }
  /** Add a class dynamically to a single menu item */
  public addItemClass(index: number, className: string) {
    const item = this.getItem(index);
    if (!className.trim()) return;
    if (!item.classes.has(className)) {
      item.classes.add(className);
      item.el.classList.add(className);
    }
  }

  public removeItemClassByLabel(label: string, className: string) {
    const index = this.items.findIndex(
      (it) =>
        this.trimAndRemoveSpaces(it.data.label) ===
        this.trimAndRemoveSpaces(label)
    );
    if (index >= 0) {
      this.removeItemClass(index, className);
    } else {
      throw new Error(`Menu item with label "${label}" not found`);
    }
  }

  private trimAndRemoveSpaces(str: string): string {
    return str
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .join(" ");
  }

  /** Remove a class dynamically from a single menu item */
  public removeItemClass(index: number, className: string) {
    const item = this.getItem(index);
    if (!className.trim()) return;
    if (item.classes.has(className)) {
      item.classes.delete(className);
      item.el.classList.remove(className);
    }
  }

  /** Swap the scope (detach from old, attach to new) */
  public setScope(el: HTMLElement) {
    this.scope.removeEventListener("contextmenu", this.boundContextHandler);
    this.scope = el;
    this.scope.addEventListener("contextmenu", this.boundContextHandler);
  }

  // ---------- Internals ----------

  private createMenuRoot(): HTMLUListElement {
    const ul = document.createElement("ul");
    ul.role = "menu";
    ul.tabIndex = -1;
    ul.className = "cxm-root";
    if (this.customClass) ul.classList.add(this.customClass);
    ul.style.display = "none";
    document.body.appendChild(ul);
    return ul;
  }

  private createItem(item: MenuItem, index: number): InternalItem {
    const li = document.createElement("li");
    li.role = "menuitem";
    li.tabIndex = -1;
    li.dataset.index = String(index);
    li.textContent = item.label;

    const classes = new Set<string>();
    if (item.class) {
      item.class
        .split(/\s+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((c) => {
          classes.add(c);
          li.classList.add(c);
        });
    }

    li.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const idx = Number(li.dataset.index || "-1");
      const cur = this.items[idx];
      if (cur?.data.callback) cur.data.callback(ev as MouseEvent);
      this.close();
    });

    return { data: { ...item }, el: li, classes };
  }

  private reindexItems() {
    this.items.forEach((it, i) => (it.el.dataset.index = String(i)));
  }

  private onContextMenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.renderAt(e.clientX, e.clientY);
  }

  private renderAt(clientX: number, clientY: number) {
    this.menu.style.display = "block";
    this.isOpen = true;

    // Reset highlight
    this.highlightedIndex = -1;
    this.items.forEach((it) => it.el.classList.remove("cxm-highlight"));

    // Position within viewport
    const { innerWidth, innerHeight } = window;
    const rect = this.menu.getBoundingClientRect();
    const width = rect.width || 180;
    const height = rect.height || this.items.length * 32 + 8;

    let x = clientX;
    let y = clientY;

    if (x + width > innerWidth) x = innerWidth - width - 4;
    if (y + height > innerHeight) y = innerHeight - height - 4;

    this.menu.style.left = `${Math.max(0, x)}px`;
    this.menu.style.top = `${Math.max(0, y)}px`;
    this.menu.focus();
  }

  private onGlobalClick(e: MouseEvent) {
    if (!this.isOpen) return;
    // Click outside closes
    if (!this.menu.contains(e.target as Node)) this.close();
  }

  private onKeydown(e: KeyboardEvent) {
    if (!this.isOpen) return;
    const max = this.items.length - 1;
    if (e.key === "Escape") {
      e.preventDefault();
      this.close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.highlightedIndex =
        this.highlightedIndex >= max ? 0 : this.highlightedIndex + 1;
      this.applyHighlight();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.highlightedIndex =
        this.highlightedIndex <= 0 ? max : this.highlightedIndex - 1;
      this.applyHighlight();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const idx = this.highlightedIndex >= 0 ? this.highlightedIndex : 0;
      const it = this.items[idx];
      if (it?.data.callback) {
        // Synthesize a MouseEvent for signature compatibility
        const ev = new MouseEvent("click", { bubbles: true, cancelable: true });
        it.data.callback(ev);
      }
      this.close();
    }
  }

  private applyHighlight() {
    this.items.forEach((it) => it.el.classList.remove("cxm-highlight"));
    if (
      this.highlightedIndex >= 0 &&
      this.highlightedIndex < this.items.length
    ) {
      this.items[this.highlightedIndex].el.classList.add("cxm-highlight");
      this.items[this.highlightedIndex].el.scrollIntoView({ block: "nearest" });
    }
  }

  private getItem(index: number): InternalItem {
    const at = clampIndex(index, 0, this.items.length - 1);
    const item = this.items[at];
    if (!item) throw new Error(`Menu item at index ${index} not found`);
    return item;
  }
}
