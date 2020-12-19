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

function parseInput2(input) {
  return input.map(el => {
    if (el.slice(0, 3) === 'mem') {
      const memUpdate = el.split(' = ');
      const value = parseInt(memUpdate[1])
      const memSplit = memUpdate[0].split('[')[1];
      const location = parseInt(memSplit.slice(0, memSplit.length - 1));
      return {location, value}
    } else {
      const maskSplit = el.split(' = ');
      return { mask: el.split(' = ')[1] }
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

function partTwo(input) {
  const operations = parseInput2(input);
  let currentMask = null, mem = new Map();
  operations.forEach(entry => {
    if (entry.mask) {
      currentMask = entry.mask;
    } else {
      let address = entry.location.toString(2).padStart(36, 0).split('');
      address = address.map((bit, i) => {
        if (currentMask[i] === '1') return 1;
        if (currentMask[i] === 'X') return 'X'
        else return bit;
      }).join('');
      const floaters = address.split('X');
      let addresses = floaters.reduce((acc, floater) => {
        if (acc.length === 0) return [floater];
        const zeroes = [...acc].map(x => x + '0' + floater);
        const ones = [...acc].map(x => x + '1' + floater);
        return [...zeroes, ...ones];
      }, []);
      addresses.forEach(addr => mem.set(parseInt(addr, 2), entry.value));
    }
  })

  return [...mem.values()].reduce((a, b) => a + b, 0);
}

console.log(partOne(input));
console.log(partTwo(input));