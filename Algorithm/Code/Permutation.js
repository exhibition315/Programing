const result = [];

perm(['a', 'b', 'c'], 0);
console.log(result);

function perm(arr, start) {
  if (start >= arr.length) {
    result.push([...arr]);
  } else {
    for (let i = start; i < arr.length; i++) {
      swap(arr, start, i);
      perm(arr, start + 1);
      swap(arr, start, i);
    }
  }
}

function swap(arr, n1, n2) {
  const temp = arr[n2];
  arr[n2] = arr[n1];
  arr[n1] = temp;
}
