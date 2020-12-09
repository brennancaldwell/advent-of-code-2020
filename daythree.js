const fs = require('fs');

fs.readFile('./inputs.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }

  const rawData = data.split('\n'),
        matrix = rawData.map(row => row.split('')),
        inputs = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]],
        ans = inputs.map(duple => treeCount(duple, matrix)).reduce((a, b) => a * b);

  console.log(ans);
})

function treeCount([ right, down ], matrix) {
  let count = 0,
      r = 0,
      c = 0,
      y = matrix.length,
      x = matrix[0].length;

  while (r < y) {
    if (c >= x) c -= x;
    if (matrix[r][c] === '#') count++;
    c += right;
    r += down;
  }

  return count;
}

