import { MComponentManagerObserver } from "../contracts";
import { MComponent } from "./m-component";

export class MComponentManager {
  private static instance: MComponentManager;
  private components: MComponent[];
  private observers: Set<MComponentManagerObserver>;

  constructor() {
    this.components = [];
    this.observers = new Set<MComponentManagerObserver>();
  }

  public static getInstance(): MComponentManager {
    if (!MComponentManager.instance) {
      MComponentManager.instance = new MComponentManager();
    }
    return MComponentManager.instance;
  }

  public addComponent(component: MComponent): void {
    this.components.push(component);
    this.notifyNewComponentAdded(component);
  }

  public addObserver(observer: MComponentManagerObserver): void {
    this.observers.add(observer);
  }

  public removeObserver(observer: MComponentManagerObserver): void {
    this.observers.delete(observer);
  }

  private notifyNewComponentAdded(component: MComponent): void {
    this.observers.forEach((observer) => {
      observer.onNewComponentAdded(component);
    });
  }

  public removeComponent(component: MComponent): void {
    this.components = this.components.filter((c) => c !== component);
  }

  public getComponents(): MComponent[] {
    return this.components;
  }
}
