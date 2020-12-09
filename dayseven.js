const fs = require('fs');

fs.readFile('./inputsDaySeven.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }

  const rawData = data.split('\n');
  const bagRules = {};
  rawData.forEach(line => {
    const lineSplit = line.split(' contain ');
    const container = lineSplit[0].slice(0, lineSplit[0].length - 5);
    bagRules[container] = {};
    if (lineSplit[1] !== 'no other bags.') {
      const bagSplit = lineSplit[1].split(', ')
      bagSplit.forEach(bag => {
        const number = Number(bag[0])
        let bagType;
        if(bag[bag.length - 1] === 's') {
          bagType = bag.slice(2, bag.length - 5)
        } else if (bag[bag.length - 1] === '.') {
          if (bag[bag.length - 2] === 's') {
            bagType = bag.slice(2, bag.length - 6)
          } else {
            bagType = bag.slice(2, bag.length - 5);
          }
        } else {
          bagType = bag.slice(2, bag.length - 4);
        }
        bagRules[container][bagType] = number;
      })
    }
  })

  // Part 1
  let availBags = new Set();
  let queue = ['shiny gold'];

  while (queue.length) {
    let target = queue.shift();
    for (let bag in bagRules) {
      if (bagRules[bag][target] !== undefined) {
        availBags.add(bag);
        if (!queue.includes(bag)) queue.push(bag);
      }
    }
  }

  console.log(`${availBags.size} bags can contain a shiny gold bag.`);

  //Part 2

  function countBags(allBags, currentBag) {
    let sum = 1;
    for (let bag in allBags[currentBag]) {
      sum += (allBags[currentBag][bag] * countBags(allBags, bag));
    }
    return sum;
  }

  console.log(`A shiny gold bag can contain ${countBags(bagRules, 'shiny gold') - 1} bags.`)

})