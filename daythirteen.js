const fs = require('fs');

const inputs = fs.readFileSync('./inputsDayThirteen.txt', 'utf-8').split('\n');
const timeStamp = parseInt(inputs[0], 10);
const busIDs = inputs[1].split(',').filter(x => x !== 'x').map(num => parseInt(num, 10));

console.log(partOne(timeStamp, busIDs));

function partOne(timeStamp, busIDs) {
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