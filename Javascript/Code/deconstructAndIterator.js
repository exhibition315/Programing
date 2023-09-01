// 使以下程式成立
// const [a, b] = { a:1, b:2 }

const solution1 = () => {
  // 必須在 object 裡面加入一個可迭代屬性，之後再解構時就可以透過迭代器解構
  const [a, b] = {
    a: 1,
    b: 2,
    [Symbol.iterator]() {
      const arr = Object.values(this);
      const iter = arr[Symbol.iterator]();
      return iter;
    },
  };
};

const solution2 = () => {
  // 為了不改變原始的 object, 可以將迭代器放入 prototype
  Object.prototype[Symbol.iterator] = function () {
    const arr = Object.values(this);
    const iter = arr[Symbol.iterator]();
    return iter;
  };
};

const solution3 = () => {
  // 因為 generator function yield 回傳的事 iterator
  Object.prototype[Symbol.iterator] = function* () {
    return yield Object.values(this);
  };
  const [a, b] = { a: 1, b: 2 };
  console.log(a, b)
};

// Reminder
const reminder = () => {
  // 下列此解構
  const arr = [1, 2, 3];
  const [a, b] = arr;

  // 同等於
  const iter = arr[Symbol.iterator]();
  const c = iter.next().value;
  const d = iter.next().value;
};
