class HashTable {
  // m is hashtable size
  constructor(size) {
    this.size = size;
    this.table = [];
    // Hashtable is array of arrays
    for (let i = 0; i < this.size; i++) {
      this.table.push([]);
    }
  }

  // Parse string to integer
  // Using any possible method
  parse(str) {
    let res = 0;
    for (let i = 0; i < str.length; i++) {
      res += str.charCodeAt(i);
    }
    return res % this.size;
  }

  // Division method
  hash1(key) {
    // index = key % m;
    return key % this.size;
  }

  // Multiplication method
  hash2(key) {
    const parsedKey = typeof key === "number" ? key : this.parse(key);
    const A = (Math.sqrt(5) - 1) / 2;
    return Math.floor(this.size * ((parsedKey * A) % 1));
  }

  set(key, value) {
    const index = this.hash2(key);
    this.table[index].push({ key, value });
  }

  get(key) {
    const index = this.hash2(key);
    const items = this.table[index];
    for (let i = 0; i < items.length; i++) {
      if (items[i].key === key) {
        return items[i];
      }
    }
    return null;
  }

  printAll() {
    console.log(this.table);
  }
}

const hashTable = new HashTable(6);
hashTable.set("white", "FFFFFF");
hashTable.set("magenta", "FF00FF");
hashTable.set("red", "FF0000");

hashTable.printAll();
