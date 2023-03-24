function heapPermutation(str, output, n) {
  if (n === 1) {
    output(str);
    return;
  }

  for (let i = 0; i < n; i++) {
    heapPermutation(str, output, n - 1);

    if (n % 2 === 0) {
      swap(str, i, n - 1);
    } else {
      swap(str, 0, n - 1);
    }
  }
}

function swap(str, i, j) {
  [str[i], str[j]] = [str[j], str[i]];
}
