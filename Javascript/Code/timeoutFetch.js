const timeoutFetch = (timeout = 10000) => {
  return (url, options) => {
    return new Promise((resolve, reject) => {
      const signalController = new AbortController();

      fetch(url, {
        ...options,
        signal: signalController.signal,
      }).then(resolve, reject);

      setTimeout(() => {
        // 如果發生 timeout，則直接 reject 並且取消請求
        reject(new Error("fetch timeout"));
        signalController.abort();
      }, timeout);
    });
  };
};

const request = timeoutFetch(1000);
request("http://localhost/v1");
