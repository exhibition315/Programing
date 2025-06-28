function deepClone(obj, cache = new WeakMap()) {
  if (typeof obj === "function") {
    return obj; // 函數不需要深拷貝，直接返回
  }

  if (cache.has(obj)) {
    return cache.get(obj); // 如果已經處理過，直接返回
  }

  if (typeof obj !== "object" || obj === null) {
    return obj; // 基本類型或 null 直接返回
  }

  if (obj instanceof Date) {
    return new Date(obj); // 處理 Date 類型
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj); // 處理正則表達式
  }

  const result = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));

  cache.set(obj, result); // 將當前對象存入 cache

  for (let key of Reflect.ownKeys(obj)) {
    result[key] = deepClone(obj[key], cache);
  }

  return result;
}
