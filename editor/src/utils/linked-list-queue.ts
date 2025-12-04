class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
export class LinkedListQueue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;
  private length: number = 0;

  // Add item to the end of the queue
  enqueue(item: T): void {
    const newNode = new QueueNode(item);

    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    if (!this.head) {
      this.head = newNode;
    }

    this.length++;
  }

  // Remove item from the front of the queue
  dequeue(): T | undefined {
    if (!this.head) return undefined;

    const dequeuedValue = this.head.value;
    this.head = this.head.next;

    if (!this.head) {
      // Queue is now empty, reset tail as well
      this.tail = null;
    }

    this.length--;
    return dequeuedValue;
  }

  includes(item: T): boolean {
    let current = this.head;
    while (current) {
      if (current.value === item) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  remove(item: T): void {
    if (!this.head) return;
    if (this.head.value === item) {
      this.dequeue();
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === item) {
        current.next = current.next.next;
        this.length--;
        if (current.next === null) {
          this.tail = current; // Update tail if we removed the last item
        }
        return;
      }
      current = current.next;
    }
  }

  // Peek at the front item without removing it
  peek(): T | undefined {
    return this.head?.value;
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.length === 0;
  }

  // Get the size of the queue
  size(): number {
    return this.length;
  }

  // Print the queue elements for debugging
  print(): void {
    let current = this.head;
    const elements: T[] = [];
    while (current) {
      elements.push(current.value);
      current = current.next;
    }
    console.log(elements);
  }
}
