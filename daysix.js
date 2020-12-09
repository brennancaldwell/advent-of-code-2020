const fs = require('fs');

fs.readFile('./inputsDaySix.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }

  const rawData = data.split('\n\n');
  const ticketSplit = rawData.map(group => group.split('\n'));
  let count = 0;
  ticketSplit.forEach(group => {
    let tickets = {};
    group.forEach(person => {
      for (let i = 0; i < person.length; i++) {
        tickets[person[i]] === undefined
        ? tickets[person[i]] = 1
        : tickets[person[i]]++
      }
    })
    for (let key in tickets) {
      if (tickets[key] === group.length) count++
    }
  })

  console.log(count);
})