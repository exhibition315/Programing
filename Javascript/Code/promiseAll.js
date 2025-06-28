function promiseAll(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("Argument must be an array"));
  }

  if (promises.length === 0) {
    return Promise.resolve([]);
  }

  const results = [];
  let completed = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed += 1;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
