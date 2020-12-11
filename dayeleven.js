const fs = require('fs');

fs.readFile('./inputsDayEleven.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  const matrix = data.split('\n').map(line => line.split(''));

  let old = [... matrix];
  let current = seatShuffle(old, 'one');
  while(old.join() !== current.join()) {
    old = [... current];
    current = seatShuffle(current, 'one');
  }

  console.log(`Part One: ${current.flat().filter(x => x === '#').length}`);

  let oldTwo = [...matrix];
  let currentTwo = seatShuffle(oldTwo, 'two');
  while (oldTwo.join() !== currentTwo.join()) {
    oldTwo = [... currentTwo];
    currentTwo = seatShuffle(currentTwo, 'two');
  }

  console.log(`Part Two: ${currentTwo.flat().filter(x => x === '#').length}`);
})

function seatScan(matrix, row, seat) {
  let count = 0;

  if (row + 1 < matrix.length && matrix[row + 1][seat] === '#') count++;

  if (row - 1 >= 0 && matrix[row - 1][seat] === '#') count++;

  if (seat + 1 < matrix[row].length && matrix[row][seat + 1] === '#') count++;

  if (seat - 1 >= 0 && matrix[row][seat - 1] === '#') count++;

  if (row + 1 < matrix.length && seat + 1 < matrix[row].length && matrix[row + 1][seat + 1] === '#') count++;

  if (row - 1 >= 0 && seat - 1 >= 0 && matrix[row - 1][seat - 1] === '#') count++;

  if (row + 1 < matrix.length && seat - 1 >= 0 && matrix[row + 1][seat - 1] === '#') count++;

  if (row - 1 >= 0 && seat + 1 < matrix[row].length && matrix[row - 1][seat + 1] === '#') count++;


  return count;
}


function seatShuffle(matrix, part) {
  let seats = JSON.parse(JSON.stringify(matrix));
  let temp = JSON.parse(JSON.stringify(seats));
  for (let row = 0; row < seats.length; row++) {
    for (let seat = 0; seat < seats[row].length; seat++) {
      let occupied = part === 'one' ? seatScan(temp, row, seat) : seatsBySight(temp, row, seat);
      let status = temp[row][seat];
      if (status !== '.' && occupied === 0) {
        seats[row][seat] = '#';
      } else if (status === '#' && occupied >= (part === 'one' ? 4 : 5)) {
          seats[row][seat] = 'L';
        }

    }
  }
  return seats;
}

function seatsBySight(matrix, row, seat) {
  let count = 0;
  count += checkUp(matrix, row, seat);
  count += checkDown(matrix, row, seat);
  count += checkLeft(matrix, row, seat);
  count += checkRight(matrix, row, seat);
  count += checkUpRight(matrix, row, seat);
  count += checkDownRight(matrix, row, seat);
  count += checkUpLeft(matrix, row, seat);
  count += checkDownLeft(matrix, row, seat);
  return count;
}

function checkUp(matrix, row, seat) {
  row = row - 1;
  while (row >= 0) {
    if (matrix[row][seat] === '#') return 1;
    if (matrix[row][seat] === 'L') return 0;
    if (matrix[row][seat] === '.') row--;
  }
  return 0;
}

function checkDown(matrix, row, seat) {
  row = row + 1;
  while (row < matrix.length) {
    if (matrix[row][seat] === '#') return 1;
    if (matrix[row][seat] === 'L') return 0;
    if (matrix[row][seat] === '.') row++;
  }
  return 0;
}

function checkRight(matrix, row, seat) {
  seat = seat + 1;
  while (seat < matrix[row].length) {
    if (matrix[row][seat] === '#') return 1;
    if (matrix[row][seat] === 'L') return 0;
    if (matrix[row][seat] === '.') seat++;
  }
  return 0;
}

function checkLeft(matrix, row, seat) {
  seat = seat - 1;
  while (seat >= 0) {
    if (matrix[row][seat] === '#') return 1;
    if (matrix[row][seat] === 'L') return 0;
    if (matrix[row][seat] === '.') seat--;
  }
  return 0;
}

function checkUpRight(matrix, row, seat) {
  row = row - 1;
  seat = seat + 1;
  while (row >= 0 && seat < matrix[row].length) {
    if (matrix[row][seat] === '#') return 1;
    if (matrix[row][seat] === 'L') return 0;
    if (matrix[row][seat] === '.') {
      row--;
      seat++;
    }
  }
  return 0;
}

function checkDownRight(matrix, row, seat) {
  row = row + 1;
  seat = seat + 1;
  while (row < matrix.length && seat < matrix[row].length) {
    if (matrix[row][seat] === '#') return 1;
    if (matrix[row][seat] === 'L') return 0;
    if (matrix[row][seat] === '.') {
      row++;
      seat++;
    }
  }
  return 0;
}

function checkUpLeft(matrix, row, seat) {
  row = row - 1;
  seat = seat - 1;
  while (row >=0 && seat >=0) {
    if (matrix[row][seat] === '#') return 1;
    if (matrix[row][seat] === 'L') return 0;
    if (matrix[row][seat] === '.') {
      row--;
      seat--;
    }
  }
  return 0;
}

function checkDownLeft(matrix, row, seat) {
  row = row + 1;
  seat = seat - 1;
  while (row < matrix.length && seat >= 0) {
    if (matrix[row][seat] === '#') return 1;
    if (matrix[row][seat] === 'L') return 0;
    if (matrix[row][seat] === '.') {
      row++;
      seat--;
    }
  }
  return 0;
}