class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    // Check PQ is empty
    if (this.values.length === 0) {
      this.values.push(newNode);
      return true;
    }

    this.values.push(newNode);
    let newIndex = this.values.length - 1;
    let parentIndex = Math.floor((newIndex - 1) / 2);

    // 如果有父節點 並且 子節點的優先權高於父節點
    while (
      parentIndex >= 0 &&
      this.values[newIndex].priority > this.values[parentIndex].priority
    ) {
      // 交換子節點根父節點
      const temp = this.values[parentIndex];
      this.values[parentIndex] = this.values[newIndex];
      this.values[newIndex] = temp;
      // 更新 index
      newIndex = parentIndex;
      parentIndex = Math.floor((newIndex - 1) / 2);
    }
  }

  dequeue() {
    if (this.values.length === 0) {
      return false;
    }

    if (this.values.length === 1) {
      const removeNode = this.values.pop();
      return removeNode;
    }

    // 交換第一個跟最後一個 Node
    const temp = this.values.pop();
    this.values.push(this.values[0]);
    this.values[temp];
    const removeNode = this.values.pop();
    this.maxHeapify(0);
    return removeNode;
  }

  maxHeapify(i) {
    let largest;
    let l = i * 2 + 1;
    let r = i * 2 + 2;
    if (
      l <= this.values.length - 1 &&
      this.values[l].priority > this.values[i].priority
    ) {
      largest = l;
    } else {
      largest = i;
    }

    if (
      r <= this.values.length - 1 &&
      this.values[r].priority > this.values[largest].priority
    ) {
      largest = r;
    }

    if (largest != i) {
      // swap
      let temp = this.values[i];
      this.values[i] = this.values[largest];
      this.values[largest] = temp;
      this.maxHeapify(largest);
    }
  }
}

const PQ = new PriorityQueue();
PQ.enqueue("A", 5);
PQ.enqueue("B", 4);
PQ.enqueue("C", 9);
PQ.enqueue("D", 1);

console.log(PQ);
