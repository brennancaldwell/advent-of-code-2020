const fs = require('fs');

const raw = fs.readFileSync('./inputsDaySixteen.txt', 'utf-8').split('\n\n').map(n => n.split('\n'));

const fieldInfo = fieldInfoParse(raw[0]);
const myTicket = raw[1][1].split(',').map(x => parseInt(x, 10));
const nearbyTickets = raw[2].slice(1).map(x => x.split(',').map(num => parseInt(num, 10)));
const validTickets = nearbyTickets.filter(ticket => {
  for (let i = 0; i < ticket.length; i++) {
    if (!fieldInfo.get('all').has(ticket[i])) return false;
  }
  return true;
})

function fieldInfoParse(input) {
  const fieldInfo = new Map(), all = new Set();
  input.forEach(line => {
    const duple = line.split(': '), values = new Set();
    let field = duple[0];
    if (field.includes(' ')) field = field.split(' ').join('_');
    let ranges = duple[1].split(' or ').map(pair => {
      const numberSplit = pair.split('-');
      return [parseInt(numberSplit[0], 10), parseInt(numberSplit[1], 10)];
    })
    ranges.forEach(range => {
      let begin = range[0], end = range[1];
      while (begin <= end) {
        values.add(begin);
        all.add(begin);
        begin++;
      }
    })
    fieldInfo.set(field, values);
  })
  fieldInfo.set('all', all);

  return fieldInfo;
}

function partOne(tickets, fieldMap) {
  let error = 0;
  tickets.forEach(ticket => {
    ticket.forEach(value => {
      if (!fieldMap.get('all').has(value)) error += value;
    })
  })
  return error;
}

function matchIndexToField(tickets, fieldMap) {
  let fieldSearch = new Array(tickets[0].length).fill([...fieldMap.keys()].filter(el => el !== 'all'));
  const indexToField = {};
  tickets.forEach(ticket => {
    ticket.forEach((val, i) => {
      const fields = [];
      for (let [key, set] of fieldMap) {
        if (set.has(val)) fields.push(key);
      }
      fieldSearch[i] = fieldSearch[i].filter(x => fields.includes(x));
    })
  })

  while (true) {
    const fields = [];
    const indices = [];
    fieldSearch.forEach((field, i) => {
      if (field.length === 1) {
        fields.push(field[0]);
        indices.push(i);
      }
    })
    if (fields.length === 0) break;
    fieldSearch = fieldSearch.map(column => column.filter(field => !fields.includes(field)));
    for (let i = 0; i < fields.length; i++) {
      indexToField[indices[i]] = fields[i];
    }
  }
  return indexToField;
}

function partTwo(myTicket, validTickets, fieldInfo) {
  const indexTable = matchIndexToField(validTickets, fieldInfo);
  return myTicket.reduce((acc, cur, i) => indexTable[i].includes('departure') ? acc * cur : acc, 1);
}

console.log(partOne(nearbyTickets, fieldInfo));
console.log(partTwo(myTicket, validTickets, fieldInfo));