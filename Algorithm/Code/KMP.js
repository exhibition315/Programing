KMP("abcdabgabcdabck aabbabcdabck", "abcdabck");
KMP("afsdajskfjjareklasfjarereralkfjarealkjrea;;iot", "re"); // 5

function KMP(str1, str2) {
  let ps_array = [];
  ps_array[0] = 0;

  ps(str2);

  let i = 0;
  let j = 0;
  let counter = 0;

  while (i < str1.length) {
    if (str1[i] === str2[j] && j < str2.length) {
      if (j == str2.length - 1) {
        counter++;
        j = 0;
      } else {
        j++;
      }
      i++;
    } else if (str1[i] !== str2[j]) {
      i = i - Number(ps_array[j]);
      j = 0;
    }
  }

  console.log(counter);

  function ps(input) {
    let i;
    let n = 0;
    for (i = 1; i < input.length; i++) {
      if (input[i] !== input[n]) {
        ps_array[i] = 0;
        n = 0;
      } else if (input[i] == input[n]) {
        ps_array[i] = n + 1;
        n++;
      }
    }
    ps_array.unshift(-1);
    ps_array.pop();
    console.log(ps_array);
  }
}
