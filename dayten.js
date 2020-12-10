const fs = require('fs');

fs.readFile('./inputsDayTen.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  const input = data.split('\n').map(num => parseInt(num, 10));
  const adapters = new MinHeap;
  input.forEach(value => adapters.push(value));

  const [ ones, threes, range ] = measureJoltageDiffs(adapters);

  console.log(`Part One: ${ones * threes}, range: ${range}, ones: ${ones}, threes: ${threes}`);

  let sorted = input.slice().sort((a, b) => a - b);
  sorted.unshift(0);
  sorted.push(range)

  console.log(comboCount(sorted));
})

class MinHeap {
  constructor() {
    this.store = [null];
  }

  push(val) {
    this.store.push(val);

    let childIndex = this.store.length - 1;
    let parentIndex = Math.floor(childIndex / 2);

    while (this.store[parentIndex] && this.store[parentIndex] > this.store[childIndex]) {
      [this.store[parentIndex], this.store[childIndex]] = [this.store[childIndex], this.store[parentIndex]];

      childIndex = parentIndex;
      parentIndex = Math.floor(childIndex / 2);
    }
  }

  pop() {
    if (this.store.length < 3) {
      let value = this.store.pop();
      this.store[0] = null;
      return value;
    }

    let value = this.store[1];
    this.store[1] = this.store.pop();
    let parentIndex = 1;
    let [ left, right ] = [ 2 * parentIndex, 2 * parentIndex + 1 ];
    let currentChildIndex;
    if (this.store[right] && this.store[left] > this.store[right]) {
      currentChildIndex = right;
    } else {
      currentChildIndex = left;
    }

    while(this.store[currentChildIndex] && this.store[currentChildIndex] < this.store[parentIndex]) {
      [this.store[parentIndex], this.store[currentChildIndex]] = [this.store[currentChildIndex], this.store[parentIndex]];

      parentIndex = currentChildIndex;
      let [ left, right ] = [ 2 * parentIndex, 2 * parentIndex + 1 ];
      if (this.store[right] && this.store[left] > this.store[right]) {
        currentChildIndex = right;
      } else {
        currentChildIndex = left;
      }
    }

    return value;
  }

  size() {
    return this.store.length - 1;
  }

}

function measureJoltageDiffs(heap) {
  let prev = 0, oneJolt = 0, threeJolt = 0;

  while (heap.size()) {
    let current = heap.pop();
    if (Math.abs(current - prev) === 1) oneJolt++;
    if (Math.abs(current - prev) === 3) threeJolt++;
    prev = current;
  }

  threeJolt++;
  prev += 3;

  return [ oneJolt, threeJolt, prev];
}


function comboCount(input, memo = {}) {
  const key = input.join(',');
  if (key in memo) return memo[key];

  let result = 1;
  for (let i = 1; i < input.length - 1; i++) {
    if (input[i + 1] - input[i - 1] <= 3) {
      const secondArray = [input[i - 1]].concat(input.slice(i + 1));
      result += comboCount(secondArray, memo);
    }
  }

  memo[key] = result;

  return result;
}