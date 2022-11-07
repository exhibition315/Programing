let perfect = 0;
NQueens(8);
console.log("Number of Perfect Solutions is " + perfect);

function NQueens(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push([]);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      arr[i][j] = null;
    }
  }

  let i = 0;
  let j = 0;
  let loop = true;
  while (loop) {
    console.log(i, j);

    arr[i][j] = "Q";
    // check if Q can stay there
    let violation = false;
    let k = 0;
    while (k < i) {
      if (arr[k][j] == "Q") {
        violation = true;
      }
      k++;
    }
    k = 0;
    while (k < j) {
      if (arr[i][k] == "Q") {
        violation = true;
      }
      k++;
    }
    k = 1;
    let l = -1;
    while (i + k < n && j + l >= 0) {
      if (arr[i + k][j + l] == "Q") {
        violation = true;
      }
      k++;
      l--;
    }
    k = -1;
    while (i + k >= 0 && j + k >= 0) {
      if (arr[i + k][j + k] == "Q") {
        violation = true;
      }
      k--;
    }

    if (!violation) {
      console.log("okay");
      console.log(arr);
      if (j == n - 1) {
        perfect++;
        console.log("Perfect");
        console.log(arr);
        arr[i][j] = null;
        i++;
      } else {
        i = 0;
        j++;
      }
    }

    if (violation) {
      console.log("not okay");
      console.log(arr);
      arr[i][j] = null;
      i++;
    }

    function check() {
      // go back to the previous column
      j--;
      for (let b = 0; b < arr.length; b++) {
        if (arr[b][j] == "Q") {
          arr[b][j] = null;
          console.log("b and j is ");
          console.log(b, j);
          i = b + 1;
          break;
        }
      }
    }

    while (i >= n) {
      check();
      if (j < 0) {
        console.log("dead end");
        loop = false;
        break;
      }
    }
  }
}
