const fs = require('fs');

fs.readFile('./inputsDayEight.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }

  const rawData = data.split('\n');

  console.log(gameLineFixer(rawData, true));
})

function gameLineFixer(input, findExit, init = 0) {
  const switches = { 'jmp' : 'nop', 'nop': 'jmp' };
  const instructionTrack = new Set();
  let acc = 0, i = init;

  while (true) {
    if (instructionTrack.has(i)) return { failed: true, acc };
    if (i > input.length - 1) return { failed: false, acc };

    const duple = input[i].split(' ');
    const instruction = duple[0];
    const num = parseInt(duple[1]);

    if (instruction === 'acc') acc += num;
    else if (findExit) {
      const switchedInstruction = [switches[instruction], num];
      const copy = input.slice();
      copy[i] = switchedInstruction.join(' ');
      const attempt = gameLineFixer(copy, false, i);
      if (!attempt.failed) return attempt.acc + acc;
    }

    instructionTrack.add(i);
    i += instruction === 'jmp' ? num : 1;
  }
}