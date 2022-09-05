class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.path = "";
    this.queue = [];
  }

  insert(z) {
    let y = null;
    let x = this.root;
    while (x !== null) {
      y = x;
      if (z.key < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    if (y === null) {
      // 只有在第一次 insert 時才會發生
      this.root = z;
    } else if (z.key < y.key) {
      // 較小，放在左邊
      y.left = z;
    } else {
      // 較大，放在右邊
      y.right = z;
    }
  }

  searchRecursively(x, key) {
    if (x === null || x.key === key) {
      return x;
    } else if (key < x.key) {
      return this.searchRecursively(x.left, key);
    } else {
      return this.searchRecursively(x.right, key);
    }
  }

  searchIteratively(x, key) {
    while (x !== null && key !== x.key) {
      if (key < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    return x;
  }

  preOrder(n) {
    if (n !== null) {
      this.path = `${this.path}${n.key} `;
      this.preOrder(n.left);
      this.preOrder(n.right);
    }
  }

  inOrder(n) {
    if (n !== null) {
      this.inOrder(n.left);
      this.path = `${this.path}${n.key} `;
      this.inOrder(n.right);
    }
  }

  postOrder(n) {
    if (n !== null) {
      this.postOrder(n.left);
      this.postOrder(n.right);
      this.path = `${this.path}${n.key} `;
    }
  }

  bftt(n) {
    if (n !== null) {
      this.queue.push(n);
      for (let i = 0; i < this.queue.length; i++) {
        const currentNode = this.queue[i];
        if (currentNode !== null) {
          if (currentNode.left !== null) {
            this.queue.push(currentNode.left);
          }
          if (currentNode.right !== null) {
            this.queue.push(currentNode.right);
          }
        }
      }
    }
  }
}

const bst = new BinarySearchTree();
bst.insert(new Node(5));
bst.insert(new Node(7));
bst.insert(new Node(1));
bst.insert(new Node(15));
bst.insert(new Node(9));
bst.insert(new Node(2));
bst.insert(new Node(14));
bst.insert(new Node(8));
bst.insert(new Node(3));

const result = bst.searchIteratively(bst.root, 14);
console.log(result);
