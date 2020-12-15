const { EWOULDBLOCK } = require('constants');
const fs = require('fs');

const input = fs.readFileSync('./inputsDayFourteen.txt', 'utf-8').split('\n');

function parseInput(input) {
  return input.map(el => {
    if (el.slice(0, 3) === 'mem') {
      const memUpdate = el.split(' = ');
      const value = parseInt(memUpdate[1])
      const memSplit = memUpdate[0].split('[')[1];
      const location = parseInt(memSplit.slice(0, memSplit.length - 1));
      return {location, value}
    } else {
      const maskSplit = el.split(' = ');
      return { mask: maskFlip(maskSplit[1])}
    }
  })
}

function maskFlip(str) {
  return [...str].reverse().map((el, i) => {
    if (el === 'X') {
      return [i, 'X'];
    } else {
      return [i, parseInt(el)];
    }
  })
}

function partOne(input) {
  const operations = parseInput(input);
  let currentMask = null, mem = [];
  operations.forEach(entry => {
    if (entry.mask) {
      currentMask = entry.mask
    } else {
      let val = entry.value;
      currentMask.filter(([,d]) => d !== 'X').forEach(digit => {
        let [ location, exp ] = digit;
        const binary = val.toString(2);
        const currentDigit = parseInt(binary[binary.length - 1 - location]);
        if (currentDigit !== exp) {
          if (exp === 1) {
            val += Math.pow(2, location);
          } else {
            if (val >= Math.pow(2, location)) {
              val -= Math.pow(2, location)
            }
          }
        }
      })
      mem[entry.location] = val;
    }
  })

  return mem.reduce((a, b) => a + b);
}

console.log(partOne(input));