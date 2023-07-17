const singleton = (className) => {
  let instance;
  return new Proxy(className, {
    construct(target, ...args) {
      if (!instance) {
        instance = Reflect.construct(target, ...args);
      }
      return instance;
    },
  });
};

class MyClass {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  sayHi() {
    console.log("Hi", this.a, this.b);
  }
}

const singletonClass = singleton(MyClass);

const c1 = new singletonClass(1, 2);
const c2 = new singletonClass(3, 4);

console.log(c1 === c2); // 因為同一個 instance，所以會為 true
console.log("c1", c1); // 印出 1, 2
console.log("c2", c2); // 也是印出 1, 2，因為 c1 比較早建立出來
