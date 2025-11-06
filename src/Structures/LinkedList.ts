export class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  head: Node<T> | null = null;
  size: number = 0;

  addFirst(value: T) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  removeFirst(): T | null {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    return value;
  }

  peekFirst(): T | null {
    return this.head ? this.head.value : null;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }
}
