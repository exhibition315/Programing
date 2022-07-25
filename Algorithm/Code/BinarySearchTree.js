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
console.log(bst);
