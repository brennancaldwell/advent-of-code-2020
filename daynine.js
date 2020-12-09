const fs = require('fs');

fs.readFile('./inputsDayNine.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }

  const input = data.split('\n').map(num => parseInt(num, 10));

  let indices = findPairSumIndices(input, isSum(input));

  let smallest = Infinity;
  let largest = -Infinity;

  for (let i = indices[0]; i <= indices[1]; i++) {
    if (input[i] < smallest) smallest = input[i];
    if (input[i] > largest) largest = input[i];
  }

  console.log(smallest + largest);
})

function isSumOfTwo(obj, num) {
  for (let key in obj) {
    let keyNum = parseInt(key.split(',')[1], 10);
    let keyIndex = parseInt(key.split(',')[0], 10);
    for (let secondKey in obj) {
      let otherNum = parseInt(secondKey.split(',')[1], 10);
      let otherNumIndex = parseInt(secondKey.split(',')[0], 10);
      if (otherNum === (num - keyNum) && keyIndex !== otherNumIndex && keyNum !== otherNum) return true;
    }
  }
  return false;
}


function isSum(input) {
  const currentNums = {};
  let lastVal = 0;

  for (let i = 0; i < 25; i++) {
    currentNums[`${i},${input[i]}`] = true;
  }

  for (let i = 25; i < input.length; i++) {
    const currVal = input[i];
    if (!isSumOfTwo(currentNums, currVal)) return currVal;
    currentNums[`${i},${currVal}`] = true;
    delete currentNums[`${lastVal},${input[lastVal]}`];
    lastVal++;
  }

  return -1;
}

function findPairSumIndices(input, target) {
  let start = 0, end = 0, sum = 0;

  while (end < input.length) {
    while (sum < target) {
      sum += input[end];
      end++;
    }

    while (sum > target) {
      sum -= input[start];
      start++;
    }

    if (sum === target) {
      return [start, end - 1];
    }
  }

  return -1;
}
