const fs = require('fs');

const input = fs.readFileSync('./inputsDayEighteen.txt', 'utf-8').split('\n');

console.log(input);

function compute(string, index = 0) {
  let current = null, operation = null;
  for (let i = index; i <= string.length; i++) {
    if (i === string.length) return current;

    if (string[i] === ' ') continue;

    if (string[i] === '+') operation = '+';

    if (string[i] === '*') operation = '*';

    if (!isNaN(Number(string[i]))) {
      if (current === null) {
        current = Number(string[i]);
      } else if (operation === '+') {
        current += Number(string[i]);
      } else {
        current *= Number(string[i]);
      }
    }

    if (string[i] === ')') {
      return [ current, i ];
    }

    if (string[i] === '(') {
      let [ val, index ] = compute(string, i + 1);
      if (current === null) current = val;
      else if (operation === '+') current += val;
      else if (operation === '*') current *= val;
      i = index;
    }
  }
}

function partOne(input) {
  return input.reduce((acc, string) => acc + compute(string), 0);
}

console.log(partOne(input));