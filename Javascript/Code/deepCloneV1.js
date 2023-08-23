function deepClone(source) {
  // 如果 source 不是 object 就直接回傳，因為他是 copy by value
  // null 也是 object
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  const result = Array.isArray(source) ? [] : {};

  // 遞迴去複製內容
  for (let key in source) {
    const value = source[key];
    result[key] = deepClone(value);
  }

  return result;
}

const originalData = {
  firstLayerNum: 10,
  obj: {
    secondLayerNum: 100,
  },
};
const clonedData = deepClone(originalData);

clonedData.firstLayerNum = 20;
clonedData.obj.secondLayerNum = 200;

console.log(originalData.firstLayerNum);
// 10 => 第一層「沒有」被 clonedData 影響
console.log(originalData.obj.secondLayerNum);
// 100 => 第二層「沒有」被 clonedData 影響
