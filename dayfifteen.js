const input = [0, 1, 5, 10, 3, 12, 19];

function partOne(input, target) {
  const seenNumbers = {}, arr = input.slice();

  for (let i = 0; i < input.length; i++) {
    seenNumbers[input[i]] = i;
  }

  arr.push(0)

  while (arr.length < target) {
    const n = arr.length - 1, prev = arr[n];
    let spoken = 0;
    if (prev in seenNumbers) {
      spoken = n - seenNumbers[prev];
    }
    seenNumbers[prev] = n;
    arr.push(spoken);
  }

  return arr[arr.length - 1];
}

function partTwo(input, target) {
  const mem = new Map();
  input.forEach((num, i) => mem.set(num, i + 1));
  let curr = 0;
  for (let i = input.length + 1; i < target; i++) {
    if (mem.has(curr)) {
      const location = mem.get(curr);
      mem.set(curr, i);
      curr = i - location;
    } else {
      mem.set(curr, i);
      curr = 0;
    }
  }
  return curr;
}

console.log(partOne(input, 2020));

console.log(partTwo(input, 30000000));