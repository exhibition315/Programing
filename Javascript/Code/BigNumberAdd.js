/**
 * 兩個超過整數存儲範圍的大整數相加
 * @param {String} left
 * @param {String} right
 */

function sum(left, right) {
  const len = Math.max(left.length, right.length);
  const a = left.padStart(len, "0");
  const b = right.padStart(len, "0");

  let carry = 0;
  let result = "";

  for (let i = len - 1; i >= 0; i--) {
    const sum = Number(a[i]) + Number(b[i]) + carry;
    result = (sum % 10) + result; // % 10 是因為相加可能是雙位數，所以要 % 10 來取個位數
    carry = sum > 9 ? 1 : 0; // 如果 sum 大於 9 表示要進位
  }
  
  // 如果最後 carry 還有值，表示超過長度，所以還要加上 carry
  if (carry) {
    result = carry + result;
  }

  return result;
}