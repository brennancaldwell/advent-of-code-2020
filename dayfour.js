const fs = require('fs');

fs.readFile('./inputsDayFour.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }

  const rawData = data.split('\n\n');
  const splitData = rawData.map(el => el.split('\n'));
  const attrMaps = splitData.map(group => {
    const attrMap = {}
    for (let i = 0; i < group.length; i++) {
      const current = group[i];
      const attributes = [current];
      if (current.includes(' ')) {
        attributes.pop();
        const subgroups = current.split(' ');
        subgroups.forEach(sub => attributes.push(sub));
      }
      attributes.forEach(attr => {
        const duple = attr.split(':');
        attrMap[duple[0]] = duple[1];
      })
    }
    return attrMap;
  })


  let counter = 0;
  attrMaps.forEach(map => {
    if (hasAttributes(map)) counter++;
  })

  console.log(counter);

})

function hasAttributes(map) {
  return map.byr
        && byrValidate(map.byr)
        && map.iyr
        && iyrValidate(map.iyr)
        && map.eyr
        && eyrValidate(map.eyr)
        && map.hgt
        && hgtValidate(map.hgt)
        && map.hcl
        && hclValidate(map.hcl)
        && map.ecl
        && eclValidate(map.ecl)
        && map.pid
        && pidValidate(map.pid);
}

function byrValidate(str) {
  return str.length === 4 && Number(str) >= 1920 && Number(str) <= 2002;
}

function iyrValidate(str) {
  return str.length === 4 && Number(str) >= 2010 && Number(str) <= 2020
}

function eyrValidate(str) {
  return str.length === 4 && Number(str) >= 2020 && Number(str) <= 2030
}

function hgtValidate(str) {
  const unit = str.slice(str.length - 2), value = str.slice(0, str.length - 2);
  if (unit === 'cm') return Number(value) >= 150 && Number(value) <= 193;
  if (unit === 'in') return Number(value) >= 59 && Number(value) <= 76;
}

function hclValidate(str) {
  if (str[0] !== '#') return false;
  for (let i = 1; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const isNumber = code >= 48 && code <= 57;
    const isLetter = code >= 97 && code <= 122;
    if (!isNumber && !isLetter) return false;
  }
  return true;
}

function eclValidate(str) {
  return str === 'amb'
        || str === 'blu'
        || str === 'brn'
        || str === 'gry'
        || str === 'grn'
        || str === 'hzl'
        || str === 'oth';
}

function pidValidate(str) {
  if (str.length !== 9) return false;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const isNumber = code >= 48 && code <= 57;
    if (!isNumber) return false;
  }
  return true;
}