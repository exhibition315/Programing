class TaskPool {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount; // 允許的併發數量
    this.tasks = [];
    this.runningCount = 0; // 正在執行的任務數量
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this.runTask();
    });
  }

  runTask() {
    while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
      // 若正在運行的任務 < 可併發數量，表示有可以執行的 task
      const { task, resolve, reject } = this.tasks.shift();
      this.runningCount++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this.runTask();
        });
    }
  }
}

const pool = new TaskPool();

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function addTask(time, name) {
  pool
    .add(() => timeout(time))
    .then(() => {
      console.log(`任務${name}完成`);
    });
}

addTask(10000, 1);
addTask(5000, 2);
addTask(3000, 3);
addTask(4000, 4);
addTask(5000, 5);
