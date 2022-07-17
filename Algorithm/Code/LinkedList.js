class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      // 第一次加入 node
      this.head = newNode;
      this.length++;
      return;
    }
    // 找到最後一個 node 並且加入新的 node 至尾巴
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
    this.length++;
  }

  pop() {
    if (this.head === null) {
      // 沒有東西在裡面
      return null;
    }
    if (this.length === 1) {
      const ret = this.head;
      this.head = null;
      this.length = 0;
      return ret;
    }
    let currentNode = this.head;
    for (let i = 1; i <= this.length - 2; i++) {
      // 因為最後一個 index 為 N-1，所以只要走到 N-2，再把 next 設定為 null 即可
      currentNode = currentNode.next;
    }
    const ret = currentNode.next;
    currentNode.next = null;
    this.length--;
    return ret;
  }

  shift() {
    if (this.head === null) {
      // 沒有東西在裡面
      return null;
    }
    if (this.length === 1) {
      const ret = this.head;
      this.head = null;
      this.length = 0;
      return ret;
    }
    // Head.next 指到下一個 node
    const ret = this.head;
    this.head = this.head.next;
    this.length--;
    return ret;
  }

  unshift(value) {
    if (this.head === null) {
      // 空的，要把 node 指向 head
      this.head = new Node(value);
      this.length++;
      return;
    }
    // head 指向新的 node, 新的 node 在指向原本第一個 node
    const temp = this.head;
    this.head = new Node(value);
    this.head.next = temp;
    this.length++;
  }

  insertAt(index, value) {
    if (index > this.length - 1 || index < 0) {
      return null;
    } else if (index === 0) {
      this.unshift(value);
      return;
    } else if (index === this.length - 1) {
      this.push(value);
      return;
    }

    let currentNode = this.head;
    const newNode = new Node(value);
    // 要插入至 index 必須先找到 index - 1 的 node
    for (let i = 1; i <= index - 1; i++) {
      currentNode = currentNode.next;
    }
    newNode.next = currentNode.next;
    currentNode.next = newNode;
    this.length++;
    return;
  }

  removeAt(index) {
    if (index > this.length - 1 || index < 0) {
      return null;
    } else if (index === 0) {
      return this.shift();
    } else if (index === this.length - 1) {
      return this.pop();
    }
    let currentNode = this.head;
    for (let i = 1; i <= index - 1; i++) {
      currentNode = currentNode.next;
    }
    const ret = currentNode.next;
    currentNode.next = currentNode.next.next;
    this.length--;
    return ret;
  }

  get(index) {
    if (index > this.length - 1 || index < 0) {
      return null;
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode.value;
  }

  printAll() {
    if (this.length === 0) {
      console.log("Nothing");
      return;
    }
    let currentNode = this.head;
    while (currentNode !== null) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
}

const ll = new LinkedList();
ll.push(1);
ll.push(2);
ll.push(3);
console.log(ll.get(1));
ll.printAll();
