const input = [0, 1, 5, 10, 3, 12, 19];

function partOne(input, target) {
  let arr = input.slice();
  const seenNumbers = {};
  for (let i = 0; i < input.length; i++) {
    seenNumbers[input[i]] = i;
  }

  arr.push(0);
  while (arr.length < target) {
    const prev = arr[arr.length - 1];
    let spoken = 0;
    if (prev in seenNumbers) {
      spoken = (arr.length - 1) - seenNumbers[prev];
    }
    seenNumbers[prev] = arr.length - 1;
    arr.push(spoken);
  }

  console.log(arr.length);
  return arr[arr.length - 1];
}

console.log(partOne(input, 2020));