export class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  size: number = 0;

  add(value: T) {
    const node = new Node(value);
    if (!this.head) this.head = this.tail = node;
    else {
      this.tail!.next = node;
      this.tail = node;
    }
    this.size++;
  }

  remove(): T | null {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return value;
  }

 
}
