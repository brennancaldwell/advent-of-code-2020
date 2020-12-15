const fs = require('fs');

const inputs = fs.readFileSync('./inputsDayThirteen.txt', 'utf-8').split('\n');

console.log(partOne(inputs));
console.log(partTwo(inputs))

function partOne(inputs) {
  const timeStamp = parseInt(inputs[0], 10);
  const busIDs = inputs[1].split(',').filter(x => x !== 'x').map(num => parseInt(num, 10));
  let waitStart = timeStamp, current = waitStart;

  while (true) {
    for (let i = 0; i < busIDs.length; i++) {
      if (current % busIDs[i] === 0) {
        return busIDs[i] * (current - waitStart);
      }
    }
    current++;
  }
}

function partTwo(inputs) {
  const buses = inputs[1].split(',').map(val => val === 'x' ? 'x' : parseInt(val, 10));

  const N = buses.reduce((acc, val) => {
    if (val === 'x') {
      return acc;
    }
    if (acc === null) {
      return val;
    } else {
      return acc * val;
    }
  }, null)

  const sum = buses.reduce((acc, curr, i) => {
    if (curr === 'x') {
      return acc;
    }
    const a = absoluteModulo(curr - i, curr);
    const nU = N / curr;
    const inverse = moduloInverse(nU, curr);
    return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
  }, 0n)
  return sum % BigInt(N);
}

function absoluteModulo(a, b) {
  return ((a % b) + b) % b;
}

function moduloInverse(a, mod) {
  const b = a % mod;
  for (let i = 0; i < mod; i++) {
    if ((b * i) % mod === 1) return i;
  }
  return 1;
}

/*
Chinese Remainder Theorem
https://en.wikipedia.org/wiki/Chinese_remainder_theorem
*/