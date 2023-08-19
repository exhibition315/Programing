/**
 * 依序執行每一個任務
 * 所有任務全部完成後可得到每個任務的結果
 * 需返回兩個方法，start 用於啟動任務，pause 用於暫停任務
 * 每個任務都需具有原子性，即不可中斷，只能在兩個任務之間中斷
 * @param {...Function} task 任務列表
 */

function processTasks(...tasks) {
  let isRunning = false;
  let taskIndex = 0;
  const result = [];

  return {
    start() {
      return new Promise(async (resolve, reject) => {
        if (isRunning) {
          return;
        }
        isRunning = true;
        // 依序執行所有任務
        while (taskIndex < tasks.length) {
          const res = await tasks[i]();
          result.push(res);
          taskIndex++;
          if (!isRunning) {
            // 在執行過程中，呼叫 pause
            return;
          }
        }
        // 所有任務已完成
        isRunning = false;
        resolve(result);
      });
    },
    pause() {
      isRunning = false;
    },
  };
}
