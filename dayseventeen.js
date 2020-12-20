const fs = require('fs');

const input = fs.readFileSync('./inputsDaySeventeen.txt', 'utf-8').split('\n').map(line => line.split(''));

function Matrix(num) {
  let matrix = [];
  for (let r = 0; r < num; r++) {
    let col = [];
    for (let c = 0; c < num; c++) {
      col.push('.');
    }
    matrix.push(col);
  }
  return matrix;
}

function checkActive(y, x, z, obj) {
  let activeCount = 0;
  activeCount += checkMatrix(y, x, z, z, obj[z]);
  activeCount += checkMatrix(y, x, z, z + 1, obj[z + 1]);
  activeCount += checkMatrix(y, x, z, z - 1, obj[z - 1]);
  return activeCount;
}

function checkMatrix(y, x, z, currZ, matrix) {
  let count = 0;
  if (matrix === undefined) return count;
  if (z !== currZ && matrix[y][x] === '#') count++
  if (y - 1 >= 0 && matrix[y - 1][x] === '#') count++;
  if (y + 1 < matrix.length && matrix[y + 1][x] === '#') count++;
  if (x - 1 >= 0 && matrix[y][x - 1] === '#') count ++;
  if (x + 1 < matrix[y].length && matrix[y][x + 1] === '#') count++;
  if (y - 1 >= 0 && x - 1 >= 0 && matrix[y - 1][x - 1] === '#') count++;
  if (y - 1 >= 0 && x + 1 < matrix[y].length && matrix[y - 1][x + 1] === '#') count++;
  if (y + 1 < matrix.length && x + 1 < matrix[y].length && matrix[y + 1][x + 1] === '#') count ++;
  if (y + 1 < matrix.length && x - 1 >= 0 && matrix[y + 1][x - 1] === '#') count++;
  return count;
}

function partOne(input, totalCycles) {
  let current = {}, cycle = 1;
  current[-1] = Matrix(input.length + 2);
  current[1] = Matrix(input.length + 2);
  current[0] = Matrix(input.length + 2);

  for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
      if (input[r][c] === '#') {
        current[0][r + 1][c + 1] = '#';
      }
    }
  }

  console.log(current[0])
  while (cycle <= totalCycles) {
    let newCurrent = {}, lowestZ = Infinity, highestZ = -Infinity;
    const currSize = current[0].length;
    for (let key in current) {
      lowestZ = Math.min(lowestZ, Number(key));
      highestZ = Math.max(highestZ, Number(key));
      newCurrent[key] = Matrix(currSize + 2);
    }
    newCurrent[lowestZ - 1] = Matrix(currSize + 2);
    newCurrent[highestZ + 1] = Matrix(currSize + 2);
    for (let key in current) {
      let currentZ = Number(key);
      for (let r = 0; r < current[key].length; r++) {
        for (let c = 0; c < current[key][r].length; c++) {
          let status = current[key][r][c];
          let activeNeighbors = checkActive(r, c, currentZ, current);
          if (status === '#') {
            if (activeNeighbors === 2 || activeNeighbors === 3) {
              newCurrent[key][r + 1][c + 1] = '#';
            }
          } else {
            if (activeNeighbors === 3) {
              newCurrent[key][r + 1][c + 1] = '#';
            }
          }
        }
      }
    }

    current = newCurrent;
    cycle++;
  }

  let actives = 0;
  for (let key in current) {
    actives += current[key].flat().reduce((acc, val) => val === '#' ? acc + 1 : acc, 0);
  }
  return actives;
}

console.log(partOne(input, 6));