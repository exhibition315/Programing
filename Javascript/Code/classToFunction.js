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
    throw new TypeError('Class constructor Example cannot be invoked without new');
  }

  this.name = name;
}

Object.defineProperties(Example.prototype, 'func', {
  value: function() {
    // 不可通過 new 來調用
    if (!(this instanceof Example)) {
      throw new TypeError('Class constructor Example cannot be invoked without new');
    }
    
    console.log(this.name);
  },
  enumerable: false,
})

Example.prototype.func = function() {
  console.log(this.name);
}