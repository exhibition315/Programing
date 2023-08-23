function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

class ParallelTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount; // 同時可以執行的任務數量
    this.runningCount = 0; // 正在執行的任務數量
    this.tasks = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      });
      this.run();
    });
  }

  run() {
    while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
      const { task, resolve, reject } = this.tasks.shift();
      this.runningCount++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this.run();
        });
    }
  }
}

const parallelTask = new ParallelTask();

function addTask(time, name) {
  parallelTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任務${name}已完成`);
    });
}

// 同一個時間最多兩個任務可以被執行
addTask(10000, 1); // 10000ms 後輸出：任務1已完成
addTask(5000, 2); // 5000ms 後輸出：任務2已完成
addTask(3000, 3); // 8000ms 後輸出：任務3已完成
addTask(4000, 4); // 12000ms 後輸出：任務4已完成
addTask(5000, 5); // 15000ms 後輸出：任務5已完成
