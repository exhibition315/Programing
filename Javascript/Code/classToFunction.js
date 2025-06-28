// Convert class to function
// ES6 Class
class Example {
  constructor(name) {
    this.name;
  }

  func() {
    console.log(this.name);
  }
}

'use strict'
// ES5 Function
function Example(name) {
  // 驗證 this 指向，因為 class 只能被 new 出來，不能直接呼叫
  if (!(this instanceof Example)) {
    throw new TypeError(
      "Class constructor Example cannot be invoked without new"
    );
  }

  this.name = name;
}

// 定義方法到原型，且不可列舉
Object.defineProperty(Example.prototype, "func", {
  value: function () {
    console.log(this.name);
  },
  enumerable: false, // 跟 class 行為一樣，不可列舉
  writable: true,
  configurable: true,
});
