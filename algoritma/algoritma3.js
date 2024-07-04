function countWord(QUERY, INPUT) {
  const result = [];
  for (let i = 0; i < QUERY.length; i++) {
    let count = 0;
    for (let j = 0; j < INPUT.length; j++) {
      if (QUERY[i] === INPUT[j]) {
        count++;
      }
    }
    result.push(count);
  }
  return result;
}
const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];
const OUTPUT = countWord(QUERY, INPUT);
console.log(`OUTPUT = [${OUTPUT}]`);
