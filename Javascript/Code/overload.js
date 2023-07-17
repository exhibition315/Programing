function createOverload() {
  const callMap = new Map();

  // overload 主要的呼叫方法
  // 先把外部呼叫的 args 組成變成 key
  // 再從 call map 裡面找出對應的 fn 來呼叫
  function overload(...args) {
    const key = args.map((arg) => typeof arg).join(",");
    const fn = callMap.get(key);
    if (fn) {
      return fn.apply(this, args);
    }
    throw new Error("No match function");
  }

  // overload 物件裡面有 add implement 的方法
  // 主要用來將宣告的多載形式記錄至 call map ("string,number" 或 "string,string" 的這種格式)
  // args 最後一項是 call back function
  overload.addImpl = function (...args) {
    const fn = args.pop();
    if (typeof fn !== "function") {
      return;
    }
    const types = args;
    callMap.set(types.join(","), fn);
  };
  return overload;
}

const getUser = createOverload();

getUser.addImpl("string", "number", (name, age) => {
  console.log("Name and Age", name, age);
});

getUser.addImpl("string", (name) => {
  console.log("Name", name);
});

getUser.addImpl("number", (age) => {
  console.log("Age", age);
});

getUser("Alvin");
getUser(30);
getUser("Alvin", 30);
