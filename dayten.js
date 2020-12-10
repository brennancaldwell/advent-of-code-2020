const fs = require('fs');

fs.readFile('./inputsDayTen.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  const input = data.split('\n').map(num => parseInt(num, 10));

  console.log(input);
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