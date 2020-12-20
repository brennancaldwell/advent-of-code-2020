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

class Grid4D {
  gridX = new Map();

  get(x, y, z, w) {
    let gridY = this.gridX.get(x);
    if (!gridY) {
      gridY = new Map();
      this.gridX.set(x, gridY);

      let gridZ = new Map();
      gridY.set(y, gridZ);

      let gridW = new Map();
      gridZ.set(z, gridW);

      return false;
    }

    let gridZ = gridY.get(y);

    if (!gridZ) {
      gridZ = new Map();
      gridY.set(y, gridZ);

      let gridW = new Map();
      gridZ.set(z, gridW);

      return false;
    }

    let gridW = gridZ.get(z);

    if (!gridW) {
      gridW = new Map();
      gridZ.set(z, gridW);

      return false;
    }

    return gridW.get(w) || false;
  }

  set(x, y, z, w, val) {
    let gridY = this.gridX.get(x);

    if (!gridY) {
      gridY = new Map();
      this.gridX.set(x, gridY);

      let gridZ = new Map();
      gridY.set(y, gridZ);

      let gridW = new Map();
      gridZ.set(z, gridW);
      gridW.set(w, val);
      return;
    }

    let gridZ = gridY.get(y);
    if (!gridZ) {
       gridZ = new Map();
       gridY.set(y, gridZ);

       let gridW = new Map();
       gridZ.set(z, gridW);
       gridW.set(w, val);
    } else {
      let gridW = gridZ.get(z);

      if (!gridW) {
        gridW = new Map();
        gridZ.set(z, gridW);
        gridW.set(w, val);
      } else {
        gridW.set(w, val);
      }
    }
  }

  iterate(iterator) {
    this.gridX.forEach((gridY, x, mapX) => {
      gridY.forEach((gridZ, y, mapY) => {
        gridZ.forEach((gridW, z, mapZ) => {
          gridW.forEach((value, w, mapW) => {
            iterator(x, y, z, w, value);
          })
        })
      })
    });
  }
}

function initialGrid(input) {
  const grid = new Grid4D();
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      const isActive = input[x][y] === '#';
      grid.set(x, y, 0, 0, isActive);
    }
  }

  return grid;
}

function countNeighbors(ax, ay, az, aw, grid) {
  let neighbors = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        for (let w = -1; w <= 1; w++) {
          if (x === 0 && y === 0 && z === 0 && w === 0) {
            continue;
          }
          if (grid.get(ax + x, ay + y, az + z, aw + w)) {
            neighbors++;

            if (neighbors >= 4) {
              return neighbors;
            }
          }
        }
      }
    }
  }

  return neighbors;
}

function partTwo(input, totalCycles) {
  let current = initialGrid(input), step = 1;

  while (step <= totalCycles) {
    let newGrid = new Grid4D();
    for (let x = -step; x < input.length + step; x++) {
      for (let y = -step; y < input.length + step; y++) {
        for (let z = -step; z <= step; z++) {
          for (let w = -step; w <= step; w++) {
            let val = current.get(x, y, z, w);
            if (val) {
              let neighb = countNeighbors(x, y, z, w, current);
              val = neighb === 2 || neighb === 3;
            } else {
              let neighb = countNeighbors(x, y, z, w, current)
              val = neighb === 3;
            }

            newGrid.set(x, y, z, w, val);
          }
        }
      }
    }
    current = newGrid;
    step++;
  }

  let active = 0;
  current.iterate((x, y, z, w, val) => active += (val ? 1 : 0));
  return active;
}

console.log(partTwo(input, 6));