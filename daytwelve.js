const fs = require('fs');

const inputs = fs.readFileSync('./inputsDayTwelve.txt', 'utf-8').split('\n');

// ship = {x, y, facing}

function evasiveActions(input, wayptX, wayptY) {
  const ship = { x: 0, y: 0, facing: 'E' }
  let waypt = { x: wayptX, y: wayptY }
  for (let i = 0; i < input.length; i++) {
    let direction = input[i][0];
    if (direction === 'R' || direction === 'L') {
      waypt = turn(input[i], waypt);
      continue;
    }
    let value = parseInt(input[i].slice(1), 10);
    if (direction === 'F') {
      ship.x += (value * waypt.x);
      ship.y += (value * waypt.y);
    }
    if (direction === 'S') waypt.y -= value;
    if (direction === 'N') waypt.y += value;
    if (direction === 'E') waypt.x += value;
    if (direction === 'W') waypt.x -= value;
  }
  return Math.abs(ship.x) + Math.abs(ship.y);
}


console.log(evasiveActions(inputs, 10, 1));

function turn(str, waypt) {
   const clock = str[0],
         degreeShift = (parseInt(str.slice(1), 10) / 90),
         options = [[waypt.x, waypt.y], [waypt.y, -waypt.x], [-waypt.x, -waypt.y], [-waypt.y, waypt.x]];
  let current = 0;
   if (clock === 'L') {
     current -= degreeShift;
     if (current < 0) current += 4;
   }

   if (clock === 'R') {
     current += degreeShift;
     if (current >= 4) current -= 4;
   }

   return { x: options[current][0], y: options[current][1] };
}
