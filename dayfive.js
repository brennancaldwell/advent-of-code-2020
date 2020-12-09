const fs = require('fs');

fs.readFile('./inputsDayFive.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }

  let tickets = data.split('\n');
  let ticketTrack = {};

  tickets.forEach(ticket => {
    let [row, column] = ticketParse(ticket);
    ticketTrack[row] === undefined
    ? ticketTrack[row] = [column]
    : ticketTrack[row].push(column);
  })

  let myRow, myColumn, lowest = Infinity, highest = -Infinity;

  for (let row in ticketTrack) {
    if (Number(row) < lowest) lowest = Number(row);
    if (Number(row) > highest) highest = Number(row);
  }

  for (let row in ticketTrack) {
    if (Number(row) !== lowest && Number(row) !== highest && ticketTrack[row].length < 8) {
      myRow = row;
      break;
    }
  }

  let numbers = ticketTrack[myRow],
      nums = numbers.map(el => Number(el)),
      i = 0;
  while (i < nums.length) {
    const num = nums[i];
    if (num < nums.length && num !== nums[num]) {
      [nums[i], nums[num]] = [nums[num], nums[i]]
    } else {
      i++
    }
  }

  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i) myColumn = i;
  }

  console.log(`My Row: ${myRow}, My Column: ${myColumn}`);
  console.log(`My SeatID : ${(myRow * 8) + myColumn}`);
})

function rowParse(segment, axis) {
  let index = 0,
      lower = 0,
      upper = Math.pow(2, segment.length) - 1,
      midpt = (lower + upper) / 2,
      lowerIndicator = 'F',
      upperIndicator = 'B';

  if (axis === 'column') {
    lowerIndicator = 'L';
    upperIndicator = 'R';
  }

  while (index < segment.length) {
    const current = segment[index];
    if (current === lowerIndicator) {
      upper = Math.floor(midpt);
    } else if (current === upperIndicator) {
      lower = Math.ceil(midpt);
    }
    midpt = (lower + upper) / 2;
    index++
  }

  return midpt;
}

function ticketParse(ticket) {
  const row = rowParse(ticket.slice(0, 7));
  const column = rowParse(ticket.slice(7), 'column');
  const seatID = (row * 8) + column;
  return [ row, column ];
}
